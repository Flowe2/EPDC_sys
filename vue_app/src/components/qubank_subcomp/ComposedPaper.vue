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
            @click="setExpectPointVisible = true"
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
          >&nbsp;<el-button
            type="success"
            :disabled="cpBtnDisabled"
            @click="downloadComposedPaper"
            >生成试卷</el-button
          ><a href="" id="downloadComposedPaper" v-show="false"></a>
        </el-col>
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
              <el-table-column type="selection" align="center" width="50">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
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
                :label="'总分: ' + element.point * element.data.length"
                width="150"
                align="center"
                >{{ element.point }}</el-table-column
              >
            </el-table>
          </el-collapse-item>
        </template>
      </draggable>
    </el-main>
    <el-dialog title="设置题目分值" v-model="setExpectPointVisible" :width="400"
      ><el-space direction="vertical" size="large">
        <el-descriptions :column="1" size="medium" border>
          <el-descriptions-item label="总分">
            {{ sumPoint }}
          </el-descriptions-item>
          <el-descriptions-item
            v-for="(type, index) in setExpectPointForm"
            :key="index"
          >
            <template #label>
              {{ type.name }}
            </template>
            <div v-if="type.num">
              <el-space size="medium">
                <el-input-number
                  size="mini"
                  :min="0"
                  :step="0.5"
                  v-model="type.perpoint"
                ></el-input-number>
                <span>*</span>
                <el-tag type="info" effect="plain"> {{ type.num }} </el-tag>
                <span>=</span
                ><el-tag type="info" effect="plain">
                  {{ type.perpoint * type.num }}
                </el-tag>
              </el-space>
            </div>
            <div v-else>{{ "没有对应题型, 该部分0分" }}</div>
          </el-descriptions-item>
        </el-descriptions>
        <el-button
          size="small"
          type="primary"
          @click="cpSetPoints"
          >确 定</el-button
        ></el-space
      >
    </el-dialog>
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
      ], // 可拖动展示列表
      setExpectPointVisible: false,
      setExpectPointForm: [
        { name: "单选题", type: "sc", num: 0, perpoint: 0 },
        { name: "多选题", type: "mc", num: 0, perpoint: 0 },
        { name: "判断题", type: "tf", num: 0, perpoint: 0 },
        { name: "填空题", type: "gf", num: 0, perpoint: 0 },
        { name: "主观题", type: "sj", num: 0, perpoint: 0 },
      ], // 设置分值
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
    cpSetPoints: function () {
      // 关闭赋分dialog
      this.setExpectPointVisible = false;
      this.displayList.forEach((element) => {
        if (element.name == "sc") {
          element.point = this.setExpectPointForm[0].perpoint;
        } else if (element.name == "mc") {
          element.point = this.setExpectPointForm[1].perpoint;
        } else if (element.name == "tf") {
          element.point = this.setExpectPointForm[2].perpoint;
        } else if (element.name == "gf") {
          element.point = this.setExpectPointForm[3].perpoint;
        } else {
          element.point = this.setExpectPointForm[4].perpoint;
        }
      });
    },

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
    //题型转文字
    typeToString: function (type) {
      switch (type) {
        case "sc":
          return "单选";
        case "mc":
          return "多选";
        case "tf":
          return "判断";
        case "gf":
          return "填空";
        case "sj":
          return "主观";
      }
    },

    // 生成试卷文件
    downloadComposedPaper: function () {
      let a = document.getElementById("downloadComposedPaper");
      let fileData;
      if (this.cpType == "json") {
        // 处理数据
        let including_type = [];
        let questions = [];
        this.displayList.forEach((element) => {
          if (element.data.length) {
            including_type.push({
              type: element.name,
              perpoint: element.point,
              sum: element.data.length,
            });
            questions.push(element.data);
          }
        });
        console.log(including_type);
        for (let i = 0; i < questions.length; i++) {
          questions[i].forEach((qu) => {
            delete qu._id;
            delete qu.type;
            delete qu.keywords;
            delete qu.additionTime;
            delete qu.lastUseTime;
          });
        }
        let questionString = "";
        for (let i = 0; i < questions.length; i++) {
          questionString += (
            '"' + including_type[i].type + '": ' + JSON.stringify(questions[i]) + ((i < questions.length-1)?', ':''));
        }
        console.log(questionString);
        fileData =
          '{ "total_score": ' +
          this.sumPoint +
          ',  "question_sum": ' +
          this.composeCounter +
          ',  "including_type": ' +
          JSON.stringify(including_type) +
          ",  " +
          questionString +
          " }";
        // 生成文件
        let apiFile = new Blob([fileData], { type: "application/json" });
        // 提供下载
        a.href = URL.createObjectURL(apiFile);
        a.download = Date.now() + ".eqm_paper";
        a.dispatchEvent(
          new MouseEvent("click", { bubbles: false, cancelable: true })
        );
      } else if (this.cpType == "word") {
        this.$message({
          message: "该功能构建中, 请期待",
          type: "error",
        });
      }
    },
  },
  computed: {
    sumPoint: function () {
      let sum = 0;
      this.setExpectPointForm.forEach((type) => {
        sum += type.perpoint * type.num;
      });
      return sum;
    },
  },
  watch: {
    composeCounter: function () {
      this.cpInit();
      this.displayList.forEach((element) => {
        element.data = this.classifyTableData(element.name);
      });
      this.setExpectPointForm.forEach((element) => {
        element.num = this.classifyTableData(element.type).length;
      });
    },
  },
  mounted() {
    this.cpInit();
    this.displayList.forEach((element) => {
      element.data = this.classifyTableData(element.name);
    });
    this.setExpectPointForm.forEach((element) => {
      element.num = this.classifyTableData(element.type).length;
    });
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