<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getProfile } from '@/api/user'
export default {
  name: 'UserIndex',
  data () {
    return {
      user: {} // 个人用户信息
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    // 获取个人信息
    async loadUserProfile () {
      const res = await getProfile()
      // console.log(res)
      this.user = res.data.data
    }
  }
}
</script>
