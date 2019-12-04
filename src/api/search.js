
// 搜索相关数据接口

// 引入axios
import request from '@/utils/request'

// 获取搜索联想
export function getSuggestions (q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果

export function getSraech (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
