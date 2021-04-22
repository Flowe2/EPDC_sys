<template>
  <el-container>
    <!-- 试卷预览 -->
    <el-main
      ><p>
        已选试题数: {{ chosenCounter }}<br />
        <el-tag type="info" v-for="item in chosenList" :key="item">{{
          "ID: " + item.id
        }}</el-tag>
      </p></el-main
    >
    <!-- 试卷操作 -->
    <el-header>
      <el-button>按钮</el-button><el-button>按钮</el-button
      ><el-button>按钮</el-button>
    </el-header>
  </el-container>
</template>

<script>
export default {
  name: "ComposedPaper",
  data() {
    return {};
  },
  props: ["chosenCounter", "chosenList"],
};
</script>

<style scoped>

</style>