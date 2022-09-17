import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from "@/router";
import mLibs from './libs'
import mComponents from './components'
import 'virtual:svg-icons-register'

createApp(App).use(router).use(mLibs).use(mComponents).mount('#app')
