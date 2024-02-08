import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import '@/assets/css/common.less'
import '@/assets/font/iconfont.css'
import "@/styles/index.scss"
import store from './stores'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) { //注册所有的 Element Plus Icon
    app.component(key, component)
}
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
