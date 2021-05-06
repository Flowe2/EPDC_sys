<template>
  <div id="headbarcomp">
    <!-- 登录后显示头像区域 -->
    <div id="user" v-if="logged && !role">
      <el-popover
        placement="right-end"
        title="用户"
        :width="200"
        trigger="hover"
        content="点击头像退出登录"
      >
        <template #reference>
          <el-button
            class="avatarBtn"
            circle
            style="padding: 0px"
            @click="ulogout"
          >
            <el-avatar class="face" size="large" fit="fill" :src="avatars[1]">
            </el-avatar>
          </el-button>
        </template>
      </el-popover>
    </div>
    <div id="admin" v-if="logged && role">
      <el-popover
        placement="right-end"
        title="管理员"
        :width="200"
        trigger="hover"
        content="点击头像退出登录"
      >
        <template #reference>
          <el-button
            class="avatarBtn"
            circle
            style="padding: 0px"
            @click="alogout"
          >
            <el-avatar class="face" size="large" fit="fill" :src="avatars[1]">
            </el-avatar>
          </el-button>
        </template>
      </el-popover>
    </div>

    <!-- 登录前显示用户跳转区域 -->
    <el-button
      v-show="!logged && role"
      class="headerButton"
      type="primary"
      icon="el-icon-s-custom"
      @click="toUser"
    >
      我是用户
    </el-button>
    <!-- 登录前显示管理员跳转区域 -->
    <el-button
      v-show="!logged && !role"
      class="headerButton"
      type="primary"
      icon="el-icon-user-solid"
      @click="toAdmin"
    >
      管理员登陆
    </el-button>
  </div>
</template>

<script>
export default {
  name: "UserHeadBar",
  data() {
    return {
      avatars: [
        require("@/assets/avatars/avatar00.jpg"),
        require("@/assets/avatars/avatar01.jpg"),
      ],
    };
  },
  props: ["logged", "role"],
  methods: {
    alogout: function () {
      console.log("admin logged out");
      localStorage.removeItem("atoken");
      localStorage.removeItem("timeStamp");
      this.$emit("alog", false);
      this.$router.push("/admin/login");
    },
    ulogout: function () {
      console.log("user logged out");
      localStorage.removeItem("token");
      localStorage.removeItem("timeStamp");
      this.$emit("ulog", false);
      this.$router.push("/user/login");
    },
    toUser: function () {
      this.$router.replace("/user/login");
    },
    toAdmin: function () {
      this.$router.replace("/admin/login");
    },
  },
};
</script>

<style>
#user,
#admin {
  margin: 15px 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
#user {
  float: left;
}
#admin {
  float: left;
}

.avatarBtn {
  line-height: 0;
}

.face {
  padding: 2.5px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #1161ee;
}

.face:hover {
  width: 55px;
  height: 55px;
}

.headerButton,
.bgSwither {
  margin: 15px 15px 0 0;
  float: right;
}
</style>