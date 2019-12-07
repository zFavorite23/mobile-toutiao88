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
/**
 * 添加评论或评论回复
 */
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
