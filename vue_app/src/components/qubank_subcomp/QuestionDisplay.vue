<template>
  <div id="qudisplay_body" class="qudisplay_body">
    <!-- 分页 -->
    <el-pagination
      id="qudisplay_pagination"
      :total="displayCounter"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="curtPageSize"
      :hide-on-single-page="onlySinglePage"
      :pager-count="limitPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>

    <el-table
      :data="
        displayList.slice(
          (currentPage - 1) * curtPageSize,
          currentPage * curtPageSize
        )
      "
      stripe
      :height="tableHeight"
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @filter-change="keywordFilter"
      @sort-change="additionTimeSort"
    >
      <el-table-column
        type="selection"
        :selectable="ifSelectable"
        width="55"
      ></el-table-column>
      <el-table-column type="expand">
        <template #default="props">
          <el-descriptions class="margin-top" column="2" size="mini" border>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-place"></i>
                题目ID
              </template>
              {{ props.row._id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-star-on"></i>
                科目
              </template>
              {{ props.row.subject }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-key"></i>
                关键词
              </template>
              <el-tag
                type="info"
                v-for="keyword in props.row.keywords"
                :key="keyword"
                >{{ keyword }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-date"></i>
                入库时间
              </template>
              {{ props.row.additionTime }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-paperclip"></i>
                题目资源
              </template>
              <el-popover v-if="props.row.payload.src" title="题目资源预览" :width="400" placement="left-start" trigger="hover">
                <template #reference>
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="qdQusrcPreview()"
                    >查看</el-button
                  >
                </template>
                <el-image :src="serverHost + props.row.payload.src" alt="" fit="scale-down" style="width: 400px; height: 400px"></el-image>
              </el-popover>
              <el-button v-else disabled type="info" size="mini" round
                >无对应资源</el-button
              >
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-date"></i>
                上次使用
              </template>
              {{ props.row.lastUseTime }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-tickets"></i>
                题目内容
              </template>
              {{ props.row.question }}
            </el-descriptions-item>
            <el-descriptions-item v-if="showOptions">
              <template #label>
                <i class="el-icon-folder-opened"></i>
                题目选项
              </template>
              <el-space direction="vertical" alignment="flex-start">
                <el-tag
                  effect="plain"
                  v-for="(option, index) in props.row.payload.options"
                  :key="option"
                  >{{
                    optionIndex(index) + ": " + option.substr(0, 15)
                  }}</el-tag
                >
              </el-space>
            </el-descriptions-item>
            <el-descriptions-item v-else>
              <el-skeleton rows="1" />
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template #label>
                <i class="el-icon-folder-checked"></i>
                答案
              </template>
              <el-space direction="vertical" alignment="flex-start">
                <div
                  class="qudisplay_answer"
                  v-for="answer in props.row.payload.answer"
                  :key="answer"
                >
                  {{ answer }}
                </div>
              </el-space>
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column
        label="题目内容(部分显示)"
        prop="question"
        show-overflow-tooltip
      >
        <template #default="props"
          ><span>{{
            props.row.question.toString().substr(0, 20)
          }}</span></template
        >
      </el-table-column>
      <el-table-column
        label="入库时间"
        prop="additionTime"
        :sortable="'custom'"
        width="150"
      >
        <template #default="props"
          ><span>{{
            new Date(props.row.additionTime).toLocaleDateString()
          }}</span></template
        >
      </el-table-column>
      <el-table-column
        prop="subject"
        label="科目"
        width="150"
        :filters="displayKeywordFilter"
        :filter-multiple="false"
        :column-key="'subject'"
        filter-placement="bottom-end"
      >
        <template #default="props">
          <el-tag :type="primary" disable-transitions>{{
            props.row.subject
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="上次使用"
        prop="lastUseTime"
        width="150"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
const serverHost = process.env.VUE_APP_API;

export default {
  inject: ["reload", "frontendSearch", "frontendDateSort", "frontendDateSift"], //注入刷新依赖
  data() {
    return {
      targetType: "sc", // 初始进入初始化, 停在单选题题库界面
      showOptions: true,
      qudisplayCounter: 0,
      qudisplayList: [],
      tableHeight: 600,
      displayList: [],
      displayCounter: 0,
      displayKeywordFilter: [], // 过滤器
      currentPage: 1, // 初始页为 1
      pageSizes: [10, 20, 50, 100],
      curtPageSize: 10,
      limitPage: 6, // 大于5页折叠多余页码按钮
      onlySinglePage: false,
    };
  },
  props: ["loading", "searchingKey", "searchingDate", "bannedList"],
  methods: {
    // 改变分页大小
    handleSizeChange: function (size) {
      // console.log(size + " per page.");
      this.curtPageSize = size;
    },
    // 改变当前页码
    handleCurrentChange: function (currentPage) {
      // console.log("current page: " + currentPage);
      this.currentPage = currentPage;
    },
    // 动态设置table高度, 固定表头
    dynamicTableHeight: function () {
      let bodyHeight = document.getElementById("qudisplay_body").clientHeight;
      let pagiHeight;
      !this.onlySinglePage
        ? (pagiHeight = document.getElementById(
            "qudisplay_pagination"
          ).clientHeight)
        : (pagiHeight = 0);
      this.tableHeight = bodyHeight - pagiHeight - 10;
    },
    // 生成标签过滤器
    keywordFilterGenerator: function () {
      // 每次重新清空
      this.displayKeywordFilter = [];
      let temp = [];
      this.displayList.forEach((element) => {
        // console.log(element);
        if (temp.indexOf(element.subject) == -1) {
          temp.push(element.subject);
          this.displayKeywordFilter.push({
            text: element.subject,
            value: element.subject,
          });
        }
      });
    },
    // role标签过滤器
    keywordFilter: function (filter) {
      this.displayList = this.qudisplayList;
      if (filter.subject != "") {
        // console.log("got filter");
        this.$emit("loading", true);
        let temp = this.displayList;
        this.displayList = [];
        temp.forEach((element) => {
          if (element.subject == filter.subject) {
            this.displayList.push(element);
          }
        });
        this.displayCounter = this.displayList.length;
      } else {
        // console.log("no filter");
        this.displayCounter = this.displayList.length;
      }
      this.$emit("loading", false);
    },
    // 入库时间排序
    additionTimeSort: function (col) {
      // 每次改变排序返回第一页,
      // this.currentPage = 1;
      this.displayList = this.frontendDateSort(
        col.order,
        "additionTime",
        this.displayList,
        this.qudisplayList
      );
    },
    // 选项序号转字母处理
    optionIndex: function (index) {
      let indexLetter = String.fromCodePoint(65 + index);
      return indexLetter;
    },
    // 判断复选框是否可用
    ifSelectable: function (row) {
      // console.log(row._id);
      for (let element of this.bannedList) {
        if (element._id == row._id) {
          return false;
        }
      }
      return true;
    },

    // 暂存至tempList
    handleSelectionChange: function (val) {
      // 传入的为对象, JSON.toStringfy后在JSON.parse解析
      this.$emit("toTempList", "add", JSON.parse(JSON.stringify(val)));
    },

    // axios - 获取对应题型题目列表
    getSingleChoiceList: function () {
      this.$emit("loading", true);
      this.axios({
        method: "POST",
        url: "/user/qubank/getquestionlist",
        data: {
          token: localStorage.getItem("token"),
          type: this.targetType,
        },
      })
        .then((response) => {
          // 处理登录结果
          // 返回:  {questionlist: [ {},
          //                  {}, ... {} ],
          //        counter: n}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          // console.log(res);
          this.qudisplayList = res.questionlist;
          this.qudisplayCounter = res.counter;
          this.$nextTick(() => {
            this.displayList = this.qudisplayList;
            this.displayCounter = this.qudisplayCounter;
            this.showOptions =
              this.targetType == "sc" || this.targetType == "mc" ? true : false;
            // 每次拉取题目列表后重新生成关键词过滤器
            this.keywordFilterGenerator();
            // 若小于10项则单页显示, 隐藏分页按钮
            if (this.displayCounter < this.curtPageSize) {
              this.onlySinglePage = true;
            }
            // 加载完成
            this.$emit("loading", false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // 题库间跳转
  beforeRouteUpdate(to, from, next) {
    let tempType = to.path.split("/").reverse()[0];
    let typeList = new Set(["sc", "mc", "tf", "gf", "sj"]);
    if (typeList.has(tempType)) {
      this.$nextTick(() => {
        this.targetType = tempType;
      });
      next();
    } else {
      next("/notfund");
    }
  },
  mounted() {
    // 初始化数据获取
    this.getSingleChoiceList();
    // 初始化窗口
    this.$nextTick(() => {
      this.dynamicTableHeight();
    });
    // 窗口大小改变时
    window.onresize = () => {
      this.dynamicTableHeight();
    };
  },
  watch: {
    targetType: function () {
      // 随导航栏跳转改变刷新
      this.getSingleChoiceList();
    },
    // table简单搜索
    searchingKey: function () {
      this.$emit("loading", true);
      let res = this.frontendSearch(
        this.searchingKey,
        this.qudisplayList,
        this.displayList
      );
      this.displayList = res[0];
      this.displayCounter = res[1];
      this.$emit("loading", false);
    },
    // table日期筛选
    searchingDate: function () {
      // console.log(this.searchingDate);
      this.$emit("loading", true);
      let res = this.frontendDateSift(
        this.searchingDate,
        "additionTime",
        this.displayList,
        this.qudisplayList
      );
      this.displayList = res[0];
      this.displayCounter = res[1];
      this.$emit("loading", false);
    },
  },
};
</script>

<style scoped>
.qudisplay_body {
  width: 100%;
  height: calc(100% - 10px);
}

:deep() .qudisplay_table_expand {
  font-size: 0;
}

:deep() .qudisplay_table_expand label {
  width: 90px;
  color: #2566c2;
}

.qudisplay_table_expan_span {
  color: #d5a105;
}

:deep() .qudisplay_table_expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

:deep() .el-descriptions__label {
  width: 90px;
}

.qudisplay_answer {
  padding: 5px 10px;
  border-radius: 5px;
  color: #ffffff;
  background-color: #67c23a;
}
</style>