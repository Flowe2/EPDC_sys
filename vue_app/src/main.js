import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'


Vue.prototype.$http = axios
createApp(App).mount('#app')