<template>
  <el-container class="qubankLayout">
    <el-header name="qActionBar" class="qHeader">
      Header <el-divider direction="vertical"></el-divider> 新增/上传按钮
      <el-divider direction="vertical"></el-divider> 删除按钮
      <el-divider direction="vertical"></el-divider> 搜索框及按钮
      <el-divider direction="vertical"></el-divider>
      组卷界面按钮
    </el-header>

    <el-container>
      <el-aside name="qFilterBar" class="qAside" width="180px">Aside</el-aside>
      <el-main name="qDisplay" class="qMain">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "QuBank",
  data() {
    return {};
  },
  methods: {},
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
  margin: 20px 0 20px 0;
  border-radius: 10px;
  background-color: cyan;
}

.qAside {
  margin: 0 20px 100px 0;
  border-radius: 10px;
  background-color: cadetblue;
}

.qMain {
  border-radius: 10px;
  background-color: darkcyan;
}


.el-pager {
  display: flex;
  flex-direction: column;
}

.el-pager > li {
  width: 20px;
}
</style>