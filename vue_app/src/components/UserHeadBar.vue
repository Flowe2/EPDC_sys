<template>
  <div id="headbarcomp">
    <!-- 登录后显示头像区域 -->
    <div id="user" v-if="logged && !role">
      <el-button class="avatarBtn" circle style="padding: 0px" @click="logout(user)">
        <el-avatar class="face" size="large" fit="fill"
        src="https://th.bing.com/th/id/R5fc1b95a05749c8659c86bdb83c5e4ba?rik=Yz1Bt8CFUBtnpg&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0180d358d08cefa801219c77d48d74.jpg%40900w_1l_2o_100sh.jpg&ehk=DELe5Ra3xFL8tE5b%2bNTECROM%2fHsrFwIUDncvTi%2fN2Us%3d&risl=&pid=ImgRaw">
        </el-avatar>
      </el-button>
      
    </div>
    <div id="admin" v-if="logged && role">
      <el-button class="avatarBtn" circle style="padding: 0px" @click="logout(admin)">
        <el-avatar class="face" size="large" fit="fill"
        src="https://www.weixinzixun.com/UploadFiles/img_3_3952179620_3941292677_26.jpg">
        </el-avatar>
      </el-button>
    </div>

    <!-- 登录前显示管理员跳转区域 -->
    <div id="toAdmin" v-if="!logged && !role">
      <button class="headerButton">
        <router-link style="text-decoration: none" to="/admin/login"
          >管理员登陆</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHeadBar",
  data() {
    return {};
  },
  props: ["logged", "role"],
  methods: {
    logout: function (role) {
      if (role == "user"){
        console.log("user logged out");
        localStorage.removeItem("token");
        this.$router.replace("/");
      } else {
        console.log("admin logged out");
        localStorage.removeItem("atoken");
        this.$router.replace("/admin/login")
      }
    }
  }
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

.headerButton {
  margin: 25px;
  padding: 10px 15px;
  float: right;
  text-decoration: none;
  outline: none;
  border: none;
  border-radius: 25px;
  background: #1161ee;
}
</style>