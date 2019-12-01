import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入登录页
import Login from '@/views/login'
// 引入底部导航
import Tabbar from '@/views/tabbar'
// 引入首页
import Home from '@/views/home'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  // 登录页
  {
    path: '/login',
    component: Login
  },
  // 底部导航栏
  {
    path: '/',
    component: Tabbar,
    children: [
      // 首页
      {
        path: '', // 默认子路由
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
