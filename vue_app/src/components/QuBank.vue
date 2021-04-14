<template>
    <el-container class="qubankLayout">
      <el-header name="qActionBar" class="qHeader" height="auto">
        <el-row
          class="qHeaderRow"
          :gutter="20"
          type="flex"
          align="middle"
          justify="center"
        >
          <el-col :span="4"> 搜索框及按钮 </el-col>
          <el-col :span="4"> 加至试卷 </el-col>
          <el-col :span="4"> 上传按钮 </el-col>
          <el-col :span="4"> 删除按钮 </el-col>
          <el-col :span="4" :offset="3">
            <el-button
              type="primary"
              size="mini"
              icon="iconfont icon-shijuanguanli"
              >组卷+badge</el-button
            >
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside name="qFilterBar" class="qAside" width="200px">
          <el-menu default-active="" class="qAsideMenu" router>
            <el-submenu index="1" class="qAsideMenuFont">
              <template #title>
                <i class="el-icon-finished"></i>
                <span>选择题</span>
              </template>
              <el-menu-item class="qAsideSubMenuFont" index="1-1">
                <i class="iconfont icon-danxuankuang"></i>
                <template #title> 单选题</template>
              </el-menu-item>
              <el-menu-item class="qAsideSubMenuFont" index="1-2" widt="20px">
                <i class="iconfont icon-duoxuankuang"></i>
                <template #title> 多选题</template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item class="qAsideMenuFont" index="2">
              <i class="iconfont icon-panduan"></i>
              <template #title> 判断题</template>
            </el-menu-item>
            <el-menu-item class="qAsideMenuFont" index="3">
              <i class="iconfont icon-tiankongti"></i>
              <template #title> 填空题</template>
            </el-menu-item>
            <el-menu-item class="qAsideMenuFont" index="4">
              <i class="iconfont icon-zhuguanti"></i>
              <template #title> 主观题</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main name="qDisplay" class="qMain">
          Main
          <router-view></router-view>
        </el-main>
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
  width: auto;
  height: 100%;
  padding: 0;
  margin: 20px 0 20px 0;
  border-radius: 10px;
  background-color: cyan;
}

.qHeaderRow {
  width: 100%;
  margin: 10px;
}

.qAside {
  height: 75%;
  margin-right: 20px;
  border-radius: 10px;
  background-color: cadetblue;
}

.qAsideMenu {
  height: 100%;
}

.qAsideMenuFont {
}

.qAsideSubMenuFont {
}

.qMain {
  height: 400px;
  width: 100%;
  border-radius: 10px;
  background-color: darkcyan;
}

/* 竖直页码 */
.el-pager {
  display: flex;
  flex-direction: column;
}

.el-pager > li {
  width: 20px;
}
</style>