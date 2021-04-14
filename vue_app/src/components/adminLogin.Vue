<template>
  <div class="root">
    <form class="form" autocomplete="off">
      <div class="form-inner">
        <h2 class="al-h2">管理员登录</h2>
        <div class="input-wrapper">
          <label class="al-lable" for="account">管理员帐号</label>
          <div class="input-group">
            <span class="icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                </path>
              </svg>
            </span>
            <input class="al-input" type="text" id="account" v-model="a_login.account" />
          </div>
        </div>
        <div class="input-wrapper">
          <label class="al-lable" for="apwd">密码</label>
          <div class="input-group">
            <span class="icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M11.83,1.73C8.43,1.79 6.23,3.32 6.23,3.32C5.95,3.5 5.88,3.91 6.07,4.19C6.27,4.5 6.66,4.55 6.96,4.34C6.96,4.34 11.27,1.15 17.46,4.38C17.75,4.55 18.14,4.45 18.31,4.15C18.5,3.85 18.37,3.47 18.03,3.28C16.36,2.4 14.78,1.96 13.36,1.8C12.83,1.74 12.32,1.72 11.83,1.73M12.22,4.34C6.26,4.26 3.41,9.05 3.41,9.05C3.22,9.34 3.3,9.72 3.58,9.91C3.87,10.1 4.26,10 4.5,9.68C4.5,9.68 6.92,5.5 12.2,5.59C17.5,5.66 19.82,9.65 19.82,9.65C20,9.94 20.38,10.04 20.68,9.87C21,9.69 21.07,9.31 20.9,9C20.9,9 18.15,4.42 12.22,4.34M11.5,6.82C9.82,6.94 8.21,7.55 7,8.56C4.62,10.53 3.1,14.14 4.77,19C4.88,19.33 5.24,19.5 5.57,19.39C5.89,19.28 6.07,18.92 5.95,18.6V18.6C4.41,14.13 5.78,11.2 7.8,9.5C9.77,7.89 13.25,7.5 15.84,9.1C17.11,9.9 18.1,11.28 18.6,12.64C19.11,14 19.08,15.32 18.67,15.94C18.25,16.59 17.4,16.83 16.65,16.64C15.9,16.45 15.29,15.91 15.26,14.77C15.23,13.06 13.89,12 12.5,11.84C11.16,11.68 9.61,12.4 9.21,14C8.45,16.92 10.36,21.07 14.78,22.45C15.11,22.55 15.46,22.37 15.57,22.04C15.67,21.71 15.5,21.35 15.15,21.25C11.32,20.06 9.87,16.43 10.42,14.29C10.66,13.33 11.5,13 12.38,13.08C13.25,13.18 14,13.7 14,14.79C14.05,16.43 15.12,17.54 16.34,17.85C17.56,18.16 18.97,17.77 19.72,16.62C20.5,15.45 20.37,13.8 19.78,12.21C19.18,10.61 18.07,9.03 16.5,8.04C14.96,7.08 13.19,6.7 11.5,6.82M11.86,9.25V9.26C10.08,9.32 8.3,10.24 7.28,12.18C5.96,14.67 6.56,17.21 7.44,19.04C8.33,20.88 9.54,22.1 9.54,22.1C9.78,22.35 10.17,22.35 10.42,22.11C10.67,21.87 10.67,21.5 10.43,21.23C10.43,21.23 9.36,20.13 8.57,18.5C7.78,16.87 7.3,14.81 8.38,12.77C9.5,10.67 11.5,10.16 13.26,10.67C15.04,11.19 16.53,12.74 16.5,15.03C16.46,15.38 16.71,15.68 17.06,15.7C17.4,15.73 17.7,15.47 17.73,15.06C17.79,12.2 15.87,10.13 13.61,9.47C13.04,9.31 12.45,9.23 11.86,9.25M12.08,14.25C11.73,14.26 11.46,14.55 11.47,14.89C11.47,14.89 11.5,16.37 12.31,17.8C13.15,19.23 14.93,20.59 18.03,20.3C18.37,20.28 18.64,20 18.62,19.64C18.6,19.29 18.3,19.03 17.91,19.06C15.19,19.31 14.04,18.28 13.39,17.17C12.74,16.07 12.72,14.88 12.72,14.88C12.72,14.53 12.44,14.25 12.08,14.25Z">
                </path>
              </svg>
            </span>
            <input class="al-input" type="password" id="apwd" v-model="a_login.apwd" @keyup.enter="to_log_in" />
          </div>
        </div>
        <div class="btn-group">
          <input class="al-btn" type="button" value="登 录" @click="to_log_in">
          <!-- <div id="prompt" class="prompt">[[${err_msg}]]</div>-->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      a_login: {
        account: 'admin',
        apwd: '666666'
      }
    }
  },
  methods: {
    // 登录
    to_log_in: function () {
      const self = this;
      console.log(self.a_login);
      this.postLogin(self.a_login.account, self.a_login.apwd);
    },
    // 发送login信息到后端, 并处理返回信息
    postLogin: function(account, pwd) {
      this.axios({
        method: "POST",
        url: "/admin/login",
        data: {
          "account": account,
          "apwd": pwd
        }
      })
      .then(response => {
        // 处理登录结果
        // 成功: { ifPass: true, token: '***' }
        // 失败: { ifPass: false, err: '***' }
        let res = JSON.stringify(response.data);
        res = JSON.parse(res)
        console.log(res);
        if (res.ifAPass == true) {
          // 登录成功, 储存token, 跳转至quBank界面
          localStorage.setItem("timeStamp", res.timeStamp);
          localStorage.setItem("atoken", res.atoken);
          alert("☺ 登录成功");
          this.$emit('alog', true);
          this.$router.push('/admin/manage');
        } else {
          // 登录失败
          alert("登录失败: " + res.err);
          this.$router.reslove('/admin/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style>
.root {
  --space-root: 1rem;
  --space-xs: calc(var(--space-root) / 2);
  --space-s: calc(var(--space-root) / 1.5);
  --space-m: var(--space-root);
  --space-l: calc(var(--space-root) * 1.5);
  --space-xl: calc(var(--space-root) * 2);
  --color-primary: mediumslateblue;
  --color-secondary: black;
  --color-tertiary: linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%);
  --base-border-radius: 0.25rem;
  --ease: cubic-bezier(0.075, 0.82, 0.165, 1);
  --duration: 350ms;
  --font-family: 'Roboto', sans-serif;
  --font-size: 1.25rem;
  place-items: center;
  margin: 0;
  width: 100%;
  height: calc(100% - 85px);
  position: absolute;
  padding: var(--space-m);
  font-size: var(--font-size);
  font-family: var(--font-family);
  line-height: 1.2;
  background: var(--color-tertiary);
}

* {
  box-sizing: border-box;
}

.al-h2 {
  font-weight: 700;
  font-size: calc(var(--font-size) * 1.5);
}

.form {
  position: relative;
  max-width: 450px;
  margin: 10% auto;
  display: grid;
  -webkit-transform: skewY(-5deg) translateY(10%) scale(0.94);
          transform: skewY(-5deg) translateY(10%) scale(0.94);
  -webkit-transition: box-shadow var(--duration) var(--ease), -webkit-transform var(--duration) var(--ease);
  transition: box-shadow var(--duration) var(--ease), -webkit-transform var(--duration) var(--ease);
  transition: box-shadow var(--duration) var(--ease), transform var(--duration) var(--ease);
  transition: box-shadow var(--duration) var(--ease), transform var(--duration) var(--ease), -webkit-transform var(--duration) var(--ease);
}

.form:before, .form:after {
  content: '';
  position: absolute;
  pointer-events: none;
  background-color: #ebebeb;
  width: 25%;
  height: 100%;
  -webkit-transition: background-color var(--duration) var(--ease), -webkit-transform var(--duration) var(--ease);
  transition: background-color var(--duration) var(--ease), -webkit-transform var(--duration) var(--ease);
  transition: background-color var(--duration) var(--ease), transform var(--duration) var(--ease);
  transition: background-color var(--duration) var(--ease), transform var(--duration) var(--ease), -webkit-transform var(--duration) var(--ease);
}

.form:before {
  top: 0;
  right: calc(100% - 1px);
  -webkit-transform-origin: 100% 100%;
          transform-origin: 100% 100%;
  -webkit-transform: skewY(-35deg) scaleX(-1);
          transform: skewY(-35deg) scaleX(-1);
  z-index: -1;
}

.form:after {
  top: 0;
  left: calc(100% - 1px);
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  -webkit-transform: skewY(-35deg) scaleX(-1);
          transform: skewY(-35deg) scaleX(-1);
  z-index: 2;
}

.form:hover, .form:focus-within {
  -webkit-transform: scale(1.0001);
          transform: scale(1.0001);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
}

.form:hover:before, .form:hover:after, .form:focus-within:before, .form:focus-within:after {
  background-color: white;
  -webkit-transform: skewY(0);
          transform: skewY(0);
}

.form-inner {
  padding: var(--space-xl);
  background-color: white;
  z-index: 1;
}

.form-inner > * + * {
  margin-top: var(--space-xl);
}

.al-lable {
  font-size: calc(var(--font-size) / 1.65);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.065rem;
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--color-primary);
}

.input-wrapper:focus-within label {
  color: var(--color-secondary);
}

.input-wrapper:focus-within .icon {
  background-color: var(--color-secondary);
}

.input-wrapper:focus-within input {
  border-color: var(--color-secondary);
}

.input-wrapper + .input-wrapper {
  margin-top: var(--space-l);
}

.input-group {
  position: relative;
}

.input-group input {
  border-radius: var(--base-border-radius);
  padding-left: calc(var(--space-s) + 60px);
}

.input-group .icon {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-top-left-radius: var(--base-border-radius);
  border-bottom-left-radius: var(--base-border-radius);
  pointer-events: none;
}

.icon {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-flex: 0;
          flex: 0 1 auto;
  padding: var(--space-m);
  background-color: var(--color-primary);
}

.icon svg {
  width: 1.25em;
  height: 1.25em;
  fill: white;
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-transition: -webkit-transform var(--duration) var(--ease);
  transition: -webkit-transform var(--duration) var(--ease);
  transition: transform var(--duration) var(--ease);
  transition: transform var(--duration) var(--ease), -webkit-transform var(--duration) var(--ease);
}

.al-input {
  -webkit-box-flex: 1;
          flex: 1 1 0;
  width: 100%;
  outline: none;
  padding: var(--space-m);
  font-size: var(--font-size);
  font-family: var(--font-family);
  color: var(--color-secondary);
  border: 2px solid var(--color-primary);
}

.al-input:focus {
  color: var(--color-primary);
}

.btn-group {
  display: -webkit-box;
  display: flex;
  text-align: center;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: justify;
          justify-content: space-between;
}

.btn-group > * + * {
  margin-left: var(--space-s);
}

.al-btn {
  padding: calc(var(--space-m) * 0.75) calc(var(--space-l) * 0.75);
  position: relative;
  display: flex;
  outline: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border: 2px solid transparent;
  border-radius: var(--base-border-radius);
  font-size: calc(var(--font-size) * 0.8);
  background: var(--color-primary);
}

</style>