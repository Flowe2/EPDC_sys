<template>
  <el-container class="qubankLayout">
    <el-header name="qActionBar" class="qHeader" height="auto">
      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button
            class="qHeaderBtn qHeaderUpNDel"
            icon="el-icon-upload"
            @click="ulDrawer = true"
            >上 传</el-button
          ></el-col
        >
        <el-col :span="1.5">
          <el-button
            class="qHeaderBtn"
            icon="el-icon-delete-solid"
            @click="dtDrawer = true"
            >删 除</el-button
          ></el-col
        >
        <el-col :span="4" :offset="1">
          <el-input
            prefix-icon="el-icon-search"
            clearable
            v-model="searchingKey"
            placeholder="输入后请稍等"
          ></el-input>
        </el-col>
        <el-col :span="1"
          ><el-button
            class="qHeaderBtn qHeaderUpNDel"
            title="更多条件筛选"
            icon="el-icon-more-outline"
          ></el-button>
        </el-col>
        <el-col :span="2.5" :offset="9">
          <el-button class="qHeaderBtn" icon="el-icon-plus" @click="addToPaper"
            >加入试卷</el-button
          ></el-col
        >
        <el-col :span="2.5">
          <el-badge
            :value="chosenCounter"
            :max="50"
            type="warning"
            :hidden="chosenCounter == 0 ? true : false"
          >
            <el-button
              class="qHeaderBtn"
              icon="iconfont icon-shijuanguanli"
              @click="cpDrawer = true"
            >
              组 卷 界 面</el-button
            >
          </el-badge></el-col
        >
      </el-row>
    </el-header>

    <el-container class="qMain">
      <!-- 侧边栏, 题型选择 -->
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
      <!-- 主容器, 展示题库 -->
      <el-main name="qDisplay" class="qDisplay">
        <router-view
          :searchingKey="debounceSearch"
          :loading="loading"
          @loading="loading = $event"
          @addToTempList="addToTempList($event)"
        ></router-view>
      </el-main>
    </el-container>

    <!-- 组卷子组件 -->
    <el-drawer
      title="组 卷 界 面"
      v-model="cpDrawer"
      class="cpDrawer"
      direction="rtl"
      size="60%"
    >
      <el-divider content-position="right"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <ComposedPaper
        :chosenCounter="chosenCounter"
        :chosenList="chosenList"
      ></ComposedPaper>
    </el-drawer>

    <!-- 上传界面 -->
    <el-drawer
      title="上 传 界 面"
      v-model="ulDrawer"
      class="ulDrawer"
      direction="ltr"
      size="40%"
    >
      <el-divider content-position="left"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <UploadQuestion
        :keywordsList="keywordsList"
        :ulDrawer="ulDrawer"
      ></UploadQuestion>
    </el-drawer>

    <!-- 删除界面 -->
    <el-drawer
      title="删 除 界 面"
      v-model="dtDrawer"
      class="dtDrawer"
      direction="ltr"
      size="40%"
    >
      <el-divider content-position="left"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <DeleteQuestion></DeleteQuestion>
    </el-drawer>
  </el-container>
</template>

<script>
import _ from "lodash";
import ComposedPaper from "@/components/qubank_subcomp/ComposedPaper.vue";
import UploadQuestion from "@/components/qubank_subcomp/UploadQuestion.vue";
import DeleteQuestion from "@/components/qubank_subcomp/DeleteQuestion.vue";

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
      loading: false,
      searchingKey: "",
      debounceSearch: "",
      chosenCounter: 0, // 已选题目数量
      chosenList: [], // 已选试题
      tempList: [], // 暂存已选试题
      maxCounter: 50, // 自定义预计题目数量
      cpDrawer: false, // 组卷drawer
      ulDrawer: false, // 上传drawer
      keywordsList: ["HTML", "操作系统"],
      dtDrawer: false, // 删除drawer
    };
  },
  components: {
    ComposedPaper,
    UploadQuestion,
    DeleteQuestion,
  },
  methods: {
    addToTempList: function (tempList) {
      this.tempList = tempList;
    },
    addToPaper: function () {
      this.tempList.forEach((element) => {
        this.chosenList.push(element);
        this.chosenCounter++;
      });
    },
    testSearch: _.debounce(function () {
      this.debounceSearch = this.searchingKey;
      this.loading = true;
    }, 1000),
  },
  watch: {
    // 搜索防抖, 1秒后传给router-view
    searchingKey: function () {
      this.testSearch();
    },
  },
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
  height: 60px !important; /* 覆盖 element.sytle, 解决优先级问题 */
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
  height: calc(100% - 110px);
  margin-bottom: 10px;
}

.qDisplay {
  height: 100%;
  width: 100%;
  padding: 0;
  border-radius: 10px;
  background-color: #394045;
}

/* 组卷界面drawer */
:deep() .el-drawer__header {
  margin-bottom: 0;
}
:deep() .el-divider__text {
  border-radius: 15px;
}

/* 上传界面drawer */

:deep() .el-pagination {
  padding: 10px 10px 0 10px;
  margin: 0;
}
/* 覆盖el-pagination原生字体颜色 */
:deep() .el-pagination__total {
  color: #ffd7ba;
}
:deep() .el-pagination__jump {
  color: #ffd7ba;
}
/* 覆盖el-pagination原生分页器样式, 增加圆角 */
:deep() .el-pagination .btn-prev {
  border-radius: 15px 0 0 15px;
}
:deep() .el-pagination .btn-next {
  border-radius: 0 15px 15px 0;
}

:deep() .el-table {
  margin-top: 10px;
}
</style>