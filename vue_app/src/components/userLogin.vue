<template>
  <el-container class="loginBody">
    <el-main style="padding: 0">
      <ul class="ul_ul">
        <li class="ul_li" v-for="(pic, index) in pic_list" :key="index">
          <transition name="el-fade-in-linear">
            <img v-show="index == pic_num" class="login_bkg" :src="pic" />
          </transition>
        </li>
      </ul>
      <el-button
        id="bkg_btn_left"
        class="bkg_btn"
        icon="el-icon-arrow-left"
        circle
        @click="changePic(-2)"
      ></el-button>
      <el-button
        id="bkg_btn_right"
        class="bkg_btn"
        icon="el-icon-arrow-right"
        circle
        @click="changePic(-1)"
      ></el-button>

      <ul class="ul_ul">
        <li class="ul_li" v-for="item in pic_list.length" :key="item">
          <el-button
            class="bkg_btn_bottom"
            :class="{ actvieBtn: item - 1 == pic_num }"
            @click="changePic(item - 1)"
          ></el-button>
        </li>
      </ul>
    </el-main>

    <el-aside width="400px">
      <div id="form_box" class="form_box">
        <div class="content-box">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            class="base_input log-in"
            checked
          />
          <label for="tab-1" class="tab">登 录</label>
          <input
            id="tab-2"
            type="radio"
            name="tab"
            class="base_input sign-up"
          />
          <label for="tab-2" class="tab">注 册</label>
          <div class="login-form">
            <div class="log-in-htm">
              <div class="group">
                <label for="email" class="label" style="margin-top: 40px"
                  >邮 箱</label
                >
                <input
                  id="email"
                  type="text"
                  class="base_input input"
                  v-model="u_login.uemail"
                />
              </div>
              <div class="group">
                <label for="pass" class="label">密 码</label>
                <input
                  id="pass"
                  type="password"
                  class="base_input input"
                  data-type="password"
                  v-model="u_login.upwd"
                  @keyup.enter="to_log_in"
                />
              </div>
              <div class="group">
                <input
                  id="check"
                  type="checkbox"
                  class="base_input check"
                  v-model="u_login.remb"
                />
                <label for="check"><span class="icon"> </span> 记住我? </label>
              </div>
              <div class="group">
                <input
                  type="submit"
                  class="base_input button"
                  value="登 录"
                  @click="to_log_in"
                />
              </div>
              <div class="hr"></div>
              <div class="foot-lnk">
                <a
                  class="forget"
                  href="mailto:954827899@qq.com?subject=[help]Forget/my/password"
                >
                  忘记密码?
                </a>
              </div>
            </div>
            <div class="sign-up-htm">
              <div class="group">
                <label for="semail" class="label">邮 箱</label>
                <input
                  id="semail"
                  type="text"
                  class="base_input input"
                  v-model="u_signup.uemail"
                />
              </div>
              <div class="group">
                <label for="sname" class="label">用 户 名</label>
                <input
                  id="sname"
                  type="text"
                  class="base_input input"
                  v-model="u_signup.uname"
                />
              </div>
              <div class="group">
                <label for="spass" class="label">密 码</label>
                <input
                  id="spass"
                  type="password"
                  class="base_input input"
                  data-type="password"
                  v-model="u_signup.upwd"
                />
              </div>
              <div class="group">
                <label for="cpass" class="label">请 重 复 密 码</label>
                <input
                  id="cpass"
                  type="password"
                  class="base_input input"
                  data-type="password"
                  v-model="cpwd"
                />
              </div>
              <div class="group">
                <label for="postscript" class="label">留言</label>
                <input
                  id="postscript"
                  type="text"
                  class="base_input input"
                  v-model="u_signup.postscript"
                />
              </div>
              <div class="group">
                <input
                  type="submit"
                  class="base_input button"
                  :value="
                    checkEmail
                      ? checkPwd
                        ? '注 册'
                        : '密码为空 / 两次密码不一致'
                      : '邮箱为空 / 已存在'
                  "
                  :disabled="!(checkEmail && checkPwd)"
                  @click="to_sign_up"
                />
              </div>
              <div class="hr"></div>
              <div class="foot-lnk">
                <label for="tab-1">已有注册帐号?</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>


<script>
import _ from "lodash";

