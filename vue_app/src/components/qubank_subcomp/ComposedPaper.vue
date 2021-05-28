<template>
  <el-container class="cp_body">
    <!-- 试卷操作 -->
    <el-header class="cp_header">
      <el-row :gutter="20">
        <el-col :span="4"><el-button>按钮</el-button></el-col>
        <el-col :span="4"><el-button>按钮</el-button></el-col>
        <el-col :span="4"><el-button>按钮</el-button></el-col>
        <el-col :span="4"
          ><el-badge
            :value="composeCounter"
            :max="50"
            type="warning"
            :hidden="composeCounter == 0 ? true : false"
            ><el-button @click="showPieSwitch">按钮</el-button>
          </el-badge></el-col
        >
      </el-row>
    </el-header>

    <!-- 试卷预览 -->
    <el-main class="cp_main"></el-main>
  </el-container>
</template>

<script>
export default {
  name: "ComposedPaper",
  inject: ["reload"], //注入刷新依赖
  data() {
    return {
      cpChartVisible: false,
    };
  },
  props: [
    "composeCounter",
    "composeList",
    "compList_sc",
    "compList_mc",
    "compList_tf",
    "compList_gf",
    "compList_sj",
  ],
  methods: {
    showPieSwitch: function () {
      this.cpChartVisible = !this.cpChartVisible;
      if (this.cpChartVisible == true) {
        console.log("to show");
        this.$emit("chartAffix", true);
      } else {
        console.log("to close");
        this.$emit("chartAffix", false);
      }
    },
  },
  mounted() {},
  watch: {},
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
</style>