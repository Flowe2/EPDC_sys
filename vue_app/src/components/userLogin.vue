<template>
  <div>
    <div id="form_box" class="form_box">
      <div class="login-html">
        <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
        <label for="tab-1" class="tab">登 录</label>
        <input id="tab-2" type="radio" name="tab" class="sign-up" />
        <label for="tab-2" class="tab">注 册</label>
        <div class="login-form">
          <div class="sign-in-htm">
            <div class="group">
              <label for="email" class="label">邮 箱</label>
              <input id="email" type="text" class="input" v-model="u_login.uemail"/>
            </div>
            <div class="group">
              <label for="pass" class="label">密 码</label>
              <input id="pass" type="password" class="input" data-type="password" v-model="u_login.upwd"/>
            </div>
            <div class="group">
              <input id="check" type="checkbox" class="check" v-model="u_login.remb"/>
              <label for="check"><span class="icon">
                </span> 记住我? </label>
            </div>
            <div class="group">
              <input type="submit" class="button" value="登 录" @click="to_log_in"/>
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <a href="#forgot"> 忘记密码? </a>
            </div>
          </div>
          <div class="sign-up-htm">
            <div class="group">
              <label for="email" class="label">邮 箱</label>
              <input id="email" type="text" class="input" v-model="u_signup.uemail"/>
            </div>
            <div class="group">
              <label for="name" class="label">用 户 名</label>
              <input id="name" type="text" class="input" v-model="u_signup.uname"/>
            </div>
            <div class="group">
              <label for="pass" class="label">密 码</label>
              <input id="pass" type="password" class="input" data-type="password" v-model="u_signup.upwd"/>
            </div>
            <div class="group">
              <label for="pass" class="label">请 重 复 密 码</label>
              <input id="pass" type="password" class="input" data-type="password" v-model="u_signup.upwd"/>
            </div>
            <div class="group">
              <input type="submit" class="button" value="注 册" @click="to_sign_up"/>
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
							<label for="tab-1">已有注册帐号?</label>
						</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "UserLogin",
  data () {
    return {
      u_login: {
        uemail: '',
        upwd: '',
        remb: false
      },
      u_signup: {
        uemail: '',
        uname: '',
        upwd: ''
      }
    }
  },
  methods: {
    // 登录
    to_log_in: function () {
      const self = this;
      if (self.u_login.remb == true) {
        console.log("remb == true");
        //传入账号名，密码，和保存天数
        self.setCookie(self.u_login.uemail, 7);
      } else {
        console.log("清空Cookie");
        //清空Cookie
        self.clearCookie();
      }
      // TODO axios请求
      console.log(self.u_login);
      this.postLogin(self.u_login.uemail, self.u_login.upwd);
    },

    // 注册
    to_sign_up: function () {
      console.log(this.u_singup);
    },


    // cookie 操作
    // 设置cookie
    setCookie(uemial, days) {
      let exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "userName=" + uemial + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取cookie
    getCookie: function() {
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
    clearCookie: function() {
      this.setCookie("", -1); //修改2值都为空，天数为负1天就好了
    },

    // 发送login信息到后端, 并处理返回信息
    postLogin: function(email, pwd) {
      this.axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: {
          "uemail": email,
          "upwd": pwd
        }
      })
      .then(response => {
        // 处理登录结果
        // 成功: { ifPass: true, token: '***' }
        // 失败: { ifPass: false, err: '***' }
        let res = JSON.stringify(response.data);
        res = JSON.parse(res)
        console.log(res);
        if (res.ifPass == true) {
          // 登录成功, 储存token, 跳转至quBank界面
          localStorage.setItem("token", res.token);
          alert("☺ 登录成功");
          this.$router.push('/user/quBank');
        } else {
          // 登录失败
          alert("登录失败: " + res.err);
          this.$router.reslove('/user/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted: function(){
    this.getCookie();
  }
};
</script>


<style scoped>
body {
  margin: 0;
  color: #6a6f8c;
  background: #c8c8c8;
  font: 600 16px/18px "Open Sans", sans-serif;
}
*,
:after,
:before {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
input,
button {
  outline: none;
  border: none;
  font-size: 15px;
}

.form_box {
  width: 100%;
  margin: auto;
  margin-right: 0px;
  max-width: 400px;
  min-height: 650px;
  position: relative;
  box-shadow: -5px 18px 15px 5px rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.login-html {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 90px 70px 50px 70px;
  background: rgba(40, 57, 101, 0.9);
}
.login-html .sign-in-htm,
.login-html .sign-up-htm {
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
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check {
  display: none;
}
.login-html .tab {
  font-size: 22px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab {
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
.login-html
  .sign-in:checked
  + .tab
  + .sign-up
  + .tab
  + .login-form
  .sign-in-htm {
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
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
</style>