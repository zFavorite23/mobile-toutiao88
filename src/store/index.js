import Vue from 'vue'
import Vuex from 'vuex'
// 引入 token模块
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录用户 一个对象 包含token信息
    // user: null
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止刷新丢失state中 的user状态  把它存到本地存储
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
