<template>
  <el-container>
    <el-main>
      <el-form
        ref="newQuForm"
        :model="newQu"
        :rules="newQuRules"
        v-loading="newQuLoading"
        label-position="left"
        label-width="80px"
        class="uqForm"
      >
        <el-form-item label="科目" prop="subject">
          <el-autocomplete
            v-model="newQu.subject"
            :fetch-suggestions="uqAsyncSubjectQuery"
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
        <el-form-item label="题目资源">
          <el-upload
            class="uq_uploadpic"
            ref="uqUploadpic"
            accept=".bmp, .jpg, .jpeg, .png, .gif"
            :action="uqloadQusrcPort"
            :file-list="uqQusrcs"
            :multiple="false"
            :data="uqUploadExtraData"
            :on-preview="uqPictureCardPreview"
            :on-exceed="uqUploadExceed"
            :before-upload="uqBeforeUpload"
            :on-success="uqUploadSuccess"
            :on-error="uqUploadError"
            :on-remove="uqUploadRemove"
            :auto-upload="false"
            :limit="1"
            list-type="picture"
          >
            <template #trigger>
              <el-tooltip placement="top-end">
                <template #content>
                  <div class="as_upload_tip">
                    仅接受<strong style="color: #e6a23c">图片类型</strong>文件,
                    且大小不超过 5MB<br />每题最多上传 1 张
                  </div>
                </template>
                <el-button size="mini" type="primary" round
                  >选择图片</el-button
                ></el-tooltip
              ></template
            >
            <el-button
              size="mini"
              type="success"
              round
              style="margin-left: 10px"
              @click="addQusrcPic"
              >上传图片</el-button
            >
          </el-upload>
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
            style="width: 90px"
            placeholder="学年"
          >
          </el-date-picker>
          <el-select
            v-model="luSemester"
            @blur="setLastUseTime('semester')"
            size="small"
            filterable
            placeholder="学期"
            class="uqDatePicker"
            ref="uqDateSemester"
          >
            <el-option
              v-for="semester in semesters"
              :key="semester.value"
              :label="semester.label"
              :value="semester.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="luPeriod"
            size="small"
            filterable
            placeholder="场景"
            class="uqDatePicker"
            ref="uqDatePeriod"
          >
            <el-option
              v-for="period in periods"
              :key="period.value"
              :label="period.label"
              :value="period.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="luVolume"
            size="small"
            filterable
            placeholder="A/B卷"
            style="width: 90px"
            ref="uqDateVolume"
          >
            <el-option
              v-for="volume in volumes"
              :key="volume.value"
              :label="volume.label"
              :value="volume.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-main>
    <el-header>
      <el-row :gutter="10" type="flex" justify="end" align="middle">
        <el-col :span="9">
          <el-tooltip :content="dupliCheckRes" placement="top-end">
            <el-button type="info" class="uqDupChkTag">
              {{ dupliCheckRes }}
            </el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="5">
          <el-button
            type="primary"
            @click="preDupliCheck"
            icon="el-icon-loading"
            >预查重</el-button
          >
        </el-col>
        <el-col :span="6"
          ><el-button
            type="primary"
            @click="submitNewQu"
            icon="el-icon-upload2"
            :disabled="!dupliCheck"
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

    <el-dialog title="上传资源预览" v-model="uqUploadPreviewVisible" width="440px">
      <el-image :src="uqUploadPreviewUrl" alt="" fit="scale-down" style="width: 400px; height: 400px"></el-image>
    </el-dialog>
  </el-container>
</template>

<script>
import _ from "lodash";

const serverHost = "http://localhost:3000";

