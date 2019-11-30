<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登陆" left-arrow style="color:#fff" />

    <!-- 输入框 -->
    <van-cell-group>
      <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" />
    </van-cell-group>

    <!-- 登陆按钮 -->
    <div class="btn">
      <van-button type="info" @click="onLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
// 引入axios
import request from '@/utils/request'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 登陆
    async onLogin () {
      try {
        const res = await request({
          method: 'POST',
          url: '/app/v1_0/authorizations',
          data: this.user
        })
        console.log('登陆成功', res)
      } catch (err) {
        console.log('登陆失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
