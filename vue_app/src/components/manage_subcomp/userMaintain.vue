<template>
  <div class="um_mainbody">
    <h2 class="um_H2">
      <i class="el-icon-edit"></i>
      用户注册管理界面
    </h2>
    <hr />

    <el-table :data="checkedList" style="width: 100%">
      <el-table-column label="日期" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.lastlog }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱" width="300">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top">
            <template #default>
              <p>邮 箱: {{ scope.row.uemail }}</p>
              <p>用户名: {{ scope.row.uname }}</p>
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
            type="warning"
            @click="handleEdit(scope.$index, scope.row)"
            >修改密码</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除用户</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserMaintain",
  data() {
    return {
      checkedList: [], // { uemail: "", uname: "", lastlog: ""  }
    };
  },
  methods: {
    handleEdit: function (index, row) {
      console.log(index);
      console.log(row.uemail);
    },
    handleDelete: function (index, row) {
      console.log(index);
      console.log(row.uemail);
    },
  },
  beforeCreate() {
    this.axios({
      method: "POST",
      url: "http://localhost:3000/admin/manage/usermaintain",
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
          this.checkedList = res;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.um_mainbody {
}

.um_H2 {
  font: "PingFang SC";
}
</style>