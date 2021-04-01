<template>
  <el-container class="manageLayout">
    <!-- 左侧边栏 -->
    <el-aside class="mAside" width="auto">
      <!-- 导航栏内容 -->
      <el-menu default-active="1-1" class="mAsideMenu" :collapse="isCollapse">
        <!-- 切换按钮 -->
        <button class="mAsideCollapBtn" @click="isCollapse = !isCollapse">
          <i class="el-icon-s-unfold"></i>
        </button>
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-user-solid"></i>
            <span>用 户 管 理</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-edit"></i>
            <template #title>帐号维护</template>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-document-checked"></i>
            <template #title>注册管理</template>
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
      test
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
  --display-height: calc(100% - 85px);
  width: 100%;
  height: var(--display-height);
  position: absolute;
}

.mAsideCollapBtn {
  width: 65px;
  height: 56px;
  margin: 0;
  padding: 0 20px 0 20px;
  outline: none;
  border: none;
  background: none;
  font-size: 18px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  background-color: var(--color-primary);
}

.mAsideMenu {
  margin: 15px;
  height: var(--display-height);
}

.mAsideMenu:not(.el-menu--collapse) {
  min-width: 175px;
}

.mMainBody {
}
</style>