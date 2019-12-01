<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 内容列表 -->
          <!-- v-model="loading" 控制上拉加载更多的 loading加载中
          :finished="finished" 控制是否加载结束
             true 不在触发加载更多了，直接显示“没有跟多了”  false 继续触发加载跟多
          finished-text="没有更多了"  设置没有数据之后的提示文本
          @load="onLoad" 上拉加载更多触发的自定义事件-->
          <van-list v-model="loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <p>{{item.name }}</p>
            <van-cell v-for="item in item.articles" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//  引入请求
import { getUserChannels } from '@/api/user'

export default {
  name: 'Home',
  data () {
    return {
      channels: [], // 频道列表
      active: '', // 频道列表索引
      list: [],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false
    }
  },
  created () {
    // 获取频道列表
    this.loadgetUserChannels()
  },
  methods: {
    // 上拉加载更多触发的自定义事件
    onLoad () {
      // 获取当前频道
      const activeChannel = this.channels[this.active]
      // 当前频道的文章列表
      const articles = activeChannel.articles
      // 1. 请求加载数据
      setTimeout(() => {
        // 2. 将数据添加到当前频道的文章列表中
        for (let i = 0; i < 10; i++) {
          articles.push(articles.length + 1)
        }
        // 3. 将 loading 设置为 false
        // 加载状态结束
        // 关闭本次的 loading 状态，它会判定当前数据是否够一屏，不够就继续自动 onLoad
        this.loading = false
        // 4. 判断如果没有数据了，将当前频道的结束状态 finished 设置为 true
        if (articles.length >= 40) {
          activeChannel.finished = true
        }
      }, 1000)
    },

    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },

    // 获取频道列表
    async loadgetUserChannels () {
      const res = await getUserChannels()
      // console.log(res)
      const channels = res.data.data.channels
      // 给每一个频道添加一个数据 用来存储频道的文章列表
      channels.forEach(element => {
        element.articles = [] // 频道的文章列表
        element.finished = false // 频道的加载结束状态
      })
      // console.log(channels)
      this.channels = channels
    }
  }
}
</script>

<style>
</style>
