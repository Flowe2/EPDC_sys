<template>
  <el-container id="qubankLayout" class="qubankLayout">
    <el-header name="qActionBar" class="qHeader" height="auto">
      <el-row :gutter="10">
        <el-col :span="1.5" class="qElCol">
          <el-tooltip content="上传题目界面" placement="top">
            <el-button
              class="qHeaderBtn qHeaderUpNDel"
              icon="el-icon-upload"
              @click="ulDrawer = true"
              >上 传</el-button
            >
          </el-tooltip></el-col
        >
        <el-col :span="1.5" class="qElCol">
          <el-tooltip content="删除题目界面" placement="top">
            <el-badge
              :value="deleteCounter"
              :max="50"
              type="warning"
              :hidden="deleteCounter == 0 ? true : false"
            >
              <el-button
                class="qHeaderBtn"
                icon="el-icon-delete-solid"
                @click="dtDrawer = true"
                >删 除</el-button
              >
            </el-badge>
          </el-tooltip></el-col
        >
        <el-col :span="4" :offset="1" class="qElCol">
          <el-input
            prefix-icon="el-icon-search"
            clearable
            v-model="searchingKey"
            placeholder="输入后请稍等"
          ></el-input>
        </el-col>
        <el-col :span="1" class="qElCol">
          <el-popover
            placement="bottom-start"
            :width="400"
            trigger="click"
          >
            <template #reference>
              <el-button
                class="qHeaderBtn qHeaderUpNDel"
                title="更多条件筛选"
                icon="el-icon-more-outline"
              ></el-button>
            </template>
            <el-date-picker
              v-model="searchingDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              :default-date="new Date()"
            >
            </el-date-picker>
          </el-popover>
        </el-col>
        <el-col :span="2.5" :offset="5" class="qElCol">
          <el-tooltip content="将所选题目加入待删除列表" placement="top">
            <el-button
              class="qHeaderBtn"
              icon="el-icon-remove-outline"
              @click="addToTarget('del')"
              >准备删除</el-button
            ></el-tooltip
          ></el-col
        >
        <el-col :span="2.5" class="qElCol">
          <el-tooltip content="将所选题目加入组卷列表" placement="top">
            <el-button
              class="qHeaderBtn"
              icon="el-icon-circle-plus-outline"
              @click="addToTarget('add')"
              >加入试卷</el-button
            ></el-tooltip
          ></el-col
        >
        <el-col :span="1">
          <el-tooltip content="设置组卷题目数量阈值" placement="top">
            <el-button
              class="qHeaderBtn"
              icon="el-icon-set-up"
              @click="seteExpectNumVisible = true"
            >
            </el-button
          ></el-tooltip>
        </el-col>
        <el-col :span="2.5" :offset="1" class="qElCol">
          <el-tooltip content="组卷界面" placement="top">
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
            </el-badge></el-tooltip
          ></el-col
        >
      </el-row>
    </el-header>

    <el-dialog title="试卷题目数量阈值" v-model="seteExpectNumVisible">
      <span class="dialog-footer">
        <el-button @click="seteExpectNumVisible = false">取 消</el-button>
        <el-button type="primary" @click="seteExpectNumVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-container class="qMain">
      <!-- 侧边栏, 题型选择 -->
      <el-aside name="qFilterBar" class="qAside" width="200px">
        <el-menu
          :default-active="$route.path"
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
          <el-menu-item
            class="qAsideMenuFont qAsideBottom"
            :index="indexList[5].path"
          >
            <i class="el-icon-time"></i>
            <template #title>{{ indexList[5].name }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主容器, 展示题库 -->
      <el-main name="qDisplay" class="qDisplay">
        <router-view
          :searchingKey="debounceSearchKey"
          :loading="loading"
          :bannedList="bannedList"
          @loading="loading = $event"
          @toTempList="toTempList"
        ></router-view>
      </el-main>
    </el-container>

    <!-- 组卷子组件 -->
    <el-drawer v-model="cpDrawer" class="cpDrawer" direction="rtl" size="60%">
      <template #title
        ><span>组 卷 界 面</span
        ><el-button
          size="small"
          circle
          icon="el-icon-question"
          class="drawerHelpBtn"
          title="组卷提示"
          @click="cpHelpShow"
        ></el-button
      ></template>
      <el-divider content-position="right"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <ComposedPaper
        :composeCounter="composeCounter"
        :composeList="composeList"
        :cpDrawer="cpDrawer"
        :compList_sc="compList_sc"
        :compList_mc="compList_mc"
        :compList_tf="compList_tf"
        :compList_gf="compList_gf"
        :compList_sj="compList_sj"
        @chartAffix="chartAffix"
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
          class="drawerHelpBtn"
          title="上传提示"
          @click="ulHelpShow"
        ></el-button
      ></template>
      <el-divider content-position="left"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <UploadQuestion :ulDrawer="ulDrawer"></UploadQuestion>
    </el-drawer>

    <!-- 删除界面 -->
    <el-drawer
      v-model="dtDrawer"
      id="dtDrawer"
      class="dtDrawer"
      direction="ltr"
      size="40%"
    >
      <template #title
        ><span>删 除 界 面</span
        ><el-button
          size="small"
          circle
          icon="el-icon-question"
          class="drawerHelpBtn"
          title="删除提示"
          @click="dtHelpShow"
        ></el-button
      ></template>
      <el-divider content-position="left"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <DeleteQuestion
        :deleteCounter="deleteCounter"
        :deleteList="deleteList"
        @toTempList="toTempList"
        @delOneFromDQ="delFromTarget"
        @delAllFromDQ="delFromTarget"
      ></DeleteQuestion>
    </el-drawer>
    <el-affix class="cpChartAffix" target=".qAside" v-show="chartAffixVisible">
      <div id="cpCounterChart" class="cp_chart"></div>
    </el-affix>
  </el-container>
