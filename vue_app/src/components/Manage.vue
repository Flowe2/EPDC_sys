<template>
  <el-container class="mLayout">
    <!-- 左侧边栏 -->
    <el-aside class="mAside" width="auto">
      <!-- 导航栏内容 -->
      <el-menu
        :default-active="$route.path"
        class="mAsideMenu"
        :collapse="isCollapse"
        router
      >
        <!-- 切换按钮 7191b00c7499d632ef7c8ffc45071cf67673655bfe68763c650f391300cc82b2 -->
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
          <el-menu-item
            class="mAsideSubMenuFont"
            :index="indexList[1].path"
            widt="20px"
          >
            <i class="el-icon-document-checked"></i>
            <template #title>{{ indexList[1].name }}</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item class="mAsideMenuFont" :index="indexList[2].path">
          <i class="el-icon-s-data"></i>
          <template #title>{{ indexList[2].name }}</template>
        </el-menu-item>
        <el-menu-item class="mAsideMenuFont" :index="indexList[3].path">
          <i class="el-icon-s-order"></i>
          <template #title>{{ indexList[3].name }}</template>
        </el-menu-item>
        <el-menu-item class="mAsideMenuFont" :index="indexList[4].path">
          <i class="el-icon-s-tools"></i>
          <template #title>{{ indexList[4].name }}</template>
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
          path: "/admin/manage/usermaintain",
          name: "账号维护",
        },
        {
          path: "/admin/manage/signupcheck",
          name: "注册管理",
        },
        {
          path: "/admin/manage/questionstatistics",
          name: "题库统计",
        },
        {
          path: "/admin/manage/systemlog",
          name: "系统日志",
        },
        {
          path: "/admin/manage/adminsetting",
          name: "系统设置",
        },
      ],
    };
  },
  methods: {
    test: function () {
      console.log();
    },
  },
};
</script>

<style scoped>
.mLayout {
  --display-height: calc(100% - 85px);
  width: 100%;
  height: var(--display-height);
  position: absolute;
}

.mAside {
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
  border-right: 0;
  border-radius: 15px;
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

/* 覆盖所有子组件 */
:deep() .el-divider__text {
  border-radius: 15px;
}

:deep() .mElTable {
  border-radius: 15px;
}

/* 覆盖elemnt原生分页器样式, 增加圆角 */
:deep() .el-pagination .btn-prev {
  border-radius: 15px 0 0 15px;
}
:deep() .el-pagination .btn-next {
  border-radius: 0 15px 15px 0;
}
</style>