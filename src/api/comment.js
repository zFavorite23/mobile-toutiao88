/**
 * 获取评论列表
 */
// 引入axios
import request from '@/utils/request'
export function getComments (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
