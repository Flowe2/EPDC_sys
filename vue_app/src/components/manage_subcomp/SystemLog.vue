<template>
  <div>
    <h2 class="sc_H2">
      <i class="el-icon-s-order"></i>
      系统日志
    </h2>

    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>

    <el-table
      :data="
        displayList.slice(
          (currentPage - 1) * curtPageSize,
          currentPage * curtPageSize
        )
      "
      stripe
      height="550px"
      style="width: 100%"
      :default-sort="{ prop: 'timestamp', order: 'descending' }"
    >
      <el-table-column label="序号" width="80">
        <template #default="scope">
          <span style="text-align: center">{{
            (currentPage - 1) * curtPageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="timestamp" sortable label="时间戳" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        label="身份"
        width="100"
        :filters="[
          { text: '管理员', value: 'admin' },
          { text: '用户', value: 'user' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.role === 'admin' ? 'success' : 'primary'"
            disable-transitions
            >{{ scope.row.role }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="who" sortable label="帐号" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.who }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" sortable label="具体操作" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.operation }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>

    <el-pagination
      :total="displayCounter"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="curtPageSize"
      :hide-on-single-page="onlySinglePage"
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
      displayList: [],
      displayCounter: 0,
      syslog: [],
      syslogCounter: 0,
      currentPage: 1, // 初始页为 1
      pageSizes: [10, 20, 50, 100],
      curtPageSize: 10,
      onlySinglePage: false,
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
          // 返回:  {syslog: [ {'timestamp': 'yyyy-mm-dd',
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
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getSyslog();
    if (this.displayCounter < this.curtPageSize) {
      this.onlySinglePage = true;
    }
  },
};
</script>

<style>
</style>