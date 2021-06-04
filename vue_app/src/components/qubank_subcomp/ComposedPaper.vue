<template>
  <el-container class="cp_body">
    <!-- 试卷操作 -->
    <el-header class="cp_header" height="40px">
      <el-row :gutter="20" style="margin: auto">
        <el-col :span="4"
          ><el-badge
            :value="composeCounter"
            :max="50"
            type="warning"
            :hidden="composeCounter == 0 ? true : false"
            ><el-button type="info" @click="showPieSwitch">选题提示</el-button>
          </el-badge></el-col
        >
        <el-col :span="2.5"
          ><el-button type="primary" :disabled="cpBtnDisabled"
            >移除</el-button
          ></el-col
        >
        <el-col :span="2.5"
          ><el-button type="primary" :disabled="cpBtnDisabled"
            >清空</el-button
          ></el-col
        >
        <el-col :span="2.5" :offset="1"
          ><el-button
            type="primary"
            :disabled="cpBtnDisabled"
            @click="cpCheckedCpCheck"
            >查重</el-button
          ></el-col
        ><el-col :span="2.5"
          ><el-button
            type="primary"
            :disabled="cpBtnDisabled"
            @click="cpCheckedCpCheck"
            >查重</el-button
          ></el-col
        >
        <el-col :span="8">
          <el-select
            class="cpTypeChoose"
            v-model="cpType"
            :disabled="cpBtnDisabled"
            placeholder="默认JSON格式"
          >
            <el-option
              v-for="item in cpTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option></el-select
          >&nbsp;<el-button type="success" :disabled="cpBtnDisabled"
            >生成试卷</el-button
          ></el-col
        >
      </el-row>
    </el-header>
    <el-steps :active="composeCounter == 0 ? 0 : cpChecked ? 2 : 1" simple>
      <el-step title="选题" icon="el-icon-document-add"></el-step>
      <el-step title="查重" icon="el-icon-view"></el-step>
      <el-step title="组卷" icon="el-icon-document-checked"></el-step>
    </el-steps>
    <!-- 试卷预览 -->
    <el-main class="cp_main">
      <el-collapse v-model="activeQuestionType">
        <el-collapse-item name="sc">
          <template #title>
            <i class="iconfont icon-danxuankuang"></i>&nbsp;
            <el-button type="info" size="mini" round plain>{{
              compList_sc.length
            }}</el-button
            >&nbsp;
            <span class="cpCollapseTitle">单选题 SINGLE CHOICE</span>
          </template>
          <div>单选题</div>
        </el-collapse-item>
        <el-collapse-item name="mc">
          <template #title>
            <i class="iconfont icon-duoxuankuang"></i>&nbsp;
            <el-button type="info" size="mini" round plain>{{
              compList_mc.length
            }}</el-button
            >&nbsp;
            <span class="cpCollapseTitle">多选题 MULTIPLE CHOICE</span>
          </template>
          <div>多选题</div>
        </el-collapse-item>
        <el-collapse-item name="tf">
          <template #title>
            <i class="iconfont icon-panduan"></i>&nbsp;<el-button
              type="info"
              size="mini"
              round
              plain
              >{{ compList_tf.length }}</el-button
            >&nbsp;<span class="cpCollapseTitle">判断题 TRUE OF FALSE</span>
          </template>
          <div>判断题</div>
        </el-collapse-item>
        <el-collapse-item name="gf">
          <template #title>
            <i class="iconfont icon-tiankongti"></i>&nbsp;<el-button
              type="info"
              size="mini"
              round
              plain
              >{{ compList_gf.length }}</el-button
            >&nbsp;<span class="cpCollapseTitle">填空题 GAP FILLING</span>
          </template>
          <div>填空题</div>
        </el-collapse-item>
        <el-collapse-item name="sj">
          <template #title>
            <i class="iconfont icon-zhuguanti"></i>&nbsp;<el-button
              type="info"
              size="mini"
              round
              plain
              >{{ compList_sj.length }}</el-button
            >&nbsp;<span class="cpCollapseTitle">主观题 SUBJECTIVE</span>
          </template>
          <div>主观题</div>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ComposedPaper",
  inject: ["reload"], //注入刷新依赖
  data() {
    return {
      cpBtnDisabled: true, // 按钮禁用标志
      cpTypeOptions: [
        {
          value: "json",
          label: "JSON",
        },
        {
          value: "word",
          label: "WORD",
        },
      ],
      cpType: "json", // 输出文件类型
      cpChartVisible: false, // 饼图显示开关
      cpChecked: false, // 查重标志
      scCounter: 0,
      mcCounter: 0,
      tfCounter: 0,
      gfCounter: 0,
      sjCounter: 0,
      cpCheckRes: [], // 查重结果
      activeQuestionType: [],
    };
  },
  props: [
    "composeCounter",
    "composeList",
    "compList_sc",
    "compList_mc",
    "compList_tf",
    "compList_gf",
    "compList_sj",
  ],
  methods: {
    // init & reinit
    cpInit: function () {
      // 检查组卷列表是否非零, 非零则修改按钮可用性
      if (this.composeCounter > 0) {
        this.cpBtnDisabled = false;
      }
    },

    // 饼图开关
    showPieSwitch: function () {
      this.cpChartVisible = !this.cpChartVisible;
      if (this.cpChartVisible == true) {
        console.log("to show");
        this.$emit("chartAffix", true);
      } else {
        console.log("to close");
        this.$emit("chartAffix", false);
      }
    },

    // 组卷查重
    cpCheckedCpCheck: function () {
      this.cpChecked == true;
      this.composeList.forEach((qu) => {
        this.cpCheckRes.push({ _id: qu._id, dup: Math.random() * 100 + "%" });
      });
    },
  },
  mounted() {
    this.cpInit();
  },
  computed: {},
  watch: {
    composeCounter: function () {
      this.cpInit();
    },
  },
};
</script>

<style scoped>
.cp_body {
  height: calc(100% - 52px);
  width: 100%;
}

.cp_header {
  margin-bottom: 10px;
  width: 100%;
}

.cpTypeChoose {
  width: 100px;
}

.cp_main {
  height: 80%;
  width: 100%;
}

.cpCollapseTitle {
  font-weight: bold;
}
</style>