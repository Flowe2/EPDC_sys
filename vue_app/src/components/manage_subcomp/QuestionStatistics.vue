<template>
  <div id="qs_mainbody" class="qs_mainbody">
    <h2 id="qs_h2" class="qs_h2">
      <i class="el-icon-s-data"></i>
      题库统计
    </h2>

    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>
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
          id="hmChart"
          class="qs_chart qs_userHeatMap"
          v-loading="hmLoading"
        ></div>
      </el-main>
    </el-container>
    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>
  </div>
</template>

<script>
// 按需引入 ECharts 各模块来减小打包体积
import * as echarts from "echarts/core";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 引入柱状图、饼图，图表后缀都为 Chart
import { HeatmapChart, PieChart } from "echarts/charts";
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
  CalendarComponent,
  CanvasRenderer,
  GridComponent,
  HeatmapChart,
  LegendComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  PieChart,
  VisualMapComponent,
]);

export default {
  name: "QuestionStatistics",
  data() {
    return {
      qdLoading: true,
      hmLoading: true,
      qdChart: "",
      hmChart: "",
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
        backgroundColor: "rgba(52,58,63, 0.05)",
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
      HeatmapData: {
        title: {
          show: true,
          text: "用户活跃热力图",
          textStyle: {
            fontSize: 23,
          },
          subtext: "近6月",
          subtextStyle: {
            fontSize: 13,
            fontWeight: "normal",
          },
        },
        tooltip: {
          position: "top",
          formatter: function (p) {
            var format = echarts.format.formatTime("yyyy-MM-dd", p.data[0]);
            return format + ": " + p.data[1] + " times";
          },
        },
        visualMap: {
          min: 0,
          max: 200,
          type: "continuous",
          calculable: true,
          orient: "vertical",
          left: 20,
          backgroundColor: "rgba(52,58,63, 0.1)",
        },
        backgroundColor: "rgba(52,58,63, 0.05)",
        calendar: [
          {
            orient: "vertical",
            left: "middle",
            range: [],
            cellSize: [20, "auto"],
            monthLabel: {
              nameMap: "en",
            },
            dayLabel: {
              nameMap: "cn",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(52,58,63, 1)",
                width: 2,
              },
            },
            itemStyle: {
              color: "rgba(52,58,63, 0.4)",
            },
          },
        ],
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: [],
            emphasis: {
              focus: "series",
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
    getHeatmapStatistic: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/getuserheatstatistic",
        data: {
          atoken: localStorage.getItem("atoken"),
        },
      })
        .then((response) => {
          // 处理登录结果
          // 返回:  { startEnd: [starttime, endtime], data: [ addNum, delNum ] }
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res.data);
          this.$nextTick(() => {
            this.HeatmapData.calendar[0].range = res.startEnd;
            this.HeatmapData.title.subtext =
              "近六月:\n" + res.startEnd[0] + " ~ " + res.startEnd[1];
            this.HeatmapData.series[0].data = res.data;
            this.hmChart = echarts.init(document.getElementById("hmChart"));
            this.hmChart.setOption(this.HeatmapData);
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
    this.getHeatmapStatistic();
    window.onresize = () => {
      this.qdChart.setOption(this.quantityData);
      this.hmChart.setOption(this.HeatmapData);
    };
  },
};
</script>

<style scoped>
.qs_mainbody {
  height: 100%;
}

.qs_h2 {
  margin: 0;
}

.qs_container {
  height: 80%;
}

.qs_main {
  height: 100%;
  border-radius: 20px;
}

.qs_chart {
  height: 100%;
  width: 100%;
  border-radius: 20px;
}
</style>