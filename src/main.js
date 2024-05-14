import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import Decimal from 'decimal.js'
import router from './router'
import { useRouter } from 'vue-router'
import { customDirectives } from './directive'
import '@/styles/style.scss'
import 'element-plus/dist/index.css'
import 'default-passive-events'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(useRouter, router)
app.use(customDirectives)
app.config.globalProperties.$decimal = Decimal;
app.mount('#app')