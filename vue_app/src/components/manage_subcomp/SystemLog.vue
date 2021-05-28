<template>
  <div id="sl_mainbody" class="sl_mainbody">
    <h2 id="sl_h2" class="sl_h2">
      <i class="el-icon-s-order"></i>
      系统日志
    </h2>

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
  data() {
    return {
      loading: true,
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
        if (col.order == "descending") {
          // 降序
          this.displayList = this.displayList.sort((a, b) => {
            let timeA = new Date(a.timestamp.split(" ", 1).toString());
            let timeB = new Date(b.timestamp.split(" ", 1).toString());
            return timeA > timeB ? -1 : timeA < timeB ? 1 : 0;
          });
        } else if (col.order == "ascending") {
          // 升序
          this.displayList = this.displayList.sort((a, b) => {
            let timeA = new Date(a.timestamp.split(" ", 1).toString());
            let timeB = new Date(b.timestamp.split(" ", 1).toString());
            return timeA > timeB ? 1 : timeA < timeB ? -1 : 0;
          });
        } else {
          // 恢复默认
          // console.log(col.order);
          this.displayList = this.syslog;
        }
      } else if (col.prop == "who") {
        if (col.order == "descending") {
          // 降序
          this.displayList = this.displayList.sort((a, b) => {
            return a.who > b.who ? -1 : a.who < b.who ?  1 : 0;
          });
        } else if (col.order == "ascending") {
          // 升序
          this.displayList = this.displayList.sort((a, b) => {
            return a.who > b.who ? 1 : a.who < b.who ?  -1 : 0;
          });
        } else {
          // 恢复默认
          this.displayList = this.syslog;
        }
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