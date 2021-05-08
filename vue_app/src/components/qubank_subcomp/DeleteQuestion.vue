<template>
  <el-container>
    <!-- 删除列表操作 -->
    <el-header
      ><p>
        准备删除题目数: {{ deleteCounter }}<br />
        <el-tag type="info" v-for="item in deleteList" :key="item">{{
          "ID: " + item._id
        }}</el-tag>
      </p>
      <el-button>按钮</el-button>
      <el-button>按钮</el-button>
      <el-button>按钮</el-button>
    </el-header>

    <!-- 删除预览 -->
    <el-main>
      <el-table
        :data="Array.from(deleteList)"
        style="width: 100%"
      >
        <el-table-column prop="type" label="类型" width="60"></el-table-column>
        <el-table-column prop="_id" label="ID" width="140"></el-table-column>
        <el-table-column prop="question" label="题面"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "DeleteQuestion",
  data() {
    return {};
  },
  props: ["deleteCounter", "deleteList"],
};
</script>

<style scoped>
</style>