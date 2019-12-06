
// 用户相关数据接口

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

// 获取频道列表

export function getUserChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 关注用户

export function followUser (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户

export function unFollowUser (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
