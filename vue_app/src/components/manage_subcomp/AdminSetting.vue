<template>
  <div id="as_mainbody" class="as_mainbody">
    <h2 id="as_h2" class="as_h2">
      <i class="el-icon-s-tools"></i>
      系统设置
    </h2>
    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>
    > 管理接口 <br />
    > 修改当前管理员密码 <br />
  </div>
</template>

<script>
export default {
  name: "AdminSetting",
  data() {
    return {};
  },
};
</script>

<style scoped>
.as_mainbody {
  height: 100%;
}

.as_h2 {
  margin: 0;
}
</style>