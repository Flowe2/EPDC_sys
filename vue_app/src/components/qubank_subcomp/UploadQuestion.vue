<template>
  <el-container>
    <el-main>
      <el-form
        ref="newQuForm"
        :model="newQu"
        :rules="newQuRules"
        label-position="left"
        label-width="80px"
        class="ulForm"
      >
        <el-form-item label="科目" prop="subject">
          <el-autocomplete
            v-model="newQu.subject"
            :fetch-suggestions="querySubjectsAsync"
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
      optionInputVisible: false,
      optionInputValue: "",
      answerInputVisible: false,
      answerInputValue: "",
      showOptions: 0,
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
    };
  },
  props: ["keywordsList", "ulDrawer"],
  methods: {
    // 提交表单
    submitNewQu: function () {
      console.log(this.newQu);
      this.$refs["newQuForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
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
  },
  watch: {
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
</style>