import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'

createApp(App)
    .use(router)            // Vue-router
    .use(VueAxios, axios)   // VueAxios中间件
    .mount('#app')