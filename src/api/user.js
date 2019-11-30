// 用户请求模块

// 引入axios
import request from '@/utils/request'

// 用户登录

export function login (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
