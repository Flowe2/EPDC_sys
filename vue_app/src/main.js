import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import Vue from 'vue';
// Vue.use(VueAxios, axios);

createApp(App).use(VueAxios, axios).mount('#app')