<template>
  <el-container class="manageLayout">
    <!-- 左侧边栏 -->
    <el-aside class="mAside">
      <!-- 切换按钮 -->
      <el-button
        v-if="isCollapse"
        icon="el-icon-caret-bottom"
        round
        @click="isCollapse = !isCollapse"
      ></el-button>
      <el-button
        v-else
        icon="el-icon-caret-top"
        round
        @click="isCollapse = !isCollapse"
      ></el-button>
      <el-menu
        default-active="3"
        class="mAsideMenu"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-user-solid"></i>
            <span>用 户 管 理</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-document-checked"></i>
            <template #title>注册管理</template>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-edit"></i>
            <template #title>帐号维护</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>系 统 日 志</template>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <template #title>设 置</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- display area -->
    <el-main>
      main
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {},
};
</script>

<style>
.manageLayout {
  width: 100%;
  height: calc(100% - 85px);
  position: absolute;
}

.mAsideMenu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.mMainBody {
}
</style>