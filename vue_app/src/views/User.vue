<template>
  <div>
    <!-- head bar -->
    <div id="headbar">
      <UserHeadBar
        :logged="logged"
        :role="role"
        v-on:ulog="ulog($event)"
        v-on:switchBg="relySwitchBg"
        v-on:choseBg="relyChoseBg($event)"
      >
      </UserHeadBar>
    </div>

    <!-- 分界线 -->
    <div id="divider"></div>

    <!-- router result -->
    <div id="display">
      <router-view v-on:ulog="ulog($event)"></router-view>
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
      logged: false,
    };
  },
  methods: {
    ulog: function (status) {
      this.logged = status;
    },
    relySwitchBg: function () {
      console.log("rely switch particlesBg");
      this.$emit("relySwitchBg");
    },
    relyChoseBg: function (command) {
      console.log("rely chose particlesBg: " + command);
      this.$emit("relyChoseBg", command);
    }
  },
  components: {
    UserHeadBar,
  },
  beforeMount() {
    let validTime = Math.floor(Date.now() / 1000) - 60 * 60;
    if (
      localStorage.getItem("token") != null &&
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