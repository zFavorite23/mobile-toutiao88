import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入登录页
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  // 登录页路由
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
