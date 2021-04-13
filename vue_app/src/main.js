import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css' // 主题样式需要单独引入
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router/index';


createApp(App)
    .use(ElementPlus)
    .use(router)            // Vue-router
    .use(VueAxios, axios)   // VueAxios中间件
    .mount('#app');


// axios.defaults.baseURL = 'http://localhost:3000';

// vue-router 全局前置守卫
router.beforeEach(function (to, from, next) {
    let validTime = Math.floor(Date.now() / 1000) - 60 * 60;
    if (to.meta.ifPass) {
        //页面是否需要用户登录
        console.log("user login check");
        if (localStorage.getItem("token") != null) {
            if (localStorage.getItem("timeStamp") > validTime) {
                // 已登录, 继续跳转
                if (to.path == '/user/login') {
                    console.log("user already logged.");
                    next('/user/manage');
                }
                console.log("u-l-check pass");
                // this.$router.push("/user/qubank");
                next();
            } else {
                // token过期, 跳转至用户登录页面
                console.log("u-l-check fail: out-of-date token");
                next("/user/login");
            }
        } else {
            // 未登录, 跳转至用户登录页面
            console.log("u-l-check fail: no token yet");
            next("/user/login");
        }
    } else if (to.meta.ifAPass) {
        //页面是否需要管理员登录
        console.log("admin login check");
        if (localStorage.getItem("atoken") != null) {
            // token是否过期
            if (localStorage.getItem("timeStamp") > validTime) {
                // 已登录, 继续跳转
                console.log("a-l-check pass");
                next();
            } else {
                // token过期, 跳转至用户登录页面
                console.log("a-l-check fail: out-of-date atoken");
                next("/admin/login");
            }
        } else {
            // 未登录, 跳转至用户登录页面
            console.log("a-l-check fail: no atoken yet");
            next("/admin/login");
        }
    } else if ( to.meta.login ){
        // 已登录后, 拦截跳转到 login 页面的路由
        if (localStorage.getItem("timeStamp") > validTime) {
            if (localStorage.getItem("token")) {
                console.log("user already logged.");
                next('/user/qubank');
            } else if (localStorage.getItem("atoken")) {
                console.log("admin already logged.");
                next('/admin/manage');
            }
            else {
                next();
            }
        }
        next();
    } 
    else {
        next();
    }
});