</template>

<script>
import _ from "lodash";
import ComposedPaper from "@/components/qubank_subcomp/ComposedPaper.vue";
import UploadQuestion from "@/components/qubank_subcomp/UploadQuestion.vue";
import DeleteQuestion from "@/components/qubank_subcomp/DeleteQuestion.vue";

// 按需引入 ECharts 各模块来减小打包体积
import * as echarts from "echarts/core";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 引入柱状图、饼图，图表后缀都为 Chart
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";

echarts.use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
]);

export default {
  name: "QuBank",
  inject: ["reload"], //注入刷新依赖
  data() {
    return {
      indexList: [
        {
          path: "/user/qubank/questiondisplay/sc",
          name: " 单 选 题",
        },
        {
          path: "/user/qubank/questiondisplay/mc",
          name: " 多 选 题",
        },
        {
          path: "/user/qubank/questiondisplay/tf",
          name: " 判 断 题",
        },
        {
          path: "/user/qubank/questiondisplay/gf",
          name: " 填 空 题",
        },
        {
          path: "/user/qubank/questiondisplay/sj",
          name: " 主 观 题",
        },
        {
          path: "/user/composehistory",
          name: "组 卷 历 史",
        },
      ],
      loading: false,
      searchingKey: "",
      debounceSearchKey: "",
      searchingDate: [],
      tempAddList: [], // 暂存试题 - 加入到组卷或删除
      tempDelList: [], // 暂存试题 - 从组卷或删除中移除
      bannedList: new Set(),
      composeCounter: 0, // 已选题目数量
      composeList: new Set(), // 已选试题列表
      deleteCounter: 0, // 预删除题目数量
      deleteList: new Set(), // 预删除试题列表
      seteExpectNumVisible: false, // 设置题目数量阈值dialog
      composeCounterExp: 50, // 预期题目数量 - default=50
      maxCounter: 50, // 自定义预计题目数量
      cpDrawer: false, // 组卷drawer
      ulDrawer: false, // 上传drawer
      dtDrawer: false, // 删除drawer
      chartAffixVisible: false, // 固钉状态
      cpChart: "",
      cpChartOption: {
        tooltip: {
          trigger: "item",
          position: "top",
        },
        series: [
          {
            name: "已选题目",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "inner",
            },
            emphasis: {
              label: {
                show: true,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 0, name: "单选题" },
              { value: 0, name: "多选题" },
              { value: 0, name: "判断题" },
              { value: 0, name: "填空题" },
              { value: 0, name: "主观题" },
            ],
          },
        ],
      },
      compList_sc: [],
      compList_mc: [],
      compList_tf: [],
      compList_gf: [],
      compList_sj: [],
    };
  },
  components: {
    ComposedPaper,
    UploadQuestion,
    DeleteQuestion,
  },
  methods: {
    // 加入到组卷或删除
    toTempList: function (opt, tempList) {
      if (opt == "add") {
        this.tempAddList = tempList;
      } else {
        this.tempDelList = tempList;
      }
    },

    // 加入组卷/删除
    addToTarget: function (target) {
      if (target == "add") {
        this.tempAddList.forEach((element) => {
          // 所选加入到组卷
          this.composeList.add(element);
        });
        this.composeCounter = this.composeList.size;
      } else {
        this.tempAddList.forEach((element) => {
          // 所选加入到删除
          this.deleteList.add(element);
        });
        this.deleteCounter = this.deleteList.size;
      }
      // 清除
      this.tempAddList = [];
      this.bannedList = this.concatSet();
    },

    // 组卷/删除移除
    delFromTarget: function (target) {
      // let templist = this.tempDelList;
      if (target == "add") {
        // 所选从删除移除
        let temp = Array.from(this.composeList);
        temp = temp.filter((v) => {
          let pass = true;
          for (let i = 0; i < this.tempDelList.length; i++) {
            if (v._id == this.tempDelList[i]._id) {
              pass = false;
            }
          }
          return pass;
        });
        this.composeList = new Set(temp);
        this.composeCounter = this.composeList.size;
      } else if (target == "del") {
        // 所选从删除移除
        let temp = Array.from(this.deleteList);
        temp = temp.filter((v) => {
          let pass = true;
          for (let i = 0; i < this.tempDelList.length; i++) {
            if (v._id == this.tempDelList[i]._id) {
              pass = false;
            }
          }
          return pass;
        });
        this.deleteList = new Set(temp);
        this.deleteCounter = this.deleteList.size;
      } else if (target == "addAll") {
        this.composeList.clear();
        this.composeCounter = this.composeList.size;
      } else {
        this.deleteList.clear();
        this.deleteCounter = this.deleteList.size;
      }
      // 清除
      this.tempDelList = [];
      this.bannedList = this.concatSet();
    },

    // 合并组卷和删除集合
    concatSet: function () {
      let _union = new Set(this.composeList);
      for (let val of this.deleteList) {
        _union.add(val);
      }
      // console.log(_union);
      return _union;
    },

    // 搜索 - 防抖
    debounceSearch: _.debounce(function () {
      this.debounceSearchKey = this.searchingKey;
      this.loading = true;
    }, 1000),

    // 上传界面帮助
    ulHelpShow: function () {
      this.$notify({
        type: "info",
        title: "上传提示",
        offset: 100,
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

    // 删除提示
    dtHelpShow: function () {
      this.$notify({
        type: "info",
        title: "删除提示",
        offset: 100,
        dangerouslyUseHTMLString: true,
        message:
          "<strong>题目详情</strong>\
          <p>点击对应题目的题面处, 即可查看详情</p>\
          <strong>清空 和 移除</strong>\
          <p>勾选题目点击移除可将其移除待删除列表, 也可使用清空重置待删除列表</p>\
          <strong>删除</strong>\
          <p style='color: red'>删除操作不可撤回, 请主动确认</p>",
        duration: 5000,
      });
    },

    // 删除提示
    cpHelpShow: function () {
      this.$notify({
        type: "info",
        title: "组卷提示",
        position: "top-left",
        offset: 100,
        dangerouslyUseHTMLString: true,
        message:
          "<strong>选题提示</strong>\
          <p>选题提示按钮右上角会显示已选题目数量, 单击可开关可视化饼图提示</p>\
          <strong>清空 和 移除</strong>\
          <p>勾选题目点击移除可将其移除预组卷列表, 也可使用清空重置待预组卷列表</p>",
        duration: 5000,
      });
    },

    // pie chart init
    cpPieInit: function () {
      this.cpChart = echarts.init(document.getElementById("cpCounterChart"));
      this.cpChart.setOption(this.cpChartOption);
    },

    // 题目分类 & 更新pie chart
    clasifyQuestion: function () {
      this.compList_sc = [];
      this.compList_mc = [];
      this.compList_tf = [];
      this.compList_gf = [];
      this.compList_sj = [];
      this.composeList.forEach((qu) => {
        switch (qu.type) {
          case "sc":
            this.compList_sc.push(qu);
            break;
          case "mc":
            this.compList_mc.push(qu);
            break;
          case "tf":
            this.compList_tf.push(qu);
            break;
          case "gf":
            this.compList_gf.push(qu);
            break;
          case "sj":
            this.compList_sj.push(qu);
            break;
        }
      });
      this.cpChartOption.series[0].data = [
        { value: this.compList_sc.length, name: "单选题" },
        { value: this.compList_mc.length, name: "多选题" },
        { value: this.compList_tf.length, name: "判断题" },
        { value: this.compList_gf.length, name: "填空题" },
        { value: this.compList_sj.length, name: "主观题" },
      ];
      if (this.chartAffixVisible == true) {
        this.cpChart.setOption(this.cpChartOption);
      }
    },
    // pie固钉
    chartAffix: function (state) {
      this.chartAffixVisible = state;
      this.cpChart.setOption(this.cpChartOption);
    },

    // 阻止unload事件提示
    preReload: function (e) {
      e = e || window.event;
      if (e && (this.composeCounter > 0 || this.deleteCounter > 0)) {
        e.returnValue = "关闭提示";
      }
      return "关闭";
    },
  },
  watch: {
    // 搜索防抖, 1秒后传给router-view
    searchingKey: function () {
      this.debounceSearch();
    },
    composeCounter: function () {
      console.log("update");
      this.clasifyQuestion();
    },
  },
  mounted() {
    this.cpPieInit();
    // 刷新&关闭窗口都会触发
    window.addEventListener("beforeunload", this.preReload);
  },
  unmounted() {
    // 离开后销毁
    window.removeEventListener("beforeunload", this.preReload);
  },
  beforeRouteUpdate(to, from) {
    console.log(to.path);
    console.log(from.path);
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
  height: 70%;
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

.qAsideBottom {
  width: 100%;
  position: absolute;
  bottom: 5px;
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

.cpChartAffix {
  width: auto;
  height: auto;
  position: fixed;
  bottom: 20px;
}

.cp_chart {
  height: 200px;
  width: 200px;
}

/* 抽屉允许滚动 */
:deep() .el-drawer__body {
  overflow: auto;
}
:deep() .el-drawer__container ::-webkit-scrollbar {
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
.drawerHelpBtn {
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