import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入登录页
import Login from '@/views/login'
// 引入底部导航
import Tabbar from '@/views/tabbar'
// 引入首页
import Home from '@/views/home'
// 引入搜索页
import Search from '@/views/search'
// 引入搜索详情页
import SearchResult from '@/views/search-result'
// 引入文章详情页
import Article from '@/views/article'

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
  },
  // 搜索页
  {
    path: '/search',
    component: Search
  },
  // 搜索详情页
  {
    path: '/search/:q',
    component: SearchResult
  },
  // 文章详情页
  {
    path: '/article/:articleId',
    component: Article
  }
]

const router = new VueRouter({
  routes
})

export default router
