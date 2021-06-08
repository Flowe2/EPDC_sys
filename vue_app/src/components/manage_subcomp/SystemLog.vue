<template>
  <div id="sl_mainbody" class="sl_mainbody">
    <el-space alignment="center" size="large">
      <h2 id="sl_h2" class="sl_h2">
        <i class="el-icon-s-order"></i>
        系统日志
      </h2>
      <el-divider direction="vertical"></el-divider>
      <el-tooltip content="帐号检索" placement="right">
        <el-input
          prefix-icon="el-icon-search"
          size="small"
          v-model="inputSearchKey"
          @keydown.enter="toSearch"
          clearable
          @clear="toSearch"
          placeholder="输入后请回车"
        >
        </el-input
      ></el-tooltip>
      <el-divider direction="vertical"></el-divider>
      <el-popover placement="bottom-start" width="auto" trigger="click">
        <template #reference>
          <el-button
            class="qHeaderBtn qHeaderUpNDel"
            title="更多条件筛选"
            icon="el-icon-more-outline"
            size="mini"
          ></el-button>
        </template>
        <el-space>
          <el-date-picker
            v-model="searchingDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            unlink-panels
            :default-value="[
              new Date(new Date() - 1000 * 60 * 60 * 24 * 365),
              new Date(),
            ]"
            :shortcuts="dateRanges"
          >
          </el-date-picker>
          <el-divider direction="vertical"></el-divider>
          <el-tooltip content="按最后登录筛选" placement="top">
            <el-button type="primary" @click="dateSift">筛选</el-button>
          </el-tooltip>
        </el-space>
      </el-popover>
    </el-space>

    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>

    <el-table
      class="mElTable"
      :data="
        displayList.slice(
          (currentPage - 1) * curtPageSize,
          currentPage * curtPageSize
        )
      "
      v-loading="loading"
      stripe
      :height="tableHeight"
      style="width: 100%"
      @filter-change="roleFilter"
      @sort-change="globalSort"
    >
      <el-table-column label="序号" width="80">
        <template #default="scope">
          <span style="text-align: center">{{
            (currentPage - 1) * curtPageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="timestamp"
        label="时间戳"
        width="200"
        :sortable="'custom'"
        :column-key="'timestamp'"
      >
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        label="身份"
        width="100"
        :filters="displayRoleFilter"
        :filter-multiple="false"
        :column-key="'role'"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <i class="el-icon-guide"></i>
          <el-tag
            :type="scope.row.role === 'admin' ? 'success' : 'primary'"
            disable-transitions
            >{{ scope.row.role }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="who"
        label="帐号"
        width="200"
        :sortable="'custom'"
        :column-key="'who'"
      >
        <template #default="scope">
          <i class="el-icon-user-solid"></i>
          <span style="margin-left: 10px">{{ scope.row.who }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="具体操作" show-overflow-tooltip>
        <template #default="scope">
          <i class="el-icon-s-operation"></i>
          <span style="margin-left: 10px">{{ scope.row.operation }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>

    <el-pagination
      id="sl_pagination"
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
  </div>
</template>

<script>
export default {
  name: "SystemLog",
  inject: [
    "dateRanges",
    "frontendSearch",
    "frontendDateSort",
    "frontendOtherSort",
    "frontendDateSift",
  ],
  data() {
    return {
      loading: true,
      inputSearchKey: "", // 模糊查询
      searchingDate: [], // 日期筛选
      displayList: [],
      displayCounter: 0,
      displayRoleFilter: [],
      syslog: [],
      syslogCounter: 0,
      currentPage: 1, // 初始页为 1
      pageSizes: [10, 20, 50, 100],
      curtPageSize: 10,
      limitPage: 6, // 大于5页折叠多余页码按钮
      onlySinglePage: false,
      tableHeight: 550,
    };
  },
  methods: {
    // 前端搜索
    toSearch: function () {
      this.loading = true;
      let res = this.frontendSearch(
        this.inputSearchKey,
        this.syslog,
        this.displayList
      );
      this.displayList = res[0];
      this.displayCounter = res[1];
      this.loading = false;
    },
    // 日期筛选
    dateSift: function () {
      this.loading = true;
      let res = this.frontendDateSift(
        this.searchingDate,
        "timestamp",
        this.displayList,
        this.syslog
      );
      this.displayList = res[0];
      this.displayCounter = res[1];
      this.loading = false;
    },

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
      let bodyHeight = document.getElementById("sl_mainbody").clientHeight;
      // divider margin-top=margin-bottom=24, height=1
      let headHeight = document.getElementById("sl_h2").clientHeight;
      let pagiHeight;
      !this.onlySinglePage
        ? (pagiHeight = document.getElementById("sl_pagination").clientHeight)
        : (pagiHeight = 0);
      this.tableHeight = bodyHeight - headHeight - 49 * 2 - pagiHeight;
    },

    // 生成过滤器
    roleFilterGenerator: function () {
      this.displayRoleFilter = [];
      let temp = [];
      this.syslog.forEach((element) => {
        if (temp.indexOf(element.role) == -1) {
          temp.push(element.role);
          this.displayRoleFilter.push({
            text: element.role,
            value: element.role,
          });
        }
      });
    },
    // role标签过滤器
    roleFilter: function (filter) {
      // console.log(filter);
      this.displayList = this.syslog;
      if (filter.role != "") {
        // console.log("got filter");
        let temp = this.displayList;
        this.displayList = [];
        temp.forEach((element) => {
          if (element.role == filter.role) {
            this.displayList.push(element);
          }
        });
        this.displayCounter = this.displayList.length;
      } else {
        // console.log("no filter");
        this.displayCounter = this.displayList.length;
      }
    },

    // 全局排序
    globalSort: function (col) {
      if (col.prop == "timestamp") {
        this.displayList = this.frontendDateSort(
          col.order,
          "timestamp",
          this.displayList,
          this.syslog
        );
      } else if (col.prop == "who") {
        this.displayList = this.frontendOtherSort(
          col.order,
          "who",
          this.displayList,
          this.syslog
        );
      } else {
        this.displayList = this.syslog;
      }
    },

    // axios - 获取用户
    getSyslog: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/syslog",
        data: {
          atoken: localStorage.getItem("atoken"),
        },
      })
        .then((response) => {
          // 处理登录结果
          // 返回:  {syslog: [ {'timestamp': 'time stamp',
          //                     'role': 'user / admin'
          //                     'who': 'uemail / account',
          //                     'operation': '...'},
          //        {}, ... {} ],
          //        counter: n}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          // console.log(res);
          this.syslog = res.syslog;
          this.syslogCounter = res.counter;
          this.$nextTick(() => {
            this.displayList = this.syslog;
            this.displayCounter = this.syslogCounter;
            this.roleFilterGenerator();
            // 若小于10项则单页显示, 隐藏分页按钮
            if (this.displayCounter < this.curtPageSize) {
              this.onlySinglePage = true;
            }
            this.loading = false;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {},
  mounted() {
    this.getSyslog();
    // 初始化窗口
    this.$nextTick(() => {
      this.dynamicTableHeight();
    });
    // 窗口大小改变时
    window.onresize = () => {
      this.dynamicTableHeight();
    };
  },
};
</script>

<style scoped>
.sl_mainbody {
  height: 100%;
}

.sl_h2 {
  margin: 0;
}
</style>