<template>
  <div id="userBase" class="userBase">
    <particles-bg v-show="bgSwticher" type="circle" bg />
    <div id="bgSwitcher">
      <el-tooltip
        :content="'动态背景开关: ' + (bgSwticher ? 'ON' : 'OFF')"
        placement="top"
      >
        <el-switch v-model="bgSwticher"> </el-switch>
      </el-tooltip>
    </div>
    <!-- head bar -->
    <div id="headbar">
      <UserHeadBar
        :bgSwticher="bgSwticher"
        :logged="logged"
        :role="role"
        :user="user"
        @ulog="ulog($event)"
      >
      </UserHeadBar>
    </div>

    <!-- 分界线 -->
    <div id="divider"></div>

    <!-- router result -->
    <div id="display">
      <!-- 监听登录成功emit的ulog事件 -->
      <router-view @ulog="ulog($event)"></router-view>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import UserHeadBar from "@/components/UserHeadBar.vue";

export default {
  name: "User",
  data() {
    return {
      bgSwticher: true,
      role: false,
      logged: false,
      user: "",
    };
  },
  methods: {
    ulog: function (status) {
      this.logged = status;
      this.user = localStorage.getItem("user");
    },
  },
  components: {
    ParticlesBg,
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
      this.user = localStorage.getItem("user");
    } else {
      // 未登录
      this.logged = false;
    }
  },
};
</script>

<style scoped>
</style>