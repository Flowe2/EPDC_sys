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
  beforeMount() {
    let validTime = Math.floor(Date.now() / 1000) - 60 * 60;
    if (
      localStorage.getItem("atoken") != null &&
      localStorage.getItem("timeStamp") > validTime
    ) {
      // 已登录
      this.logged = true;
    } else {
      // 未登录
      this.logged = false;
    }
  },
};
</script>

<style>
</style>