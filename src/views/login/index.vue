<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登陆" left-arrow style="color:#fff" />

    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        required
        clearable
        label="手机号"
        right-icon="question-o"
        placeholder="请输入手机号"
        @click-right-icon="$toast('question')"
      />
      <van-field type="password" label="验证码" placeholder="请输入验证码" required />
    </van-cell-group>

    <!-- 登陆按钮 -->
    <div class="btn">
      <van-button type="info">登陆</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
