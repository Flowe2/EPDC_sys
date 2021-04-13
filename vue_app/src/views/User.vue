<template>
  <div>
    <!-- head bar -->
    <div id="headbar">
      <UserHeadBar :role="role"></UserHeadBar>
    </div>

    <!-- 分界线 -->
    <div id="divider"></div>

    <!-- router result -->
    <div id="display">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import UserHeadBar from "@/components/UserHeadBar.vue";

export default {
  name: "User",
  data() {
    return {
      role: false,
    };
  },
  methods: {
    
  },
  components: {
    UserHeadBar,
  },
  beforeCreate() {
    // this.$router.push('/user/login');
    // if (localStorage.getItem("token") != null) {
    //   // token是否过期
    //   let validTime = Math.floor(Date.now() / 1000) - 60 * 60;
    //   if (localStorage.getItem("timeStamp") > validTime) {
    //     // 已登录, 继续跳转
    //     console.log("u-l-check pass");
    //     this.$router.push("/user/qubank");
    //     this.$nextTick(()=>{
    //       this.userLogged = true;
    //     })
    //   } else {
    //     // token过期, 跳转至用户登录页面
    //     console.log("u-l-check fail: out-of-date token");
    //     this.$router.push("/user/login");
    //   }
    // } else {
    //   // 未登录, 跳转至用户登录页面
    //   console.log("u-l-check fail: no token yet");
    //   this.$router.push("/user/login");
    // }
  },
};
</script>

<style>
</style>