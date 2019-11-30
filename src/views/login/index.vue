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
// 引入 请求
import { login } from '@/api/user'
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
      this.$toast.loading({
        duration: 0, // 展示时长(ms)，值为 0 时，toast 不会消失
        message: '登陆中...', // 文本内容，支持通过\n换行
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const res = await login(this.user)
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登陆失败', err)
        this.$toast.fail('登陆失败,手机号或验证码有误')
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
