<template>
  <el-container class="manageLayout">
    <!-- 左侧边栏 -->
    <el-aside class="mAside" width="auto">
      <!-- 导航栏内容 -->
      <el-menu default-active="/admin/manage/usermaintain" class="mAsideMenu" :collapse="isCollapse" :router="enableRouter">
        <!-- 切换按钮 -->
        <button class="mAsideCollapBtn" @click="isCollapse = !isCollapse">
          <i class="el-icon-s-unfold"></i>
        </button>
        <el-submenu index="1" class="mAsideMenuFont">
          <template #title>
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item class="mAsideSubMenuFont" :index="indexList[0].path">
            <i class="el-icon-edit"></i>
            <template #title>{{ indexList[0].name }}</template>
          </el-menu-item>
          <el-menu-item class="mAsideSubMenuFont" :index="indexList[1].path" widt='20px'>
            <i class="el-icon-document-checked"></i>
            <template #title>{{ indexList[1].name }}</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item class="mAsideMenuFont" :index="indexList[2].path">
          <i class="el-icon-s-order"></i>
          <template #title>{{ indexList[2].name }}</template>
        </el-menu-item>
        <el-menu-item class="mAsideMenuFont" :index="indexList[3].path">
          <i class="el-icon-setting"></i>
          <template #title>{{ indexList[3].name }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- display area -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      isCollapse: true,
      enableRouter: true,
      indexList: [
        {
          path: '/admin/manage/usermaintain',
          name: '账号维护'
        },
        {
          path: '/admin/manage/signupcheck',
          name: '注册管理'
        },
        {
          path: '/admin/manage/systemlog',
          name: '系统日志'
        },
        {
          path: '/admin/manage/adminsetting',
          name: '设置'
        },
      ],
      viewName: '',
    };
  },
  methods: {
    test: function () {
      console.log();
    },
  }
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

.mAsideMenuFont {

}

.mAsideSubMenuFont {

}

.mMainBody {
}
</style>