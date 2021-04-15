<template>
  <el-container class="qubankLayout">
    <el-header name="qActionBar" class="qHeader" height="auto">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input
            prefix-icon="el-icon-search"
            clearable
            v-model="fliterKeywords"
            placeholder="回车搜索"
          ></el-input>
        </el-col>
        <el-col :span="1"
          ><el-button
            class="qHeaderBtn qHeaderUpNDel"
            title="更多条件筛选"
            icon="el-icon-more-outline"
          ></el-button>
        </el-col>
        <el-col :span="1.5" :offset="9">
          <el-button class="qHeaderBtn qHeaderUpNDel" icon="el-icon-upload"
            >上 传</el-button
          ></el-col
        >
        <el-col :span="1.5">
          <el-button class="qHeaderBtn" icon="el-icon-delete-solid"
            >删 除</el-button
          ></el-col
        >
        <el-col :span="2.5" :offset="1">
          <el-button class="qHeaderBtn" icon="el-icon-plus"
            >加入试卷</el-button
          ></el-col
        >
        <el-col :span="2.5">
          <el-badge
            :value="chosedCounter"
            :max="50"
            type="warning"
            :hidden="chosedCounter == 0 ? true : false"
          >
            <el-button
              class="qHeaderBtn"
              icon="iconfont icon-shijuanguanli"
              @click="drawer = true"
            >
              组 卷 界 面</el-button
            >
          </el-badge></el-col
        >
      </el-row>
    </el-header>

    <!-- 组卷子组件 -->
    <el-drawer title="组 卷 界 面" v-model="drawer" direction="rtl" size="60%">
      <el-divider content-position="right"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <ComposedPaper :chosedCounter="chosedCounter"></ComposedPaper>
    </el-drawer>

    <el-container>
      <el-aside name="qFilterBar" class="qAside" width="200px">
        <el-menu
          :default-active="indexList[0].path"
          class="qAsideMenu"
          text-color="#FFD7BA"
          active-text-color="#E9B006"
          background-color="#394045"
          router
        >
          <el-submenu index="1" class="qAsideMenuFont">
            <template #title>
              <i class="el-icon-finished"></i>
              <span>选 择 题</span>
            </template>
            <el-menu-item class="qAsideSubMenuFont" :index="indexList[0].path">
              <i class="iconfont icon-danxuankuang"></i>
              <template #title>{{ indexList[0].name }}</template>
            </el-menu-item>
            <el-menu-item
              class="qAsideSubMenuFont"
              :index="indexList[1].path"
              widt="20px"
            >
              <i class="iconfont icon-duoxuankuang"></i>
              <template #title>{{ indexList[1].name }}</template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item class="qAsideMenuFont" :index="indexList[2].path">
            <i class="iconfont icon-panduan"></i>
            <template #title>{{ indexList[2].name }}</template>
          </el-menu-item>
          <el-menu-item class="qAsideMenuFont" :index="indexList[3].path">
            <i class="iconfont icon-tiankongti"></i>
            <template #title>{{ indexList[3].name }}</template>
          </el-menu-item>
          <el-menu-item class="qAsideMenuFont" :index="indexList[4].path">
            <i class="iconfont icon-zhuguanti"></i>
            <template #title>{{ indexList[4].name }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main name="qDisplay" class="qMain">
        Main
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ComposedPaper from "@/components/qubank_subcomp/ComposedPaper.vue";

export default {
  name: "QuBank",
  data() {
    return {
      indexList: [
        {
          path: "/user/qubank/singlechoice",
          name: " 单 选 题",
        },
        {
          path: "/user/qubank/multiplechoice",
          name: " 多 选 题",
        },
        {
          path: "/user/qubank/truefalse",
          name: " 判 断 题",
        },
        {
          path: "/user/qubank/gapfilling",
          name: " 填 空 题",
        },
        {
          path: "/user/qubank/subjective",
          name: " 主 观 题",
        },
      ],
      fliterKeywords: "",
      chosedCounter: 0, // 已选题目数量
      maxCounter: 50, // 自定义预计题目数量
      drawer: false,
    };
  },
  components: {
    ComposedPaper,
  },
  methods: {},
};
</script>

<style scoped>
.qubankLayout {
  --display-height: calc(100% - 85px);
  --display-width: calc(80%);
  width: var(--display-width);
  height: var(--display-height);
  margin: 0 10% 0 10%;
  position: absolute;
}

.qHeader {
  width: auto;
  height: 100%;
  padding: 10px;
  margin: 20px 0 20px 0;
  border-radius: 10px;
  background-color: #394045;
}

.qHeaderBtn {
  height: 16px;
  padding: 6px 10px;
  color: #ffd7ba;
  font-weight: bold;
  display: inline;
  background-color: #292929;
}

.qAside {
  height: 60%;
  margin-right: 20px;
  border-radius: 10px;
}

.qAsideMenu {
  height: 100%;
  border-right: 0;
}

.qAsideMenuFont {
  font-weight: bold;
}

.qAsideSubMenuFont {
}

.qMain {
  height: calc(100% - 20px);
  width: 100%;
  border-radius: 10px;
  background-color: #394045;
}

/* 竖直页码
.el-pager {
  display: flex;
  flex-direction: column;
}

.el-pager > li {
  width: 20px;
} */

>>> .el-drawer__header {
  margin-bottom: 0;
}

>>> .el-divider__text {
  border-radius: 15px;
}
</style>