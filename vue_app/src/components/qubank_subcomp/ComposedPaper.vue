<template>
  <el-container>
    <!-- 试卷操作 -->
    <el-header
      ><p>
        已选试题数: {{ composeCounter }}<br />
        <el-tag type="info" v-for="item in composeList" :key="item">{{
          "ID: " + item.id
        }}</el-tag>
      </p>
      <el-button>按钮</el-button><el-button>按钮</el-button
      ><el-button>按钮</el-button>
    </el-header>

    <!-- 试卷预览 -->
    <el-main></el-main>
  </el-container>
</template>

<script>
export default {
  name: "ComposedPaper",
  data() {
    return {
      compList_sc: [],
      compList_mc: [],
      compList_tf: [],
      compList_gf: [],
      compList_sj: [],
    };
  },
  props: ["composeCounter", "composeList"],
};
</script>

<style scoped>
</style>