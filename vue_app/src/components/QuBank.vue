<template>
  <el-container class="qubankLayout">
    <el-header name="qActionBar" class="qHeader" height="auto">
      <el-row :gutter="10">
        <el-col :span="1.5" class="qElCol">
          <el-button
            class="qHeaderBtn qHeaderUpNDel"
            icon="el-icon-upload"
            @click="ulDrawer = true"
            >上 传</el-button
          ></el-col
        >
        <el-col :span="1.5" class="qElCol">
          <el-button
            class="qHeaderBtn"
            icon="el-icon-delete-solid"
            @click="dtDrawer = true"
            >删 除</el-button
          ></el-col
        >
        <el-col :span="4" :offset="1" class="qElCol">
          <el-input
            prefix-icon="el-icon-search"
            clearable
            v-model="searchingKey"
            placeholder="输入后请稍等"
          ></el-input>
        </el-col>
        <el-col :span="1" class="qElCol"
          ><el-button
            class="qHeaderBtn qHeaderUpNDel"
            title="更多条件筛选"
            icon="el-icon-more-outline"
          ></el-button>
        </el-col>
        <el-col :span="2.5" :offset="6" class="qElCol">
          <el-button class="qHeaderBtn" icon="el-icon-remove-outline" @click="addToDelete"
            >准备删除</el-button
          ></el-col
        >
        <el-col :span="2.5" class="qElCol">
          <el-button class="qHeaderBtn" icon="el-icon-circle-plus-outline" @click="addToPaper"
            >加入试卷</el-button
          ></el-col
        >
        <el-col :span="2.5" :offset="1" class="qElCol">
          <el-badge
            :value="composeCounter"
            :max="50"
            type="warning"
            :hidden="composeCounter == 0 ? true : false"
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
          :ifSelectable="ifSelectable"
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
        :composeCounter="composeCounter"
        :composeList="composeList"
      ></ComposedPaper>
    </el-drawer>

    <!-- 上传界面 -->
    <el-drawer v-model="ulDrawer" class="ulDrawer" direction="ltr" size="40%">
      <template #title
        ><span>上 传 界 面</span
        ><el-button
          size="small"
          circle
          icon="el-icon-question"
          class="ulHelpBtn"
          title="上传提示"
          @click="ulHelpShow"
        ></el-button
      ></template>
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
      composeCounter: 0, // 已选题目数量
      composeList: [], // 已选试题列表
      deleteCounter: 0, // 预删除题目数量
      deleteList: [], // 预删除试题列表
      bannedList: [],
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
        // 所选加入到组卷
        this.composeList.push(element);
        this.composeCounter++;
      });
    },
    addToDelete: function () {
      this.tempList.forEach((element) => {
        // 所选加入到删除
        this.deleteList.push(element);
        this.deleteCounter++;
      });
    },
    // 判断复选框是否可用
    ifSelectable: function (row) {
      console.log(row._id);
      this.bannedList.forEach(element => {
        if (element._id == row._id){
          return false;
        }
      });
      return true;
    },
    testSearch: _.debounce(function () {
      this.debounceSearch = this.searchingKey;
      this.loading = true;
    }, 1000),

    // 上传界面帮助
    ulHelpShow: function () {
      this.$notify({
        type: "info",
        title: "上传提示",
        dangerouslyUseHTMLString: true,
        message:
          "<strong>科目</strong>\
          <p>可从远程拉取已有科目中选择, 也可新添科目</p>\
          <strong>题型</strong>\
          <p>目前仅支持单选/多选/判断/填空/主观题, 若为选择题则会出现选项栏</p>\
          <strong>关键词</strong>\
          <p>请从题目内容中摘选至少一个关键词</p>\
          <strong>题目内容</strong>\
          <p>输入文本格式题目内容, 公式请用Latex格式, 若存在图片资源, 请在<code>题目资源</code>中上传</p>\
          <strong>选项</strong>\
          <p>仅当题型为选择题时可用, 要求同<em>答案</em></p>\
          <strong>答案</strong>\
          <p>输入文本格式题目内容, 可以有多个, 依次输入即可, 点击空白处/回车即保存</p>\
          <strong>题目资源(可选)</strong>\
          <p>数量限一张, 大小尽量小即可</p>\
          <strong>入库时间</strong>\
          <p>系统自动添加, 若停留太久, 可点击右侧更新按钮刷新时间</p>\
          <strong>最近使用(可选)</strong>\
          <p>若题目已试用过则请添加本项, 目前仅支持选择</p>",
        duration: 0,
      });
    },
  },
  watch: {
    // 搜索防抖, 1秒后传给router-view
    searchingKey: function () {
      this.testSearch();
    },
    composeList: function () {
      this.bannedList = this.composeList.concat(this.deleteList);
    },
    deleteList: function () {
      this.bannedList = this.composeList.concat(this.deleteList);
    }
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
  padding: 10px;
  margin: 20px 0 20px 0;
  border-radius: 10px;
  background-color: #394045;
}

:deep() .qElCol {
  min-height: 40px;  
}

.qHeaderBtn {
  height: 16px;
  padding: 6px 10px;
  color: #ffd7ba;
  font-weight: bold;
  display: inline;
  background-color: #363232;
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

/* 抽屉允许滚动 */
:deep() .el-drawer__body {
   overflow: auto;
}
:deep() .el-drawer__container ::-webkit-scrollbar{
  display: none;
}

/* 组卷界面drawer */
:deep() .el-drawer__header {
  margin-bottom: 0;
}
:deep() .el-divider__text {
  border-radius: 15px;
}
:deep() .el-divider--horizontal {
  margin: 10px 0;
}

/* 上传界面drawer */
.ulHelpBtn {
  border: 0;
}

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