export default {
  name: "UserLogin",
  data() {
    return {
      u_login: {
        uemail: "",
        upwd: "",
        remb: false,
      },
      u_signup: {
        uemail: "",
        uname: "",
        upwd: "",
        postscript: "",
      },
      cpwd: "",
      checkPwd: false,
      checkEmail: false,
      pic_list: [],
      pic_num: 0,
    };
  },
  methods: {
    // 登录
    to_log_in: function () {
      const self = this;
      if (self.u_login.remb == true) {
        // console.log("记住账号");
        //传入账号名，密码，和保存天数
        self.setCookie(self.u_login.uemail, 7);
      } else {
        // console.log("清空Cookie");
        //清空Cookie
        self.clearCookie();
      }
      // TODO axios请求
      console.log(self.u_login);
      self.postLogin(self.u_login.uemail, self.u_login.upwd);
    },

    // 注册
    to_sign_up: function () {
      const self = this;
      console.log(self.u_signup);
      self.postSignup(self.u_signup);
    },

    // cookie 操作
    // 设置cookie
    setCookie(uemial, days) {
      let exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数: 1d
      //字符串拼接cookie
      window.document.cookie =
        "userName=" + uemial + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; ");
        // console.log(arr.toString());
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.u_login.uemail = arr2[1];
            // console.log(arr2[1]);
          }
        }
      }
    },
    // 清理cookie
    clearCookie: function () {
      this.setCookie("", -1); //修改2值都为空，天数为负1天就好了
    },

    // axios - get背景图片
    getBgksList: function () {
      this.axios({
        method: "GET",
        url: "/user/bkglist",
      }).then((response) => {
        let res = JSON.stringify(response.data);
        res = JSON.parse(res);
        this.pic_list = res.paths;
      });
    },

    // axios - 发送login信息到后端, 并处理返回信息
    postLogin: function (email, pwd) {
      this.axios({
        method: "POST",
        url: "/user/login",
        data: {
          uemail: email,
          upwd: pwd,
        },
      })
        .then((response) => {
          // 处理登录结果
          // 成功: { ifPass: true, token: '***' }
          // 失败: { ifPass: false, err: '***' }
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res);
          if (res.ifPass == true) {
            // 登录成功, 储存token, 跳转至quBank界面
            localStorage.setItem("timeStamp", res.timeStamp);
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", email);
            alert("☺ 登录成功");
            this.$emit("ulog", true);
            this.$router.push("/user/quBank");
          } else {
            // 登录失败
            alert("登录失败: " + res.err);
            this.$router.reslove("/user/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 发送login信息到后端, 并处理返回信息
    postSignup: function (u_signup) {
      this.axios({
        method: "POST",
        url: "/user/signup",
        data: {
          uemail: u_signup.uemail,
          uname: u_signup.uname,
          upwd: u_signup.upwd,
          postscript: u_signup.postscript,
        },
      })
        .then((response) => {
          // 处理申请结果
          // 成功: { ifSuccess: true }
          // 失败: { ifSuccess: false, err: '***' }
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          console.log(res);
          if (res.ifSuccess == true) {
            // 申请成功, 跳转回登录界面
            alert("☺ 申请成功, 请等待审核");
            this.$router.replace("/user/login");
          } else {
            // 申请失败, 跳转回登录界面
            alert("注册失败, " + res.err);
            this.$router.replace("/user/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // axios - 实时用户查重请求
    // ? question: debounce 的第一个参数用箭头函数取不到this
    postRealTimeCheck: _.debounce(function () {
      console.log("post real-time-check");
      this.axios({
        method: "POST",
        url: "/user/realtimecheck",
        data: {
          uemail: this.u_signup.uemail,
        },
      })
        .then((response) => {
          // 返回:  {ifAvailable: 'true/fasle'}
          let res = JSON.stringify(response.data);
          res = JSON.parse(res);
          // console.log(res);
          this.checkEmail = res.ifAvailable;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000),

    // 注册密码项检测, 防抖
    signupPwdCheck: _.debounce(function () {
      if (this.u_signup.upwd != "" && this.u_signup.upwd == this.cpwd) {
        this.checkPwd = true;
      } else {
        this.checkPwd = false;
      }
    }, 500),

    // 图片切换
    changePic: function (fob) {
      if (fob == -2) {
        this.pic_num = (this.pic_num + 4) % this.pic_list.length;
      } else if (fob == -1) {
        this.pic_num = (this.pic_num + 1) % this.pic_list.length;
      } else {
        this.pic_num = fob;
      }
    },
  },
  watch: {
    // 注册页面实时用户查重, 防抖
    "u_signup.uemail": function () {
      if (this.u_signup.uemail != "") {
        this.postRealTimeCheck();
      } else {
        this.checkEmail = false;
      }
    },
    // 注册页面密码非空检测及二次检测, 防抖
    "u_signup.upwd": function () {
      this.signupPwdCheck();
    },
    cpwd: function () {
      this.signupPwdCheck();
    },
  },
  mounted: function () {
    // 拉取背景图片
    this.getBgksList();
    // 获取缓存, 记住用户
    this.getCookie();
    // 自动下一张背景
    setInterval(() => {
      this.changePic(-1);
    }, 5000);
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.loginBody {
  width: 100%;
  height: calc(100% - 85px);
  margin: 0;
  padding: 0;
  position: absolute;
  color: #6a6f8c;
  background-size: 100%;
  background-color: #c8c8c8;
}

.login_bkg {
  width: 100%;
  height: 100%;
  position: absolute;
}

.ul_ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ul_li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.bkg_btn {
  top: 400px;
  display: inline;
  position: relative;
  opacity: 0.25;
  border: 0;
  box-shadow: 10px 5px 5px 1px rgba(0, 0, 0, 0.24);
}

.bkg_btn:hover {
  opacity: 0.8;
}

#bkg_btn_left {
  float: left;
  margin-left: 20px;
}

#bkg_btn_right {
  float: right;
  margin-right: 20px;
}

.bkg_btn_bottom {
  height: 5px;
  min-height: 5px;
  width: 30px;
  padding: 0;
  margin: 5% 1% 0 1%;
  display: inline;
  float: left;
  position: relative;
  opacity: 0.25;
  border: 0;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 10px 5px 5px 1px rgba(0, 0, 0, 0.24);
}

.actvieBtn {
  background-color: rgba(0, 0, 0, 1);
}

.form_box {
  width: 100%;
  margin: auto;
  margin-right: 0px;
  max-width: 400px;
  min-height: 700px;
  position: relative;
  box-shadow: 25px 10px 10px 10px rgba(0, 0, 0, 0.24);
}

.content-box {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 60px 70px 50px 70px;
  background: #394045;
}

.base_input {
  outline: none;
  border: none;
  font-size: 15px;
}

.content-box .log-in-htm,
.content-box .sign-up-htm {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.4s linear;
  transition: all 0.4s linear;
}

.content-box .log-in,
.content-box .sign-up,
.login-form .group .check {
  display: none;
}

.content-box .tab {
  font-size: 22px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
}

.content-box .log-in:checked + .tab,
.content-box .sign-up:checked + .tab {
  color: #fff;
  border-color: #1161ee;
}

.login-form {
  min-height: 345px;
  position: relative;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.login-form .group {
  margin-bottom: 15px;
}

.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
  width: 100%;
  color: #fff;
  display: block;
}

.login-form .group .input,
.login-form .group .button {
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}

.login-form .group input[data-type="password"] {
  text-security: circle;
  -webkit-text-security: circle;
}

.login-form .group .label {
  color: #aaa;
  font-size: 18px;
}

.login-form .group .button {
  background: #1161ee;
}

.login-form .group .button:disabled {
  background: #92bde9;
}

.login-form .group label .icon {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
}

.login-form .group label .icon:before,
.login-form .group label .icon:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #fff;
  position: absolute;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}

.login-form .group label .icon:before {
  left: 3px;
  width: 5px;
  bottom: 6px;
  -webkit-transform: scale(0) rotate(0);
  -ms-transform: scale(0) rotate(0);
  transform: scale(0) rotate(0);
}

.login-form .group label .icon:after {
  top: 6px;
  right: 0;
  -webkit-transform: scale(0) rotate(0);
  -ms-transform: scale(0) rotate(0);
  transform: scale(0) rotate(0);
}

.login-form .group .check:checked + label {
  color: #fff;
}

.login-form .group .check:checked + label .icon {
  background: #1161ee;
}

.login-form .group .check:checked + label .icon:before {
  -webkit-transform: scale(1) rotate(45deg);
  -ms-transform: scale(1) rotate(45deg);
  transform: scale(1) rotate(45deg);
}

.login-form .group .check:checked + label .icon:after {
  -webkit-transform: scale(1) rotate(-45deg);
  -ms-transform: scale(1) rotate(-45deg);
  transform: scale(1) rotate(-45deg);
}

.content-box
  .log-in:checked
  + .tab
  + .sign-up
  + .tab
  + .login-form
  .log-in-htm {
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}

.content-box .sign-up:checked + .tab + .login-form .sign-up-htm {
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}

.hr {
  height: 2px;
  margin: 40px 0 35px 0;
  background: rgba(255, 255, 255, 0.2);
}

.foot-lnk {
  text-align: center;
}

.forget {
  color: inherit;
  text-decoration: none;
}
</style>