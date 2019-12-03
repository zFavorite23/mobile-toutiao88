import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入REM基准值
import './utils/register-vant.js' // 引入vant组件
import './styles/index.css' // 引入全局公共样式
import './utils/dayjs' // 引入全局时间
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
