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
// router.beforeEach(function (to, from, next) {
//     if (to.meta.ifPass) {
//         //页面是否需要用户登录
//         console.log("user login check");
//         if (localStorage.getItem("token") != null) {
//             // token是否过期
//             let validTime = Math.floor( Date.now() /1000 ) - 60*60;
//             if (localStorage.getItem("timeStamp") > validTime){
//                 // 已登录, 继续跳转
//                 console.log("u-l-check pass");
//                 next();
//             }else {
//                 // token过期, 跳转至用户登录页面
//                 console.log("u-l-check fail: out-of-date token");
//                 next('/user/login');
//             }
//         } else {
//         // 未登录, 跳转至用户登录页面
//         console.log("u-l-check fail: no token yet");
//         next('/user/login');
//         }
//     } else if (to.meta.ifAPass) {
//         //页面是否需要管理员登录
//         console.log("admin login check");
//         if (localStorage.getItem("atoken") != null) {
//             // token是否过期
//             let validTime = Math.floor( Date.now() /1000 ) - 60*60;
//             if (localStorage.getItem("timeStamp") > validTime){
//                 console.log("a-l-check pass");
//                 // 已登录, 继续跳转
//                 next();
//             }else {
//                 // token过期, 跳转至用户登录页面
//                 console.log("a-l-check fail: out-of-date token");
//                 next('/admin/login');
//             }
//         } else {
//         // 未登录, 跳转至用户登录页面
//         console.log("a-l-check fail: no token yet");
//         next('/admin/login');
//         }
//     } else {
//         //表示不需要登录
//         next(); //继续往后走
//     }
// });