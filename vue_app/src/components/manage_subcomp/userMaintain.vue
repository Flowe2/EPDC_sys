<template>
  <div class="um_mainbody">
    <h2 class="um_H2">
      <i class="el-icon-edit"></i>
      账号维护
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
      :default-sort="{ prop: 'lastlog', order: 'descending' }"
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
              <p class="um_uemail_wrapper">
                <el-divider direction="vertical"></el-divider>
                邮&nbsp;&nbsp;&nbsp;&nbsp;箱 <i class="el-icon-chat-dot-round"></i>
                {{ scope.row.uemail }}
              </p>
              <p class="um_uemail_wrapper">
                <el-divider direction="vertical"></el-divider>
                用户名 <i class="el-icon-s-custom"></i>
                {{ scope.row.uname }}
              </p>
            </template>
            <template #reference>
              <el-tag size="medium">{{ scope.row.uemail }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column min-width="80px">
        <!-- 占位 -->
      </el-table-column>
      <el-table-column prop="lastlog" sortable label="最后登录日期" width="200">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.lastlog }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px">
        <!-- 占位 -->
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-popover placement="left" :width="200" trigger="click">
            <p>
              <el-input
                placeholder="请输入新密码"
                v-model="newuPwd"
                show-password
              ></el-input>
            </p>
            <div style="text-align: center">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-button size="mini" type="warning" @click="visible = false"
                >修改密码</el-button
              >
            </template>
          </el-popover>
          <el-popover placement="left" :width="200" trigger="click">
            <p>
              <el-alert title="确认删除?" type="error" :closable="false" center show-icon></el-alert>
            </p>
            <div style="text-align: center">
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-button size="mini" type="danger"
                >删除用户</el-button
              >
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
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserMaintain",
  data() {
    return {
      displayList: [],
      displayCounter: 0,
      checkedList: [], // { uemail: "", uname: "", lastlog: ""  }
      checkedCounter: 0,
      currentPage: 1, // 初始页为 1
      pageSizes: [10, 20, 50, 100],
      curtPageSize: 10,
      newuPwd: "",
      onlySinglePage: false,
    };
  },
  methods: {
    // 修改密码
    handleEdit: function (row) {
      const self = this;
      console.log(row.uemail + " " + self.newuPwd);
      self.postModify(row.uemail, self.newuPwd);
    },
    // 删除账号
    handleDelete: function (row) {
      const self = this;
      console.log(row.uemail);
      self.postDelete(row.uemail);
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

    // axios - 修改密码
    postModify: function(uemail, newupwd) {
      this.axios({
        method: "POST",
        url: "/admin/manage/modifyupwd",
        data: {
          "atoken": localStorage.getItem("atoken"),
          "uemail": uemail,
          "newupwd": newupwd
        }
      })
      .then(response => {
        // 处理登录结果
        // 成功: { ifSuccess: true }
        // 失败: { ifSuccess: false, err: '...' }
        let res = JSON.stringify(response.data);
        res = JSON.parse(res)
        console.log(res);
        if (res.ifSuccess == true) {
          // 登录成功, 储存token, 跳转至quBank界面
          alert("☺ 操作成功");
          this.getCheckedUserList();
        } else {
          // 登录失败
          alert("操作失败: " + res.err);
          this.getCheckedUserList();
        }
      })
      .catch(err => {
        console.log(err);
      });
    },

    postDelete: function(uemail) {
      this.axios({
        method: "POST",
        url: "/admin/manage/deleteuser",
        data: {
          "atoken": localStorage.getItem("atoken"),
          "uemail": uemail,
        }
      })
      .then(response => {
        // 处理登录结果
        // 成功: { ifSuccess: true }
        // 失败: { ifSuccess: false, err: '...' }
        let res = JSON.stringify(response.data);
        res = JSON.parse(res)
        console.log(res);
        if (res.ifSuccess == true) {
          // 登录成功, 储存token, 跳转至quBank界面
          alert("☺ 操作成功");
          this.getCheckedUserList();
        } else {
          // 登录失败
          alert("操作失败: " + res.err);
          this.getCheckedUserList();
        }
      })
      .catch(err => {
        console.log(err);
      });
    },

    // axios - 获取用户
    getCheckedUserList: function () {
      this.axios({
      method: "POST",
      url: "/admin/manage/usermaintain",
      data: {
        "atoken": localStorage.getItem("atoken"),
      },
    })
      .then((response) => {
        // 处理登录结果
        // 返回:  {userlist: [ {uemail: '',
        //                  uname: '...',
        //                  lastlog: '},
        //                  {}, ... {} ],
        //        counter: n}
        let res = JSON.stringify(response.data);
        res = JSON.parse(res);
        // console.log(res);
        this.checkedList = res.userlist;
        this.checkedCounter = res.counter;
        this.$nextTick(() => {
          this.displayList = this.checkedList;
          this.displayCounter = this.checkedCounter;
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getCheckedUserList();
    if( this.displayCounter < this.curtPageSize) {
      this.onlySinglePage = true;
    }
  },
};
</script>

<style>
.um_mainbody {
}

.um_H2 {
  margin: 0;
}

.um_uemail_wrapper {
  margin: 20px 0 20px 0;
  font: bold;
  font-size: 15px;
}
</style>