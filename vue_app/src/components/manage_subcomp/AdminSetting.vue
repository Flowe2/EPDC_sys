<template>
  <div id="as_mainbody" class="as_mainbody">
    <h2 id="as_h2" class="as_h2">
      <i class="el-icon-s-tools"></i>
      系统设置
    </h2>
    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>

    <el-container class="as_container">
      <el-main class="as_main" v-loading="fullscreenLoading">
        <el-space wrap alignment="flex-start">
          <el-card :class="modifyCardVisible[0] ? 'as_card' : 'as_card_fold'">
            <template #header>
              <div class="as_card_header">
                <i class="el-icon-edit"></i>
                <span>修改密码</span>
                <el-button
                  @click="modifyCardVisible[0] = !modifyCardVisible[0]"
                  :icon="
                    modifyCardVisible[0]
                      ? 'el-icon-caret-top'
                      : 'el-icon-caret-bottom'
                  "
                  size="mini"
                  round
                ></el-button>
              </div>
            </template>
            <el-collapse-transition>
              <div class="as_card_modify_pwd" v-show="modifyCardVisible[0]">
                <el-form
                  label-width="80px"
                  :model="modifyApwd"
                  :rules="modifyApwdRules"
                  ref="modifyApwdForm"
                >
                  <el-form-item label="旧 密 码" prop="oldPwd">
                    <el-input
                      v-model="modifyApwd.oldPwd"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="新 密 码" prop="newPwd">
                    <el-input
                      v-model="modifyApwd.newPwd"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="重复密码" prop="newPwdCheck">
                    <el-input
                      v-model="modifyApwd.newPwdCheck"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitNewPwdBtn"
                      >提交</el-button
                    >
                    <el-button @click="resetNewPwdBtn">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-collapse-transition>
          </el-card>
          <el-card :class="modifyCardVisible[1] ? 'as_card' : 'as_card_fold'">
            <template #header>
              <div class="as_card_header">
                <i class="el-icon-picture-outline"></i>
                <span>背景管理</span>
                <el-button
                  @click="modifyCardVisible[1] = !modifyCardVisible[1]"
                  :icon="
                    modifyCardVisible[1]
                      ? 'el-icon-caret-top'
                      : 'el-icon-caret-bottom'
                  "
                  size="mini"
                  round
                ></el-button>
              </div>
            </template>
            <el-collapse-transition>
              <div v-show="modifyCardVisible[1]">主页图片管理card</div>
            </el-collapse-transition>
          </el-card>
        </el-space></el-main
      >
      <el-divider content-position="right"
        ><i class="el-icon-more-outline"></i
      ></el-divider>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AdminSetting",
  data() {
    return {
      fullscreenLoading: false,
      modifyCardVisible: [true, true],
      modifyApwd: {
        oldPwd: "",
        newPwd: "",
        newPwdCheck: "",
      },
      modifyApwdRules: {
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [
          {
            required: true,
            validator: (rule, value, callback) => {
              this.pwdOriginalCheck(value, callback, this.modifyApwd);
            },
            trigger: "blur",
          },
          { min: 5, max: 25, message: "长度在 5 到 25个字符" },
          {
            pattern: /^(\w)*$/,
            message: "限字母、数字、下划线",
          },
        ],
        newPwdCheck: [
          {
            required: true,
            validator: (rule, value, callback) => {
              this.pwdTwiceCheck(value, callback, this.modifyApwd);
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 新旧密码检查
    pwdOriginalCheck: function (value, callback, $msgForm) {
      if (value) {
        value = value.trim();
        if ($msgForm.newPwd != $msgForm.oldPwd) {
          // $msgForm.validateField('newPwdCheck')
          callback();
        } else {
          callback(new Error("请检查新密码, 不能与旧密码相同"));
        }
      } else {
        return callback(new Error("请输入新密码, 不能为空"));
      }
    },

    // 两次密码输入验证规则函数
    pwdTwiceCheck: function (value, callback, $msgForm) {
      if (value) {
        value = value.trim();
        if ($msgForm.newPwdCheck == $msgForm.newPwd) {
          callback();
        } else {
          callback(new Error("请检查重复输入, 两次输入不一致"));
        }
      } else {
        return callback(new Error("请再次输入新密码, 不能为空"));
      }
    },

    // 重置表单按钮
    resetNewPwdBtn: function () {
      this.$confirm("表单内容不会保存/上传, 请确认是否重置?", "重置确认", {
        confirmButtonText: "确认",
        cancelButtonText: "放弃",
        type: "warning",
      })
        .then(() => {
          this.$refs["modifyApwdForm"].resetFields();
          this.$message({
            type: "success",
            message: "修改密码表单已重置!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "修改密码表单重置操作已取消.",
          });
        });
    },

    // 提交表单按钮
    submitNewPwdBtn: function () {
      this.$refs["modifyApwdForm"].validate((v) => {
        if (v) {
          this.$confirm("即将上传修改密码请求, 请确认?", "上传确认", {
            confirmButtonText: "确认",
            cancelButtonText: "放弃",
            type: "warning",
          })
            .then(() => {
              this.fullscreenLoading = true;
              this.postNewPwd();
              this.$message({
                type: "success",
                message: "修改密码表单已提交!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "修改密码表单提交操作已取消.",
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "修改密码表单验证未通过.",
          });
        }
      });
    },

    // axois - 上传修改密码
    postNewPwd: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/modifyapwd",
        data: {
          atoken: localStorage.getItem("atoken"),
          modifyform: {
            admin: localStorage.getItem("user"),
            oldpwd: this.modifyApwd.oldPwd,
            newpwd: this.modifyApwd.newPwd,
          },
        },
      })
        .then((response) => {
          // 处理上传结果
          // 返回:  {"ifSuccess": "true / false",
          //        "err": "undefined / err message"}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          this.fullscreenLoading = false;
          if (res.ifSuccess == true) {
            // 修改成功重置表单
            this.$refs["modifyApwdForm"].resetFields();
            this.$message({
              type: "success",
              message: "修改密码成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改密码失败!\n" + res.err,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped>
.as_mainbody {
  height: 100%;
}

.as_h2 {
  margin: 0;
}

.as_container {
  height: calc(100% - 60px);
}

.as_card {
  width: 340px;
}

.as_card_fold {
  width: 170px;
}
</style>