
// 文章相关的数据接口

// 引入axios
import request from '@/utils/request'

// 获取文章列表
export function getArticle (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
