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
          ><el-button
            type="primary"
            :disabled="cpBtnDisabled"
            @click="delSomeFromCP"
            >移除</el-button
          ></el-col
        >
        <el-col :span="2.5"
          ><el-button
            type="primary"
            :disabled="cpBtnDisabled"
            @click="delAllFromCP"
            >清空</el-button
          ></el-col
        >
        <el-col :span="2.5" :offset="1"
          ><el-button
            type="primary"
            :disabled="cpBtnDisabled"
            @click="cpToCheckPaper"
            >查重</el-button
          ></el-col
        ><el-col :span="2.5"
          ><el-button
            type="primary"
            :disabled="cpBtnDisabled"
            @click="cpToGivePoint"
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
          <el-collapse-item
            :name="element.name"
            :disabled="!element.data.length"
          >
            <template #title>
              <i :class="element.icon"></i>&nbsp;
              <el-button type="info" size="mini" round plain disabled>{{
                element.data.length
              }}</el-button
              >&nbsp;
              <span class="cpCollapseTitle">{{ element.title }}</span>
            </template>
            <el-table
              :data="element.data"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center"
              >
              </el-table-column>
              <el-table-column label="题面" show-overflow-tooltip>
                <template #default="scope">
                  <el-popover
                    trigger="click"
                    placement="right-start"
                    width="340px"
                  >
                    <template #default>
                      <el-descriptions
                        title="题目详情"
                        :column="1"
                        size="small"
                        border
                      >
                        <el-descriptions-item>
                          <template #label> 题目内容 </template>
                          <span class="cp_qu_description_text">{{
                            scope.row.question
                          }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template #label> 所属科目 </template>
                          <span class="cp_qu_description_text">{{
                            scope.row.subject
                          }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template #label> 入库时间 </template>
                          <span class="cp_qu_description_text">{{
                            scope.row.additionTime
                          }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template #label> 上次使用 </template>
                          <span class="cp_qu_description_text">{{
                            scope.row.lastUseTime
                              ? scope.row.lastUseTime
                              : "未使用"
                          }}</span>
                        </el-descriptions-item>
                      </el-descriptions>
                    </template>
                    <template #reference>
                      <div>
                        {{ scope.row.question }}
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="perpoint"
                :label="'总分值' + element.point"
                width="150"
                >{{ element.point / element.data.length }}</el-table-column
              >
            </el-table>
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
          point: 0,
        },
        {
          name: "mc",
          title: "多选题 MULTIPLE CHOICE",
          icon: "iconfont icon-duoxuankuang",
          data: [],
          point: 0,
        },
        {
          name: "tf",
          title: "判断题 TRUE OF FALSE",
          icon: "iconfont icon-panduan",
          data: [],
          point: 0,
        },
        {
          name: "gf",
          title: "填空题 GAP FILLING",
          icon: "iconfont icon-tiankongti",
          data: [],
          point: 0,
        },
        {
          name: "sj",
          title: "主观题 SUBJECTIVE",
          icon: "iconfont icon-zhuguanti",
          data: [],
          point: 0,
        },
      ],
      activeQuestionType: [],
      collapseComponentData: {
        modelValue: this.activeQuestionType,
      },
    };
  },
  props: [
    "cpDrawer",
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
        // console.log("to show");
        this.$emit("chartAffix", true);
      } else {
        // console.log("to close");
        this.$emit("chartAffix", false);
      }
    },

    // 暂存至tempList
    handleSelectionChange: function (val) {
      // 传入的为对象, JSON.toStringfy后在JSON.parse解析
      this.$emit("toTempList", "del", JSON.parse(JSON.stringify(val)));
    },
    // 移除所选
    delSomeFromCP: function () {
      this.$emit("delSomeFromCP", "add");
    },
    // 移除所有
    delAllFromCP: function () {
      this.$emit("delAllFromCP", "addAll");
    },

    // 组卷查重
    cpToCheckPaper: function () {
      this.cpChecked == true;
      this.composeList.forEach((qu) => {
        this.cpCheckRes.push({ _id: qu._id, dup: Math.random() * 100 + "%" });
      });
    },

    // 赋分值
    cpSetPoints: function () {},

    // table题型分类
    classifyTableData: function (type) {
      switch (type) {
        case "sc":
          return this.compList_sc ? this.compList_sc : [];
        case "mc":
          return this.compList_mc ? this.compList_mc : [];
        case "tf":
          return this.compList_tf ? this.compList_tf : [];
        case "gf":
          return this.compList_gf ? this.compList_gf : [];
        case "sj":
          return this.compList_sj ? this.compList_sj : [];
      }
    },
  },
  mounted() {
    this.cpInit();
    this.displayList.forEach((element) => {
      element.data = this.classifyTableData(element.name);
    });
  },
  computed: {},
  watch: {
    composeCounter: function () {
      this.cpInit();
      this.displayList.forEach((element) => {
        element.data = this.classifyTableData(element.name);
      });
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

.cp_qu_description_text {
  font-weight: bold;
}
</style>