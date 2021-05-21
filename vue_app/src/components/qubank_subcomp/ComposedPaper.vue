<template>
  <el-container class="cp_body">
    <!-- 试卷操作 -->
    <el-header class="cp_header">
      <el-space size="small">
        <el-row :gutter="20">
          <el-col :span="8"><el-button>按钮</el-button></el-col>
          <el-col :span="8"><el-button>按钮</el-button></el-col>
          <el-col :span="8"><el-button>按钮</el-button></el-col>
        </el-row>
        <div id="cpCounterChart" class="cp_chart"></div>
      </el-space>
    </el-header>

    <!-- 试卷预览 -->
    <el-main class="cp_main"></el-main>
  </el-container>
</template>

<script>
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
  name: "ComposedPaper",
  inject: ["reload"], //注入刷新依赖
  data() {
    return {
      cpChart: "",
      cpChartOption: {
        title: {
          text: "已选题目统计",
          left: "center",
          textStyle: {
            fontSize: 15,
          },
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1, name: "单选题" },
              { value: 1, name: "多选题" },
              { value: 1, name: "判断题" },
              { value: 1, name: "填空题" },
              { value: 1, name: "主观题" },
              { value: 1, name: "可选量" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
  props: ["composeCounter", "composeList"],
  mounted() {
    this.cpChart = echarts.init(document.getElementById("cpCounterChart"));
    this.cpChart.setOption(this.cpChartOption);
  },
  watch: {
    compList_sc: function () {},
  },
};
</script>

<style scoped>
.cp_body {
  height: 100%;
  width: 100%;
}

.cp_header {
  height: 20%;
  width: 100%;
}

.cp_main {
  height: 80%;
  width: 100%;
}

.cp_chart {
  height: 100%;
  width: 100%;
}
</style>