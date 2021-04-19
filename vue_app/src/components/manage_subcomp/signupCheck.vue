<template>
  <div class="sc_mainbody">
    <h2 class="sc_h2">
      <i class="el-icon-document-checked"></i>
      注册管理
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
      height="550px"
      style="width: 100%"
      :default-sort="{ prop: 'signup', order: 'descending' }"
    >
      <el-table-column label="序号" width="80">
        <template #default="scope">
          <span style="text-align: center">{{
            (currentPage - 1) * curtPageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uemail" sortable label="用户邮箱" width="150">
        <template #default="scope">
          <el-popover
            effect="light"
            trigger="hover"
            placement="right"
            transition="fade-in-linear"
            width="300"
            title="用户信息"
          >
            <template #default>
              <p class="sc_eumail_wrapper">
                <el-divider direction="vertical"></el-divider>
                邮&nbsp;&nbsp;&nbsp;&nbsp;箱
                <i class="el-icon-chat-dot-round"></i>
                {{ scope.row.uemail }}
              </p>
              <p class="sc_eumail_wrapper">
                <el-divider direction="vertical"></el-divider>
                用户名 <i class="el-icon-s-custom"></i>
                {{ scope.row.uname }}
              </p>
              <p class="sc_eumail_wrapper">
                <el-divider direction="vertical"></el-divider>
                留&nbsp;&nbsp;&nbsp;&nbsp;言 <i class="el-icon-paperclip"></i>
                {{ scope.row.postscript }}
              </p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.uemail }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column min-width="80px">
        <!-- 占位 -->
      </el-table-column>
      <el-table-column prop="signup" sortable label="申请注册日期" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.signup }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px">
        <!-- 占位 -->
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-popover placement="left" :width="200" trigger="click">
            <p>
              <el-alert
                title="确认通过?"
                type="success"
                :closable="false"
                center
                show-icon
              ></el-alert>
            </p>
            <div style="text-align: center">
              <el-button
                type="success"
                size="mini"
                @click="handlePass(scope.row)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-button size="mini" type="success" @click="visible = false"
                >通 过</el-button
              >
            </template>
          </el-popover>
          <el-popover placement="left" :width="200" trigger="click">
            <p>
              <el-alert
                title="确认删除?"
                type="error"
                :closable="false"
                center
                show-icon
              ></el-alert>
            </p>
            <div style="text-align: center">
              <el-button
                type="danger"
                size="mini"
                @click="handleRefuse(scope.row)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-button size="mini" type="danger">拒 绝</el-button>
            </template>
          </el-popover>
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
      :pager-count="limitPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "SignupCheck",
  data() {
    return {
      loading: true,
      displayList: [],
      displayCounter: 0,
      checkingList: [], // { uemail: "", uname: "", postscript: "", signup: "" }
      checkingCounter: 0,
      currentPage: 1, // 初始页为 1
      pageSizes: [10, 20, 50, 100],
      curtPageSize: 10,
      limitPage: 6, // 大于5页折叠多余页码按钮
      onlySinglePage: false,
    };
  },
  methods: {
    // 通过注册
    handlePass: function (row) {
      console.log(row.uemail);
      this.postPass(row.uemail);
    },
    // 拒绝注册
    handleRefuse: function (row) {
      console.log(row.uemail);
      this.postRefuse(row.uemail);
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

    // axios - 通过注册申请
    postPass: function (uemail) {
      this.axios({
        method: "POST",
        url: "/admin/manage/passapply",
        data: {
          atoken: localStorage.getItem("atoken"),
          uemail: uemail,
        },
      })
        .then((response) => {
          // 处理登录结果
          // 成功: { ifSuccess: true }
          // 失败: { ifSuccess: false, err: '...' }
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res);
          if (res.ifSuccess == true) {
            // 登录成功, 储存token, 跳转至quBank界面
            alert("☺ 操作成功");
            this.getCheckingUserList();
          } else {
            // 登录失败
            alert("操作失败: " + res.err);
            this.getCheckingUserList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 拒绝注册申请
    postRefuse: function (uemail) {
      this.axios({
        method: "POST",
        url: "/admin/manage/refuseapply",
        data: {
          atoken: localStorage.getItem("atoken"),
          uemail: uemail,
        },
      })
        .then((response) => {
          // 处理登录结果
          // 成功: { ifSuccess: true }
          // 失败: { ifSuccess: false, err: '...' }
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res);
          if (res.ifSuccess == true) {
            // 登录成功, 储存token, 跳转至quBank界面
            alert("☺ 操作成功");
            this.getCheckingUserList();
          } else {
            // 登录失败
            alert("操作失败: " + res.err);
            this.getCheckingUserList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 获取用户
    getCheckingUserList: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/signupcheck",
        data: {
          atoken: localStorage.getItem("atoken"),
        },
      })
        .then((response) => {
          // 返回:  {userlist: [ {uemail: '',
          //                  uname: '...',
          //                  lastlog: '},
          //                  {}, ... {} ],
          //        counter: n}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          // console.log(res);
          this.checkingList = res.userlist;
          this.checkingCounter = res.counter;
          this.$nextTick(() => {
            this.displayList = this.checkingList;
            this.displayCounter = this.checkingCounter;
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
  mounted() {
    this.getCheckingUserList();
  },
};
</script>

<style scoped>
.sc_mainbody {
}

.sc_h2 {
  margin: 0;
}

.sc_uemail_wrapper {
  display: inline;
  margin: 20px;
  font: bold;
  font-size: 15px;
}
</style>