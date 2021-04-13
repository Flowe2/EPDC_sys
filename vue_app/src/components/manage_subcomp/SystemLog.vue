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
      <el-table-column prop="role" sortable label="身份" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.role }}</span>
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
      <el-table-column min-width="80px">
        <!-- 占位 -->
      </el-table-column>

      <el-table-column min-width="80px">
        <!-- 占位 -->
      </el-table-column>
    </el-table>
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