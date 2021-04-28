<template>
  <el-container>
    <el-main>
      <el-form
        ref="newQuForm"
        :model="newQu"
        :rules="newQuRules"
        :v-loading="newQuLoading"
        label-position="left"
        label-width="80px"
        class="ulForm"
      >
        <el-form-item label="科目" prop="subject">
          <el-autocomplete
            v-model="newQu.subject"
            :fetch-suggestions="ulAsyncSubjectQuery"
            placeholder="请输入科目"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="newQu.type" placeholder="请选择题型">
            <el-option label="单选题" value="sc"></el-option>
            <el-option label="多选题" value="mc"></el-option>
            <el-option label="判断题" value="tf"></el-option>
            <el-option label="填空题" value="gf"></el-option>
            <el-option label="主观题" value="sj"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-select
            v-model="newQu.keywords"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择或输入关键词"
            clearable
          >
            <el-option v-for="item in keywordsList" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="题目内容"
          prop="question"
          v-model="newQu.payload.question"
        >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入题目内容"
            v-model="newQu.question"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="选项"
          prop="options"
          v-show="showOptions > 0 ? true : false"
        >
          <el-tag
            :key="option"
            v-for="option in newQu.payload.options"
            closable
            disable-transitions
            @close="rmTag('option', option)"
          >
            {{ option }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="optionInputVisible"
            v-model="optionInputValue"
            ref="saveOptionInput"
            size="small"
            @keyup.enter="addTag('option')"
            @blur="addTag('option')"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            type="primary"
            plain
            @click="showInput('option')"
            >添加选项</el-button
          >
        </el-form-item>
        <el-form-item label="答案" prop="answer" v-model="newQu.answer">
          <el-tag
            :key="answer"
            v-for="answer in newQu.payload.answer"
            type="success"
            closable
            disable-transitions
            @close="rmTag('answer', answer)"
          >
            {{ answer }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="answerInputVisible"
            v-model="answerInputValue"
            ref="saveAnswerInput"
            size="small"
            @keyup.enter="addTag('answer')"
            @blur="addTag('answer')"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            type="success"
            plain
            @click="showInput('answer')"
            >添加答案</el-button
          >
        </el-form-item>
        <el-form-item label="入库时间">
          <el-tag type="info">{{ newQu.additionTime }}</el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-button
            title="更新时间"
            type="info"
            size="small"
            icon="el-icon-refresh"
            @click="getNowTimeStmp"
          ></el-button>
        </el-form-item>
        <el-form-item label="最近使用">
          <el-date-picker
            v-model="luYear"
            @blur="setLastUseTime('year')"
            type="year"
            size="small"
            clearable
            placeholder="学年"
          >
          </el-date-picker>
          <span> - </span>
          <el-select
            v-model="luSemester"
            @blur="setLastUseTime('semester')"
            size="small"
            filterable
            placeholder="学期"
            class="ulDatePicker"
            ref="ulDateSemester"
          >
            <el-option
              v-for="semester in semesters"
              :key="semester.value"
              :label="semester.label"
              :value="semester.value"
            >
            </el-option>
          </el-select>
          <span> - </span>
          <el-select
            v-model="luPeriod"
            size="small"
            filterable
            placeholder="场景"
            class="ulDatePicker"
            ref="ulDatePeriod"
          >
            <el-option
              v-for="period in periods"
              :key="period.value"
              :label="period.label"
              :value="period.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-main>
    <el-header>
      <el-row>
        <el-col :span="6" :offset="14">
          <el-button type="primary" @click="submitNewQu" icon="el-icon-upload2"
            >立即创建</el-button
          >
        </el-col>
        <el-col :span="4">
          <el-button @click="resetForm" icon="el-icon-refresh-right"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
export default {
  name: "UploadQuestion",
  data() {
    return {
      inputKeyword: "",
      newQuLoading: false,
      optionInputVisible: false,
      optionInputValue: "",
      answerInputVisible: false,
      answerInputValue: "",
      showOptions: 0,
      luYear: "",
      luSemester: "",
      semesters: [
        {
          value: "fs",
          label: "第一学期",
        },
        {
          value: "ss",
          label: "第二学期",
        },
      ],
      luPeriod: "",
      periods: [
        {
          value: "ct",
          label: "课堂测试",
        },
        {
          value: "hw",
          label: "课后作业",
        },
        {
          value: "me",
          label: "期中考试",
        },
        {
          value: "fe",
          label: "期末考试",
        },
      ],
      // form data
      newQu: {
        subject: "",
        type: "",
        keywords: [],
        question: "",
        payload: {
          src: "",
          options: [],
          answer: [],
        },
        additionTime: "",
        lastUseTime: "",
      },
      newQuRules: {
        subject: [
          { required: true, message: "请输入科目", trigger: "blur" },
          { min: 1, message: "科目不能为空", trigger: "blur" },
        ],
        type: [
          {
            required: true,
            message: "请选择题型",
            trigger: "blur",
          },
        ],
        keywords: [
          {
            type: "array",
            required: true,
            message: "请选择或输入至少一个关键词",
            trigger: "blur",
          },
        ],
        question: [
          { required: true, message: "请输入题目内容", trigger: "blur" },
          { min: 1, message: "题目内容不能为空", trigger: "blur" },
        ],
      },
    };
  },
  props: ["keywordsList", "ulDrawer"],
  methods: {
    // 时间戳工具函数
    getNowTimeStmp: function () {
      let nowDate = new Date();
      // yyyy-mm-dd hh:mm:ss
      let timeStamp =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate() +
        " " +
        nowDate.getHours() +
        ":" +
        nowDate.getMinutes() +
        ":" +
        nowDate.getSeconds();
      this.newQu.additionTime = timeStamp;
    },

    // 移除选项
    rmTag: function (optionOrAnswer, tag) {
      if (optionOrAnswer == "option") {
        let options = this.newQu.payload.options;
        options.splice(options.indexOf(tag), 1);
        this.newQu.payload.options = options;
      } else {
        let answer = this.newQu.payload.options;
        answer.splice(answer.indexOf(tag), 1);
        this.newQu.payload.answer = answer;
      }
    },
    // 显示选项输入框
    showInput: function (optionOrAnswer) {
      if (optionOrAnswer == "option") {
        this.optionInputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveOptionInput.$refs.input.focus();
        });
      } else {
        this.answerInputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveAnswerInput.$refs.input.focus();
        });
      }
    },
    // 增加选项
    addTag: function (optionOrAnswer) {
      if (optionOrAnswer == "option") {
        let optionInputValue = this.optionInputValue;
        if (optionInputValue) {
          this.newQu.payload.options.push(optionInputValue);
        }
        this.optionInputVisible = false;
        this.optionInputValue = "";
      } else {
        let answerInputValue = this.answerInputValue;
        if (answerInputValue) {
          this.newQu.payload.answer.push(answerInputValue);
        }
        this.answerInputVisible = false;
        this.answerInputValue = "";
      }
    },

    // 最近使用时间picker
    setLastUseTime: function (param) {
      if (param == "year") {
        setTimeout(() => {
          this.$refs.ulDateSemester.focus();
        }, 500);
      } else if (param == "semester") {
        setTimeout(() => {
          this.$refs.ulDatePeriod.focus();
        }, 500);
      } else {
        this.newQu.lastUseTime =
          this.luYear + "-" + this.luSemester + "-" + this.luPeriod;
      }
    },

    // 表单验证补充 - 选择题选项 + 答案
    validateOA: function () {
      if (this.showOptions > 1) {
        // 多选 - 要求答案数量>选项数量>1
        if (
          this.newQu.payload.options.length > 2 &&
          this.newQu.payload.answer.length > 1
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.showOptions > 0) {
        // 单选 - 要求答案数量>选项数量>0
        if (
          this.newQu.payload.options.length > 1 &&
          this.newQu.payload.answer.length > 0
        ) {
          return true;
        } else {
          return false;
        }
      }
      // 非选择题不用验证
      else {
        return true;
      }
    },
    // 提交表单
    submitNewQu: function () {
      console.log(this.newQu);
      let validateAnO;
      if (this.validateOA()) {
        validateAnO = true;
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message:
            "<strong>\
              <p>单选题要求: <i>答案数量 > 选项数量 > 0</i></p>\
              <p>多选题要求: <i>答案数量 > 选项数量 > 1</i></p>\
            </strong>",
          type: "error",
        });
        validateAnO = false;
      }
      this.$refs["newQuForm"].validate((valid) => {
        if (valid && validateAnO) {
          this.newQuLoading = true;
          this.postNewQuestion();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm: function () {
      this.$confirm("表单内容不会 保存/上传, 请确认是否重置?", "重置确认", {
        confirmButtonText: "确认",
        cancelButtonText: "放弃",
        type: "warning",
      })
        .then(() => {
          this.$refs["newQuForm"].resetFields();
          this.$message({
            type: "success",
            message: "上传题目表单已重置!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "重置操作已取消",
          });
        });
    },

    // axios - 上传题目
    postNewQuestion: function () {
      this.axios({
        method: "POST",
        url: "/user/qubank/uploadquestion",
        data: {
          token: localStorage.getItem("token"),
          newqu: this.newQu,
        },
      })
        .then((response) => {
          // 处理上传结果
          // 返回:  {"ifSuccess": "true / false",
          //        "err": "undefined / err message"}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          // console.log(res);
          if (res.ifSuccess == true) {
            this.newQuLoading = false;
            // 上传成功重置表单
            this.$refs["newQuForm"].resetFields();
            alert("上传题目成功");
          } else {
            alert(res.err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // axios - 拉取推荐科目
    // ulAsyncSubjectQuery: function () {
    //   this.axios({
    //     method: "POST",
    //     url: "/user/qubank/suggestedsubjects",
    //     data: {
    //       token: localStorage.getItem("token"),
    //     },
    //   })
    //     .then((response) => {
    //       // 处理上传结果
    //       // 返回:  {"subjects": ["", ""...""],
    //       //        "counter": n}
    //       let res = JSON.stringify(response.data);
    //       res = JSON.parse(res);
    //       // console.log(res);
    //       if (res.ifSuccess == true) {
    //         this.newQuLoading = false;
    //         // 上传成功重置表单
    //         this.$refs["newQuForm"].resetFields();
    //         alert("上传题目成功");
    //       } else {
    //         alert(res.err);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  mounted() {
    this.getNowTimeStmp();
  },
  watch: {
    "newQu.type": function () {
      if (this.newQu.type == "sc" || this.newQu.type == "mc") {
        this.showOptions = true;
      } else {
        this.showOptions = false;
      }
    },
  },
};
</script>

<style scoped>
.ulForm {
  width: calc(100% - 70px);
  height: 100%;
  margin: 0 20px;
  padding: 15px;
  border: 1px solid #394045;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 5px rgba(0, 0, 0, 0.24);
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.ulDatePicker {
  width: 100px;
}
</style>