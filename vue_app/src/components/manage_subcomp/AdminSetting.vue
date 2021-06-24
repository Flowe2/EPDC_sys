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
          <el-card :class="cardVisible[0] ? 'as_card_medium' : 'as_card_fold'">
            <template #header>
              <div class="as_card_header">
                <i class="el-icon-picture-outline"></i>
                <span>背景管理</span>
                <el-button
                  @click="cardVisible[0] = !cardVisible[0]"
                  :icon="
                    cardVisible[0]
                      ? 'el-icon-caret-top'
                      : 'el-icon-caret-bottom'
                  "
                  size="mini"
                  round
                ></el-button>
              </div>
            </template>
            <el-collapse-transition>
              <el-table
                :data="displayBkgList"
                style="width: 100%"
                v-show="cardVisible[0]"
              >
                <el-table-column label="序号" type="index" align="center">
                </el-table-column>
                <el-table-column label="名称" show-overflow-tooltip>
                  <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top">
                      <template #default>
                        <el-image :src="scope.row.path"></el-image>
                      </template>
                      <template #reference>
                        <div class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                      </template>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column prop="handle" width="100" align="center">
                  <template #header>
                    <el-popover
                      title="新增背景"
                      placement="bottom-end"
                      :width="340"
                      trigger="click"
                    >
                      <template #reference>
                        <el-button type="success" size="mini" round
                          >新增</el-button
                        >
                      </template>
                      <el-upload
                        class="as_uploadpic"
                        ref="asUploadpic"
                        accept=".bmp, .jpg, .jpeg, .png, .gif"
                        :action="uploadSysBkgPort"
                        :before-upload="asBeforeUpload"
                        :multiple="true"
                        :data="asUploadExtraData"
                        :on-success="asUploadSuccess"
                        :on-error="asUploadError"
                        :on-exceed="asUploadExceed"
                        :file-list="uploadPics"
                        :auto-upload="false"
                        :limit="3"
                        list-type="picture"
                      >
                        <template #trigger>
                          <el-button size="mini" type="primary" round
                            >选择</el-button
                          ></template
                        >
                        <el-button
                          size="mini"
                          type="success"
                          round
                          style="margin-left: 10px"
                          @click="addSysPic"
                          >上传</el-button
                        >
                        <template #tip>
                          <div class="as_upload_tip">
                            仅接受<strong style="color: #e6a23c"
                              >图片类型</strong
                            >文件, 且大小不超过 5MB<br />每次最多上传 3 张
                          </div>
                        </template></el-upload
                      ></el-popover
                    >
                  </template>
                  <template #default="scope">
                    <el-popconfirm
                      confirmButtonText="确定"
                      confirmButtonType="danger"
                      cancelButtonText="不了"
                      @confirm="delSysPic(scope.row)"
                      icon="el-icon-info"
                      iconColor="red"
                      :title="'确定删除背景 ' + scope.row.name + ' 吗?'"
                    >
                      <template #reference>
                        <el-button type="danger" size="mini" round
                          >删除</el-button
                        >
                      </template></el-popconfirm
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-transition>
          </el-card>
          <el-card :class="cardVisible[1] ? 'as_card_medium' : 'as_card_fold'">
            <template #header>
              <div class="as_card_header">
                <i class="el-icon-s-promotion"></i>
                <span>接口管理</span>
                <el-button
                  @click="cardVisible[1] = !cardVisible[1]"
                  :icon="
                    cardVisible[1]
                      ? 'el-icon-caret-top'
                      : 'el-icon-caret-bottom'
                  "
                  size="mini"
                  round
                ></el-button>
              </div>
            </template>
            <el-collapse-transition>
              <div v-show="cardVisible[1]">
                <el-table
                  :data="displayAPIList"
                  :row-class-name="apiTableRowStatus"
                  style="width: 100%"
                >
                  <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="name"
                    label="名称"
                    show-overflow-tooltip
                  >
                    <template #default="scope">
                      <el-popover
                        effect="light"
                        trigger="hover"
                        placement="top"
                        :width="340"
                      >
                        <template #default>
                          <el-descriptions
                            title="接口详情"
                            :column="1"
                            size="small"
                            border
                          >
                            <el-descriptions-item>
                              <template #label> 名称 </template>
                              <span class="as_api_description_text">{{
                                scope.row.name
                              }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item>
                              <template #label> 状态 </template>
                              <span
                                class="as_api_description_text"
                                :class="
                                  scope.row.status
                                    ? 'as_api_description_status_on'
                                    : 'as_api_description_status_off'
                                "
                                >{{
                                  scope.row.status ? "使用中" : "已停用"
                                }}</span
                              >
                            </el-descriptions-item>
                            <el-descriptions-item>
                              <template #label> 过期时间 </template>
                              <span class="as_api_description_text">{{
                                new Date(scope.row.expire).toLocaleDateString()
                              }}</span>
                            </el-descriptions-item>
                          </el-descriptions>
                        </template>
                        <template #reference>
                          <div class="name-wrapper">
                            <el-button
                              type="text"
                              class="as_api_description_text"
                              >{{ scope.row.name }}</el-button
                            >
                          </div>
                        </template>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" width="85">
                    <template #default="scope"
                      ><span class="as_api_description_text">{{
                        apiStatusToString(scope.row)
                      }}</span></template
                    >
                  </el-table-column>
                  <el-table-column prop="handle" width="210" align="center">
                    <template #header>
                      <el-popover
                        title="新增接口"
                        placement="bottom-end"
                        :width="255"
                        trigger="click"
                      >
                        <template #reference>
                          <el-button type="success" size="mini" round
                            >新增</el-button
                          >
                        </template>
                        <el-form
                          ref="newapiForm"
                          :model="newapi"
                          :rules="newapiRules"
                          label-position="left"
                          label-width="80px"
                          size="small"
                        >
                          <el-form-item label="接口名称" prop="name">
                            <el-input
                              v-model="newapi.name"
                              clearable
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="立即启用" prop="enable">
                            <el-switch v-model="newapi.enable"></el-switch>
                          </el-form-item>
                          <el-form-item label="过期时间" prop="expire">
                            <el-date-picker
                              v-model="newapi.expire"
                              type="date"
                              placeholder="选择日期"
                              clearable
                              align="right"
                              style="width: 100%"
                              format="YYYY 年 MM 月 DD 日"
                              value-format="YYYY/MM/DD"
                              :disabled-date="asApiDisabledDate"
                              :shortcuts="asApiDateShortcuts"
                            ></el-date-picker>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="submitNewApiBtn"
                              >提交</el-button
                            >
                            <el-button @click="resetNewApiBtn">重置</el-button>
                          </el-form-item>
                        </el-form>
                      </el-popover>
                      <el-button
                        size="small"
                        circle
                        icon="el-icon-question"
                        class="asHelpBtn"
                        title="API帮助"
                        @click="apiManual"
                      ></el-button>
                    </template>
                    <template #default="scope">
                      <el-popconfirm
                        confirmButtonText="确定"
                        confirmButtonType="primary"
                        cancelButtonText="不了"
                        @confirm="changeExternalApi(scope.row)"
                        icon="el-icon-info"
                        :title="
                          '确定' +
                          (scope.row.status ? '停用' : '启用') +
                          'API &quot;' +
                          scope.row.name +
                          '&quot; 吗?'
                        "
                      >
                        <template #reference>
                          <el-button type="warning" size="mini" round>{{
                            scope.row.status ? "停用" : "启用"
                          }}</el-button>
                        </template></el-popconfirm
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        round
                        @click="downloadExternalApi(scope.row)"
                        >下载</el-button
                      >
                      <el-popconfirm
                        confirmButtonText="确定"
                        confirmButtonType="danger"
                        cancelButtonText="不了"
                        @confirm="delExternalApi(scope.row)"
                        icon="el-icon-info"
                        iconColor="red"
                        :title="'确定删除该API ' + scope.row.name + ' 吗?'"
                      >
                        <template #reference>
                          <el-button
                            type="danger"
                            size="mini"
                            round
                            :disabled="delApiBtnDisalbed"
                            >删除</el-button
                          >
                        </template></el-popconfirm
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <a href="" id="downloadExternalApi" v-show="false"></a>
              </div>
            </el-collapse-transition>
          </el-card>
          <el-card :class="cardVisible[2] ? 'as_card_small' : 'as_card_fold'">
            <template #header>
              <div class="as_card_header">
                <i class="el-icon-edit"></i>
                <span>修改密码</span>
                <el-button
                  @click="cardVisible[2] = !cardVisible[2]"
                  :icon="
                    cardVisible[2]
                      ? 'el-icon-caret-top'
                      : 'el-icon-caret-bottom'
                  "
                  size="mini"
                  round
                ></el-button>
              </div>
            </template>
            <el-collapse-transition>
              <div class="as_card_modify_pwd" v-show="cardVisible[2]">
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
          </el-card></el-space
        ></el-main
      >
    </el-container>
    <el-divider content-position="right"
      ><i class="el-icon-more-outline"></i
    ></el-divider>

    <!-- 修改密码后重新登录提示弹出框 -->
    <el-dialog title="请重新登录" v-model="asModifiedPwdDialog" width="30%">
      <span>由于当前密码已失效, 请重新登陆</span>
      <template #footer>
        <span>
          <el-button type="primary" @click="asModifiedPwdLogout"
            >好的</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
const serverHost = "http://localhost:3000";

export default {
  name: "AdminSetting",
  data() {
    return {
      fullscreenLoading: false,
      cardVisible: [false, false, false],
      displayBkgList: [], //
      uploadSysBkgPort: serverHost + "/admin/manage/ulsysbkgpic", // 上传背景图片后端接口
      uploadPics: [], // 上传图片列表
      asUploadExtraData: {}, // 上传附加数据(atoken)
      displayAPIList: [], // 接口列表
      asApiDisabledDate: (time) => {
        return time.getTime() < Date.now();
      }, // 禁用当前日期之前的时间
      asApiDateShortcuts: [
        {
          text: "六个月",
          value: (() => {
            const date = new Date();
            date.setMonth(date.getMonth() + 6);
            return date;
          })(),
        },
        {
          text: "一  年",
          value: (() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            return date;
          })(),
        },
        {
          text: "两  年",
          value: (() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 2);
            return date;
          })(),
        },
      ],
      newapi: {
        name: "",
        enable: true,
        expire: "",
      },
      newapiRules: {
        name: [
          { required: true, message: "请输入接口名称", trigger: "blur" },
          { min: 3, message: "长度至少为3个字符", trigger: "blur" },
        ],
        expire: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
      },
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
      asModifiedPwdDialog: false, // 修改密码后重新登录对话框
    };
  },
  methods: {
    // 新旧密码检查
    pwdOriginalCheck: function (value, callback, $msgForm) {
      if (value) {
        value = value.trim();
        if ($msgForm.newPwd != $msgForm.oldPwd) {
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

    // 修改密码成功后, 主动登出
    asModifiedPwdLogout: function () {
      localStorage.removeItem("atoken");
      this.$nextTick(() => {
        this.$router.push("/admin/login");
      });
    },

    // 上传前, 类型&大小检查
    asBeforeUpload: function (file) {
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
    // 超出上传数量限制
    asUploadExceed: function () {
      this.$message({
        type: "info",
        message: "不支持上传3个以上文件",
      });
    },
    // 上传成功hook
    asUploadSuccess: function (response, file, fileList) {
      if (response.ifSuccess == true) {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].name == file.name) {
            fileList.splice(i, 1);
          }
        }
        this.$message({
          type: "success",
          message: "图片 " + file.name + "上传成功",
        });
        // 上传成功后重新拉取背景资源列表
        this.getBgkListDetail();
      }
    },
    // 上传失败hook
    asUploadError: function (err, file) {
      this.$message({
        type: "error",
        message: "图片 " + file.name + "上传失败\nerr: " + err,
      });
    },

    // 上传背景
    addSysPic: function () {
      // 附加json数据
      this.asUploadExtraData = {
        atoken: localStorage.getItem("atoken"),
      };
      this.$nextTick(() => {
        this.$refs["asUploadpic"].submit();
      });
    },
    // 删除背景
    delSysPic: function (row) {
      this.postDelCertainPic(row._id);
    },

    // api-table 行状态判断
    apiTableRowStatus: function ({ row }) {
      if (new Date(row.expire) < Date.now()) {
        // 过期状态 - 红
        return "as_api_table_status_expired";
      } else if (row.status) {
        // 启用状态 - 绿
        return "as_api_table_status_on";
      } else {
        // 停用状态 - 橙
        return "as_api_table_status_stop";
      }
    },
    // api-table 状态转文字
    apiStatusToString: function (row) {
      if (new Date(row.expire) < Date.now()) {
        return "已过期";
      } else if (row.status) {
        return "已启用";
      } else {
        return "已停用";
      }
    },
    // Api Manual
    // 删除提示
    apiManual: function () {
      this.$notify({
        type: "info",
        title: "API使用手册",
        offset: 100,
        dangerouslyUseHTMLString: true,
        message:
          "<strong>使用方法</strong>\
          <p>使用 <code>localStorage.getItem('key', value);</code> 函数, 分别将 token 文件中的 'token'、'timeStamp'、'user'存入浏览器会话缓存</p>\
          <strong>关于 localStroage</strong>\
          <p>由于其特性, 请在访问结束后使用 <code>localStorage.removeItem('key');</code> 主动清理</p>",
        duration: 0,
      });
    },
    // 改变api状态
    changeExternalApi: function (row) {
      this.postChangeApi(row);
    },
    // 下载api
    downloadExternalApi: function (row) {
      let a = document.getElementById("downloadExternalApi");
      let fileData =
        '{"token": "' +
        row.token +
        '", "timeStamp": ' +
        new Date(row.expire).getTime() +
        ', "user": "' +
        row.name +
        '"}';
      let apiFile = new Blob([fileData], { type: "application/json" });
      a.href = URL.createObjectURL(apiFile);
      a.download = row.name + ".eqm_api";
      a.dispatchEvent(
        new MouseEvent("click", { bubbles: false, cancelable: true })
      );
    },
    // 删除api
    delExternalApi: function (row) {
      this.postDelApi(row);
    },
    // 重置新增api表单按钮
    resetNewApiBtn: function () {
      this.$confirm("表单内容不会保存/上传, 请确认是否重置?", "重置确认", {
        confirmButtonText: "确认",
        cancelButtonText: "放弃",
        type: "warning",
      })
        .then(() => {
          this.$refs["newapiForm"].resetFields();
          this.$message({
            type: "success",
            message: "新增接口表单已重置!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "新增接口表单重置操作已取消.",
          });
        });
    },
    // 提交新增api表单按钮
    submitNewApiBtn: function () {
      this.$refs["newapiForm"].validate((v) => {
        if (v) {
          this.$confirm("即将上传新增接口请求, 请确认?", "上传确认", {
            confirmButtonText: "确认",
            cancelButtonText: "放弃",
            type: "warning",
          })
            .then(() => {
              this.fullscreenLoading = true;
              this.postAddNewApi();
              this.$message({
                type: "success",
                message: "新增接口表单已提交!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "新增接口表单提交操作已取消.",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "新增接口表单验证未通过.",
          });
        }
      });
    },

    // 重置修改密码表单按钮
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

    // 提交修改密码表单按钮
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
            type: "error",
            message: "修改密码表单验证未通过.",
          });
        }
      });
    },

    // axios - 拉取背景列表
    getBgkListDetail: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/bgklistdetail",
        data: {
          atoken: localStorage.getItem("atoken"),
        },
      })
        .then((response) => {
          // 返回: { pics: [{ "_id": "pic id", "name": "01.jpg", "path": "/images/loginbkg/01.jpg" }, {...}], counter: n}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          this.displayBkgList = res.pics;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 删除指定背景图片
    postDelCertainPic: function (targetpicID) {
      this.axios({
        method: "POST",
        url: "/admin/manage/delcertainpic",
        data: {
          atoken: localStorage.getItem("atoken"),
          deltarget: targetpicID,
        },
      })
        .then((response) => {
          // 处理上传结果
          // 返回:  {"ifSuccess": "true / false",
          //        "err": "undefined / err message"}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          if (res.ifSuccess == true) {
            this.$message({
              type: "success",
              message: "删除背景 " + res.name + " 成功!",
            });
            // 删除后重新拉取背景资源列表
            this.getBgkListDetail();
          } else {
            this.$message({
              type: "error",
              message: "删除背景失败!\n" + res.err,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 拉取接口列表
    getAPIList: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/getapis",
        data: {
          atoken: localStorage.getItem("atoken"),
        },
      })
        .then((response) => {
          // 返回: { apis: [{ "_id": "xxxxxx", "name": "xxx", "status": true/false, "expire": Date, "token": "xxxxxx" }, {...}], counter: n}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          this.displayAPIList = res.apis;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axois - 新增接口
    postAddNewApi: function () {
      this.axios({
        method: "POST",
        url: "/admin/manage/addapi",
        data: {
          atoken: localStorage.getItem("atoken"),
          newapi: this.newapi,
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
            this.$refs["newapiForm"].resetFields();
            this.$message({
              type: "success",
              message: "新增接口成功!",
            });
            // 重新拉取接口列表
            this.getAPIList();
          } else {
            this.$message({
              type: "error",
              message: "新增接口失败!\n" + res.err,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // axois - 启用/停用接口
    postChangeApi: function (row) {
      this.axios({
        method: "POST",
        url: "/admin/manage/changeapi",
        data: {
          atoken: localStorage.getItem("atoken"),
          target: row._id,
          enable: !row.status,
        },
      })
        .then((response) => {
          // 处理上传结果
          // 返回:  {"ifSuccess": "true / false",
          //        "err": "undefined / err message"}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          if (res.ifSuccess == true) {
            this.$message({
              type: "success",
              message: row.status
                ? "停用"
                : "启用" + 'api "' + row.name + '" 成功!',
            });
            // 重新拉取接口列表
            this.getAPIList();
          } else {
            this.$message({
              type: "error",
              message: row.status
                ? "停用"
                : "启用" + 'api "' + row.name + '" 失败.\n' + res.err,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // axois - 删除接口
    postDelApi: function (row) {
      this.axios({
        method: "POST",
        url: "/admin/manage/delapi",
        data: {
          atoken: localStorage.getItem("atoken"),
          target: row._id,
        },
      })
        .then((response) => {
          // 处理上传结果
          // 返回:  {"ifSuccess": "true / false",
          //        "err": "undefined / err message"}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          if (res.ifSuccess == true) {
            this.$message({
              type: "success",
              message: '删除api "' + row.name + '" 成功!',
            });
            // 重新拉取接口列表
            this.getAPIList();
          } else {
            this.$message({
              type: "error",
              message: '删除api "' + row.name + '" 失败.\n' + res.err,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 上传修改密码
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
            this.$nextTick(() => {
              this.asModifiedPwdDialog = true;
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
  computed: {
    delPicBtnDisalbed: function () {
      return this.displayBkgList.length > 1 ? false : true;
    },
  },
  mounted() {
    // 拉取系统背景列表
    this.getBgkListDetail();
    // 拉取接口列表
    this.getAPIList();
  },
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
  height: 80%;
}

.as_card_small {
  width: 340px;
}

.as_card_medium {
  width: 510px;
}

.as_card_large {
  width: 680px;
}

.as_card_fold {
  width: 170px;
}

.as_upload_tip {
  margin: 5px;
}

.asHelpBtn {
  font-size: large;
  border: 0;
  padding: 0;
}

.as_api_description_text {
  font-weight: bold;
}

.as_api_description_status_on {
  color: #67c23a;
}

.as_api_description_status_off {
  color: #f56c6c;
}

:deep() .as_api_table_status_on {
  background: #d7eecb;
}

:deep() .as_api_table_status_expired {
  background: #e99999;
}

:deep() .as_api_table_status_stop {
  background: #f0e0c2;
}
</style>