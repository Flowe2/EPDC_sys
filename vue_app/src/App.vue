<template>
  <particles-bg v-show="bgSwticher" :type="currentBg" bg />
  <router-view
    class="main"
    v-on:relySwitchBg="bgSwticher = !bgSwticher"
    v-on:relyChoseBg="changeBg($event)"
  ></router-view>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: "App",
  data() {
    return {
      bgSwticher: true,
      currentBg: "circle",
      bgList: [
        "circle",
        "ball",
        "lines",
        "thick",
        "color",
        "cobweb",
        "polygon",
        "square",
        "fountain",
      ],
    };
  },
  components: {
    ParticlesBg,
  },
  methods: {
    changeBg: function (command) {
      this.currentBg = this.bgList[command];
      console.log(this.currentBg);
    }
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
  cursor: url(https://blog-static.cnblogs.com/files/lucas--liu/cat6.ico), auto;
}

#headbar {
  height: 80px;
  width: 100%;
  margin: 0;
  background: rgba(40, 57, 101, 0.9);
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
</style>