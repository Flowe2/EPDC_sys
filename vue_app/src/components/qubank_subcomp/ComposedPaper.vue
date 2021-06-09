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
            >赋分值</el-button
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
      <draggable
        tag="el-collapse"
        :list="displayList"
        :component-data="collapseComponentData"
        item-key="id"
      >
        <template #item="{ element }">
          <el-collapse-item :name="element.name">
            <template #title>
              <i :class="element.icon"></i>&nbsp;
              <el-button type="info" size="mini" round plain disabled>{{
                element.data.length
              }}</el-button
              >&nbsp;
              <span class="cpCollapseTitle">{{ element.title }}</span>
            </template>
            <div>table</div>
          </el-collapse-item>
        </template>
      </draggable>
    </el-main>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ComposedPaper",
  inject: ["reload"], //注入刷新依赖
  components: {
    draggable,
  },
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
      cpCheckRes: [], // 查重结果
      displayList: [
        {
          name: "sc",
          title: "单选题 SINGLE CHOICE",
          icon: "iconfont icon-danxuankuang",
          data: [],
        },
        {
          name: "mc",
          title: "多选题 MULTIPLE CHOICE",
          icon: "iconfont icon-duoxuankuang",
          data: [],
        },
        {
          name: "tf",
          title: "判断题 TRUE OF FALSE",
          icon: "iconfont icon-panduan",
          data: [],
        },
        {
          name: "gf",
          title: "填空题 GAP FILLING",
          icon: "iconfont icon-tiankongti",
          data: [],
        },
        {
          name: "sj",
          title: "主观题 SUBJECTIVE",
          icon: "iconfont icon-zhuguanti",
          data: [],
        },
      ],
      activeQuestionType: [],
      collapseComponentData: {
        modelValue: this.activeQuestionType,
      },
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

    // 赋分值
    cpSetPoints: function () {

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