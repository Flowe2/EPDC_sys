<template>
  <router-view v-if="isRouterAlive" @keydown.f5.prevent="reload"></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {},
  methods: {
    reload: function () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
@media screen and (min-width: 300px) and (max-width: 800px) {
  .main {
    height: 400px;
    width: 100%;
  }
}
body {
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  cursor: url(https://blog-static.cnblogs.com/files/lucas--liu/cat6.ico), auto;
}

#headbar {
  height: 80px;
  width: 100%;
  margin: 0;
  background: #394045;
}

#bgSwitcher {
  top: 15px;
  right: 200px;
  z-index: 2;
  position: absolute;
}

#divider {
  height: 5px;
  width: 100%;
  /* 动画效果绑定 */
  -webkit-animation-name: div_animate;
  -webkit-animation-timing-function: linear;
  -webkit-animation-duration: 5s;
  -webkit-animation-iteration-count: infinite;
}

#display {
  height: 100%;
  width: 100%;
  margin: 0;
}

/* 分割线动画 定义时间轴 */
@-webkit-keyframes div_animate {
  0% {
    background-color: #ffc602;
  }
  20% {
    background-color: #1363bc;
    height: 5px;
  }
  40% {
    background-color: #cf0fff;
    height: 5px;
  }
  60% {
    background-color: #810977;
    height: 5px;
  }
  80% {
    background-color: #c91f10;
    height: 5px;
  }
  100% {
    background-color: #ffc602;
    height: 5px;
  }
}

/* 全局滚动条样式修改 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #d9dbe0;
  border-radius: 3px;
}
</style>