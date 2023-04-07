import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "normalize.css"
import "./assets/css/base.less"
import  "element-plus/theme-chalk/base.css"

import App from './App.vue'
import router from './router'
import setUpStore from './utils/setup-store'

import registerGlobalProperties from './global/registerProperties'

const app = createApp(App)

registerGlobalProperties(app);

app.use(createPinia())
setUpStore();
app.use(router)

app.mount('#app')
