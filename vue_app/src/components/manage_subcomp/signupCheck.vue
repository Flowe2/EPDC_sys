<template>
  <div class="sc_mainbody">
    <h2 class="sc_H2">
      <i class="el-icon-document-checked"></i>
      用户注册管理界面
    </h2>
    <hr />

    <el-table :data="checkingList" style="width: 100%">
      <el-table-column label="日期" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.signup }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱" width="300">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top">
            <template #default>
              <p>邮 箱: {{ scope.row.uemail }}</p>
              <p>用户名: {{ scope.row.uname }}</p>
              <p>留 言: {{ scope.row.postscript }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.uemail }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            @click="handlePass(scope.$index, scope.row)"
            >通过</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleRefuse(scope.$index, scope.row)"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SignupCheck",
  data() {
    return {
      checkingList: [], // { uemail: "", uname: "", postscript: "", signup: "" }
    };
  },
  methods: {
    handlePass: function (index, row) {
      console.log(index);
      console.log(row.uemail);
    },
    handleRefuse: function (index, row) {
      console.log(index);
      console.log(row.uemail);
    },
    test: function () {},
  },
  beforeCreate() {
    this.axios({
      method: "POST",
      url: "http://localhost:3000/admin/manage/signupcheck",
      data: {
        atoken: localStorage.getItem("atoken"),
      },
    })
      .then((response) => {
        // 处理登录结果
        // 返回:  [ {uemail: '954827899@qq.com',
        //          uname: '...',
        //          postscript: '注册插入测试',
        //          signup: '},
        //          {}, ... {} ]
        let res = JSON.stringify(response.data);
        res = JSON.parse(res);
        // console.log(res);
        this.$nextTick(() => {
          this.checkingList = res;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.sc_mainbody {
}

.sc_H2 {
  font: "PingFang SC";
}
</style>