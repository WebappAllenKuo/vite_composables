import { createApp } from 'vue'
//import './style.css'
import '@/styles/style.scss'
import ElementPlus from 'element-plus'
import Decimal from 'decimal.js'
import 'element-plus/dist/index.css'
import 'default-passive-events'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.config.globalProperties.$decimal = Decimal;
app.mount('#app')