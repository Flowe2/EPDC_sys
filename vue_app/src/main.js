import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'

createApp(App)
    .use(router)            // Vue-router
    .use(VueAxios, axios)   // VueAxios中间件
    .mount('#app');


// vue-router 全局前置守卫
router.beforeEach(function (to, from, next) {
    if (to.meta.ifPass) {
        //页面是否需要用户登录
        if (localStorage.getItem("token") != null) {
            // token是否过期
            let validTime = Math.floor( Date.now() /1000 ) - 60*60;
            if (localStorage.getItem("timeStamp") > validTime){
                // 已登录, 继续跳转
                next();
            }else {
                // token过期, 跳转至用户登录页面
                next('/user/login');
            }
        } else {
        // 未登录, 跳转至用户登录页面
        next('/user/login');
        }
    } else if (to.meta.ifAPass) {
        //页面是否需要管理员登录
        if (localStorage.getItem("token") != null) {
            // token是否过期
            let validTime = Math.floor( Date.now() /1000 ) - 60*60;
            if (localStorage.getItem("timeStamp") > validTime){
                // 已登录, 继续跳转
                next();
            }else {
                // token过期, 跳转至用户登录页面
                next('/admin/login');
            }
        } else {
        // 未登录, 跳转至用户登录页面
        next('/admin/login');
        }
    } else {
        //表示不需要登录
        next(); //继续往后走
    }
});