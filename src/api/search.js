
// 搜索相关数据接口

// 引入axios
import request from '@/utils/request'

// 获取文章列表
export function getSuggestions (q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
