<template>
  <div>
    <!-- 用户信息 -->
    <van-cell-group v-if="$store.state.user" class="user-info">
      <van-cell class="base-info" is-link :border="false" @click="$router.push('/user')">
        <div slot="title">
          <img class="avatar" :src="user.photo" alt />
          <span class="title">{{ user.name }}</span>
        </div>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item>
          <span class="count">{{ user.art_count }}</span>
          <span class="text">头条</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.follow_count }}</span>
          <span class="text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.fans_count }}</span>
          <span class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.like_count }}</span>
          <span class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- /用户信息 -->
    <!-- 未登录 -->
    <div class="not-login" v-else>
      <div class="circle" @click="$router.push({ name: 'login' })">
        <span @click="$router.push('/login')">登录</span>
      </div>
    </div>
    <!-- /未登录 -->

    <!-- 其它 -->
    <van-cell-group>
      <van-grid clickable>
        <van-grid-item icon="star" text="我的收藏" />
        <van-grid-item icon="chat" text="我的评论" />
        <van-grid-item icon="like" text="我的点赞" />
        <van-grid-item icon="browsing-history" text="浏览历史" />
      </van-grid>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link @click="$router.push('/chat')" />
      <van-cell title="系统设置" is-link to="/settings" />
      <van-cell title="退出登录" @click="onLogout" />
    </van-cell-group>
    <!-- /其它 -->
  </div>
</template>

<script>
// 引入需求
import { getSelf } from '@/api/user'

export default {
  name: 'UserIndex',
  data () {
    return {
      user: {} // 用户信息对象
    }
  },
  created () {
    if (this.$store.state.user) {
      this.loadUser()
    }
  },
  methods: {
    // 用户退出
    onLogout () {
      // Dialog 组件既可以在模板中使用
      // 也可以通过 JavaScript 来调用
      // 模板中使用 van-dialog
      // JavaScript 调用：this.$dialog
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出么'
        })
        .then(() => {
          // 确定执行这里
          // 确定退出token设置为空
          this.$store.commit('setUser', null)
          // 跳转到登录页
          this.$router.push('/login')
          // on confirm
        })
        .catch(() => {
          //   取消执行这里
          // on cancel
        })
    },

    // 获取登陆用户信息
    async loadUser () {
      const res = await getSelf()
      //   console.log(res)
      this.user = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.not-login {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}

.user-info {
  .base-info {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 15px;
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 14px;
    }
    .count {
      font-size: 12px;
    }
  }
}
</style>
