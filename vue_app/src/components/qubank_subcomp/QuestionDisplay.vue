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
    >
      <el-table-column
        type="selection"
        :selectable="ifSelectable"
        width="55"
      ></el-table-column>
      <el-table-column type="expand">
        <template #default="props">
          <el-descriptions class="margin-top" column="2" size="medium" border>
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
              {{ props.row.payload.src }}
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
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-folder-checked"></i>
                答案
              </template>
              <el-tag
                type="success"
                effect="dark"
                v-for="answer in props.row.payload.answer"
                :key="answer"
                >{{ answer }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-folder-opened"></i>
                题目选项
              </template>
              <el-tag
                effect="plain"
                v-for="(option, index) in props.row.payload.options"
                :key="option"
                >{{ optionIndex(index) + ": " + option.substr(0, 15) }}</el-tag
              >
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column label="题目内容(前20字)" prop="question">
        <template #default="props"
          ><span>{{
            props.row.question.toString().substr(0, 20)
          }}</span></template
        >
      </el-table-column>
      <el-table-column
        prop="subject"
        label="科目"
        width="150"
        :filters="displayKeywordFilter"
        :filter-method="keywordFilter"
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
export default {
  name: "QuestionDisplay",
  data() {
    return {
      targetType: "sc", // 初始进入初始化, 停在单选题题库界面
      qudisplayCounter: 0,
      qudisplayList: [],
      tableHeight: 600,
      bannedList: [],
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
  props: ["loading", "searchingKey", "ifSelectable"],
  methods: {
    // 改变分页大小
    handleSizeChange: function (size) {
      console.log(size + " per page.");
      this.curtPageSize = size;
    },
    // 改变当前页码
    handleCurrentChange: function (currentPage) {
      console.log("current page: " + currentPage);
      this.currentPage = currentPage;
    },
    // 动态设置table高度, 固定表头
    dynamicTableHeight: function () {
      let bodyHeight = document.getElementById("qudisplay_body").clientHeight;
      let pagiHeight;
      !this.onlySinglePage
        ? (pagiHeight = document.getElementById("qudisplay_pagination")
            .clientHeight)
        : (pagiHeight = 0);
      this.tableHeight = bodyHeight - pagiHeight - 10;
    },
    // 生成标签过滤器
    keywordFilterGenerator: function (res) {
      let temp = [];
      res.forEach((element) => {
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
    keywordFilter: function (value, row) {
      return row.subject === value;
    },
    // 选项序号转字母处理
    optionIndex: function (index) {
      let indexLetter = String.fromCodePoint(65 + index);
      return indexLetter;
    },
    // 筛除已选择的, 并禁用复选框

    // 暂存至tempList
    handleSelectionChange: function (val) {
      // 传入的为对象, JSON.toStringfy后在JSON.parse解析
      this.$emit("addToTempList", JSON.parse(JSON.stringify(val)));
    },

    // axios - 获取单选题列表
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
    let tempType = to.params.type;
    let typeList = ["sc", "mc", "tf", "gf", "sj"];
    typeList.forEach((element) => {
      if (tempType == element) {
        this.$nextTick(() => {
          this.targetType = tempType;
        });
        next();
      }
    });
    next("/notfund");
  },
  mounted() {
    // 初始化数据获取
    this.getSingleChoiceList();
    // 初始化关键词filter
    this.keywordFilterGenerator(this.displayList);
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
      //   关键词filter同理
      this.keywordFilterGenerator(this.displayList);
    },
    // 简单搜索
    searchingKey: function () {
      console.log(this.searchingKey);
      const search = this.searchingKey;
      let filterList = Object.keys(this.qudisplayList[0]);
      if (search) {
        this.displayList = this.qudisplayList.filter((v) => {
          //some是一个为true，即结果为true
          return filterList.some((key) => {
            //要toString是因为对象里有id，id是int类型，要转为字符串类型
            return v[key].toString().indexOf(search) > -1;
          });
        });
      } else {
        this.displayList = this.qudisplayList;
      }
      this.displayCounter = this.displayList.length;
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
</style>