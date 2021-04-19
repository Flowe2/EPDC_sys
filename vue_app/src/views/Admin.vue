<template>
  <div>
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
        v-on:alog="alog($event)"
        v-on:bgSwitch="test"
      ></UserHeadBar>
    </div>

    <!-- 分界线 -->
    <div id="divider"></div>

    <!-- router result -->
    <div id="display">
      <!-- 监听登录成功emit的alog事件 -->
      <router-view v-on:alog="alog($event)"></router-view>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import UserHeadBar from "@/components/UserHeadBar.vue";

export default {
  name: "Admin",
  data() {
    return {
      bgSwticher: true,
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
    ParticlesBg,
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

<style scoped>

</style>