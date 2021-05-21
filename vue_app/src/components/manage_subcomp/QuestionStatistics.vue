<template>
  <el-container class="qs_container">
    <!-- 题目统计 chart -->
    <el-main class="qs_main" style="width: 65%">
      <div
        id="qdChart"
        class="qs_chart qs_quantityChart"
        v-loading="qdLoading"
      ></div>
    </el-main>
    <el-divider direction="vertical" style="height: 100%"></el-divider>
    <!-- 操作统计 chart -->
    <el-main class="qs_main" style="width: 35%">
      <div
        id="odChart"
        class="qs_chart qs_operationChart"
        v-loading="odLoading"
      ></div>
    </el-main>
  </el-container>
</template>

<script>
// 按需引入 ECharts 各模块来减小打包体积
import * as echarts from "echarts/core";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 引入柱状图、饼图，图表后缀都为 Chart
import { BarChart, PieChart } from "echarts/charts";
import {
  CalendarComponent,
  GridComponent,
  LegendComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";

echarts.use([
  CanvasRenderer,
  BarChart,
  PieChart,
  CalendarComponent,
  GridComponent,
  LegendComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
]);

export default {
  name: "QuestionStatistics",
  data() {
    return {
      qdLoading: true,
      odLoading: true,
      qdChart: "",
      odChart: "",
      quantityData: {
        title: {
          show: true,
          text: "各题型数量统计",
          textStyle: {
            fontSize: 23,
          },
          subtext: "悬停查看各题型数量\n点击对应图例隐藏或显示该题型",
          subtextStyle: {
            fontSize: 13,
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "各题型数量统计",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
              scale: true,
              scaleSize: 30,
              focus: "self",
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
      OperationData: {
        title: {
          show: true,
          text: "题库操作统计",
          textStyle: {
            fontSize: 23,
          },
        },
        xAxis: {
          type: "category",
          data: ["新增操作", "删除操作"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.3)",
            },
          },
        ],
      },
    };
  },
  methods: {
    // axios - get 题目数量统计
    getQuantityStatistic: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/quantitystatistic",
        data: {
          atoken: localStorage.getItem("atoken"),
        },
      })
        .then((response) => {
          // 处理登录结果
          // 返回:  {data: [ num0, num1, num2, num3, num4 ]}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res);
          this.$nextTick(() => {
            this.quantityData.series[0].data = res;
            this.qdChart = echarts.init(document.getElementById("qdChart"));
            this.qdChart.setOption(this.quantityData);
            this.qdLoading = false;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // axios - get 近期操作统计
    getOperationStatistic: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/operationstatistic",
        data: {
          atoken: localStorage.getItem("atoken"),
        },
      })
        .then((response) => {
          // 处理登录结果
          // 返回:  {data: [ addNum, delNum ] }
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res.data);
          this.$nextTick(() => {
            this.OperationData.series[0].data = res.data;
            this.odChart = echarts.init(document.getElementById("odChart"));
            this.odChart.setOption(this.OperationData);
            this.odLoading = false;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getQuantityStatistic();
    this.getOperationStatistic();
  },
};
</script>

<style scoped>
.qs_container {
  height: 100%;
}

.qs_main {
  height: 100%;
  border-radius: 20px;
}

.qs_chart {
  height: 100%;
  width: 100%;
}
</style>