export default {
  name: "UploadQuestion",
  inject: ["reload"], //注入刷新依赖
  data() {
    return {
      newQuLoading: false, // newQu表单加载标志
      optionInputVisible: false, // 选项输入显示标志
      optionInputValue: "", // 选项输入临时值
      answerInputVisible: false, // 答案输入显示标志
      answerInputValue: "", // 答案输入临时值
      showOptions: 0, // 题型标志 - 0: 填空/判断/主观, 1: 单选,  2: 多选
      subjectsList: [], // 科目输入建议list
      keywordsList: [], // 科目关键词输入建议list
      luYear: "", // 学年输入临时值
      luSemester: "", // 学期输入临时值
      semesters: [
        // 学期选项
        {
          value: "fs",
          label: "第一学期",
        },
        {
          value: "ss",
          label: "第二学期",
        },
      ],
      luPeriod: "", // 学期时段输入临时值
      periods: [
        // 学期时段选项
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
      luVolume: "", // A/B卷临时输入值
      volumes: [
        // A/B卷选项
        {
          value: "a",
          label: "A卷",
        },
        {
          value: "b",
          label: "B卷",
        },
      ],
      uqloadQusrcPort: serverHost + "/user/qubank/ulqusrcpic", // 上传题目资源后端接口
      uqUploadExtraData: {}, // 上传附加数据(token)
      uqQusrcs: [],
      uqUploadPreviewUrl: "",
      uqUploadPreviewVisible: false, // 题目资源预览标志
      newQu: {
        // 新题
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
        // 新题表单验证规则(部分)
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
      dupliCheck: false, // 预查重标志
      dupliCheckRes: "上传前请先预查重", // 预查重结果
    };
  },
  props: ["uqDrawer"],
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

    // upload部分 - 图片预览
    uqPictureCardPreview: function (file) {
      this.uqUploadPreviewUrl = file.url;
      this.uqUploadPreviewVisible = true;
    },
    // upload部分 - 超出数量限制操作
    uqUploadExceed: function () {
      this.$message({
        type: "info",
        message: "每题最多对应3张图片资源",
      });
    },
    // upload部分 - 格式及大小检查
    uqBeforeUpload: function (file) {
      let typeList = new Set(["bmp", "jpg", "jpeg", "png", "gif"]); // 图片类型限制
      let sizeLimit = 1024 * 1024 * 5; // 大小限制 5MB
      let targetType = file.type.split("/")[1];
      if (!typeList.has(targetType)) {
        this.$message({
          type: "error",
          message: "仅限上传图片类型(bmp/jpg/jpge/png/gif)",
        });
        return false;
      } else if (file.size > sizeLimit) {
        this.$message({
          type: "error",
          message: "图片大小最大为5MB",
        });
        return false;
      } else {
        return true;
      }
    },
    // upload部分 - 上传按钮
    addQusrcPic: function () {
      this.uqUploadExtraData = {
        token: localStorage.getItem("token"),
      };
      this.$nextTick(() => {
        this.$refs["uqUploadpic"].submit();
      });
    },
    // upload部分 - 上传成功hook
    uqUploadSuccess: function (response, file) {
      console.log(response);
      if (response.ifSuccess == true) {
        this.$message({
          type: "success",
          message: "图片 " + file.name + "上传成功",
        });
        this.newQu.payload.src = response.base64pic;
      }
    },
    // upload部分 - 上传失败 hook
    uqUploadError: function (err, file) {
      this.$message({
        type: "error",
        message: "图片 " + file.name + "上传失败\nerr: " + err,
      });
    },
    // upload部分 - 移除已上传文件
    uqUploadRemove: function () {
      this.uqUploadExtraData = {};
      this.newQu.payload.src = "";
    },

    // 最近使用时间picker
    setLastUseTime: function (param) {
      if (param == "year") {
        setTimeout(() => {
          this.$refs.uqDateSemester.focus();
        }, 500);
      } else if (param == "semester") {
        setTimeout(() => {
          this.$refs.uqDatePeriod.focus();
        }, 500);
      } else if (param == "period") {
        setTimeout(() => {
          this.$refs.uqDateVolume.focus();
        }, 500);
      } else {
        this.newQu.lastUseTime =
          this.luYear +
          "-" +
          this.luSemester +
          "-" +
          this.luPeriod +
          "-" +
          this.luVolume;
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

    // 重置表单按钮
    resetForm: function () {
      this.$confirm("表单内容不会保存/上传, 请确认是否重置?", "重置确认", {
        confirmButtonText: "确认",
        cancelButtonText: "放弃",
        type: "warning",
      })
        .then(() => {
          this.resetFormSupply();
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
    // 提交表单按钮
    submitNewQu: function () {
      // console.log(this.newQu);
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
    // 重置表单补充
    resetFormSupply: function () {
      this.$nextTick(() => {
        this.$refs["newQuForm"].resetFields();
        this.newQu.payload.src = "";
        this.newQu.payload.options = [];
        this.newQu.payload.answer = [];
        this.newQu.lastUseTime = "";
        this.uqUploadExtraData = {};
      });
    },

    // 输入科目建议
    uqAsyncSubjectQuery: _.debounce(function (queryString, cb) {
      let results = [];
      if (queryString) {
        results = this.subjectsList.filter((v) => {
          return v.value.toString().indexOf(queryString.toString()) > -1;
        });
      } else {
        results = this.subjectsList;
      }
      // console.log(results);
      cb(results);
    }, 1000),

    // 预查重
    preDupliCheck: function () {
      this.newQuLoading = true;

      setTimeout(() => {
        this.dupliCheck = true;
        this.dupliCheckRes = "查重率: Null";
        this.newQuLoading = false;
      }, 2000);
    },

    /************ axios ***************/

    // axios - 拉取推荐科目
    getSubjectsList: function () {
      this.axios({
        method: "POST",
        url: "/user/qubank/suggestedsubjects",
        data: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          // 处理拉取结果
          // 返回:  [ {'subject': '...'}, {'subject': '...'},..., {'subject': '...'}]
          // 将所有 'subject' 替换为 'value', el-autocomplete只识别 'value' 字段
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          // console.log(res);
          res.forEach((row) => {
            this.subjectsList.push(
              JSON.parse(JSON.stringify(row).replace("subject", "value"))
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 根据科目拉取关键词列表
    postKeywordsQuery: _.debounce(function () {
      this.axios({
        method: "POST",
        url: "/user/qubank/suggestedkeywords",
        data: {
          token: localStorage.getItem("token"),
          subject: this.newQu.subject,
        },
      })
        .then((response) => {
          // 处理拉取结果
          // 返回:  { "keywords": ["", ""...""] }
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res.keywords);
          this.keywordsList = res.keywords;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2500),

    // axios - 预查重
    postDupCheck: function () {
      this.axios({
        method: "POST",
        url: "/user/qubank/uploadduplicheck",
        data: {
          token: localStorage.getItem("token"),
          newqu: this.newQu,
        },
      })
        .then((response) => {
          // 处理上传结果
          // 返回:  {"duprate": "xx%",
          //        "err": "undefined / err message"}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          // console.log(res);
          this.dupliCheckRes = "重复率: " + res.duprate;
          this.dupliCheck = true;
          this.newQuLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 上传题目
    postNewQuestion: function () {
      this.newQu.additionTime = new Date(this.newQu.additionTime);
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
            this.resetFormSupply();
            alert("上传题目成功");
            this.reload();
          } else {
            alert(res.err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getNowTimeStmp();
    this.getSubjectsList();
  },
  watch: {
    "newQu.subject": function () {
      if (this.newQu.subject != "") {
        this.postKeywordsQuery();
      }
    },
    "newQu.type": function () {
      if (this.newQu.type == "mc") {
        this.showOptions = 2;
      } else if (this.newQu.type == "sc") {
        this.showOptions = 1;
      } else {
        this.showOptions = 0;
      }
    },
  },
};
</script>

<style scoped>
.uqForm {
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

/* 修改上传资源dragger样式 */
:deep() .el-upload-dragger {
  height: 100%;
  width: 100%;
  line-height: 20px;
}
:deep() .el-upload--picture-card {
  height: 100px;
  width: 100px;
}
:deep() .el-upload-list--picture-card .el-upload-list__item {
  height: 100px;
  width: 100px;
}

:deep() .el-date-editor.el-input {
  width: 100px;
}

:deep() .el-upload-dragger .el-icon-upload {
  font-size: 40px;
  margin: 0;
}

.uqDatePicker {
  width: 100px;
}

.uqDupChkTag {
  width: 100%;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>