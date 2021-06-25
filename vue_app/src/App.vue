<template>
  <router-view v-if="isRouterAlive" @keydown.f5.prevent="reload"></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // 7191b00c7499d632ef7c8ffc45071cf67673655bfe68763c650f391300cc82b2
      isRouterAlive: true,
      // el-date-picker - 快捷选项
      dateRanges: [
        {
          text: "今天",
          value: (() => {
            const end = new Date();
            const start = new Date();
            end.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            return [start, end];
          })(),
        },
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            end.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            start.setDate(start.getDate() - 6);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            end.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            start.setMonth(start.getMonth() - 1);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            end.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            start.setMonth(start.getMonth() - 3);
            return [start, end];
          })(),
        },
        {
          text: "最近半年",
          value: (() => {
            const end = new Date();
            const start = new Date();
            end.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            start.setMonth(start.getMonth() - 6);
            return [start, end];
          })(),
        },
        {
          text: "最近一年",
          value: (() => {
            const end = new Date();
            const start = new Date();
            end.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            start.setFullYear(start.getFullYear() - 1);
            return [start, end];
          })(),
        },
      ],
    };
  },
  // 全局inject后可用函数
  provide() {
    return {
      reload: this.reload,
      frontendSearch: this.frontendSearch,
      frontendDateSort: this.frontendDateSort,
      frontendOtherSort: this.frontendOtherSort,
      frontendDateSift: this.frontendDateSift,
      dateRanges: this.dateRanges,
    };
  },
  components: {},
  methods: {
    // 刷新
    reload: function () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    // 模糊检索
    frontendSearch: function (searchkey, origin, display) {
      let filterList = Object.keys(display[0]);
      if (searchkey) {
        display = display.filter((v) => {
          return filterList.some((key) => {
            return v[key].toString().indexOf(searchkey) > -1;
          });
        });
      } else {
        display = origin;
      }
      return [display, display.length];
    },
    // table日期排序
    frontendDateSort: function (order, colname, display, origin) {
      if (order == "descending") {
        // 降序
        display = display.sort((a, b) => {
          let timeA = new Date(a[colname]);
          let timeB = new Date(b[colname]);
          return timeA > timeB ? -1 : timeA < timeB ? 1 : 0;
        });
      } else if (order == "ascending") {
        // 升序
        display = display.sort((a, b) => {
          let timeA = new Date(a[colname]);
          let timeB = new Date(b[colname]);
          return timeA > timeB ? 1 : timeA < timeB ? -1 : 0;
        });
      } else {
        // 源数据默认
        display = origin;
      }
      return display;
    },
    // table非日期排序(string排序)
    frontendOtherSort: function (order, colname, display, origin) {
      if (order == "descending") {
        // 降序
        display = display.sort((a, b) => {
          return a[colname] > b[colname] ? -1 : a[colname] < b[colname] ? 1 : 0;
        });
      } else if (order == "ascending") {
        // 升序
        display = display.sort((a, b) => {
          return a[colname] > b[colname] ? 1 : a[colname] < b[colname] ? -1 : 0;
        });
      } else {
        // 恢复默认
        display = origin;
      }
      return display;
    },
    // table日期筛选
    frontendDateSift: function (daterange, colname, display, origin) {
      if (daterange && daterange.length > 0) {
        daterange[1].setDate(daterange[1].getDate() + 1);
        display = origin.filter((v) => {
          return (
            new Date(v[colname]) >= daterange[0] &&
            new Date(v[colname]) <= daterange[1]
          );
        });
      } else {
        display = origin;
      }
      // console.log(daterange);
      return [display, display.length];
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
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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