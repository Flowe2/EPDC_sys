<template>
  <div>
    <div id="headbar">
      <UserHeadBar
        :logged="logged"
        :role="role"
        v-on:alog="alog($event)"
      ></UserHeadBar>
    </div>

    <!-- 分界线 -->
    <div id="divider"></div>

    <div id="display">
      <router-view v-on:alog="alog($event)"></router-view>
    </div>
  </div>
</template>

<script>
import UserHeadBar from "@/components/UserHeadBar.vue";

export default {
  name: "Admin",
  data() {
    return {
      role: true,
      logged: false,
    };
  },
  methods: {
    alog: function (status) {
      this.logged = status;
    },
  },
  components: {
    UserHeadBar,
  },
  beforeCreate() {
    // this.$router.push('/admin/login');
    // if (localStorage.getItem("atoken") != null) {
    //   // token是否过期
    //   let validTime = Math.floor(Date.now() / 1000) - 60 * 60;
    //   if (localStorage.getItem("timeStamp") > validTime) {
    //     // 已登录, 继续跳转
    //     console.log("u-l-check pass");
    //     this.$router.push("/admin/manage/usermaintain");
    //     this.$nextTick(() => {
    //       this.logged = true;
    //     });
    //   } else {
    //     // token过期, 跳转至用户登录页面
    //     console.log("u-l-check fail: out-of-date token");
    //     this.$router.push("/admin/login");
    //   }
    // } else {
    //   // 未登录, 跳转至用户登录页面
    //   console.log("u-l-check fail: no token yet");
    //   this.$router.push("/admin/login");
    // }
  },
};
</script>

<style>
</style>