import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import '@/assets/svg/index'
import svgIcon from '@/assets/svg/index.vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.component('svg-icon', svgIcon)
app.mount('#app')
