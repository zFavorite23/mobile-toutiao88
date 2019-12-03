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
          <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in item.articles"
              :key="item.aut_id.toString()"
              :title="item.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//  引入请求
import { getUserChannels } from '@/api/user'
import { getArticle } from '@/api/article'

export default {
  name: 'Home',
  data () {
    return {
      channels: [], // 频道列表
      active: '', // 频道列表索引
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
    // 获取当前频道下的文章列表
    async onLoad () {
      // 获取当前频道
      const activeChannel = this.channels[this.active]
      // 当前频道的文章列表
      const articles = activeChannel.articles
      // 1. 请求加载数据
      const res = await getArticle({
        channel_id: activeChannel.id, // 频道 id
        // 获取下一页数据的时间戳，Date.now() 表示获取当前最新数据
        timestamp: activeChannel.timestamp || Date.now(),
        with_top: 1 // 是否置顶
      })
      // console.log(res)

      // 2. 将数据添加到当前频道的文章列表中
      // ...数组，数组的展开操作符，它会把数组元素一个一个的拿出来，传递给使用的位置
      articles.push(...res.data.data.results)

      // 3. 将 loading 设置为 false
      // 加载状态结束
      // 关闭本次的 loading 状态，它会判定当前数据是否够一屏，不够就继续自动 onLoad
      this.loading = false

      // 4. 判断还有下一页数据，则更新获取下一个数据的时间戳
      //    如果没有了，则将 finished 设置为 true，不再加载更多了
      const preTimestamp = res.data.data.pre_timestamp
      if (preTimestamp) {
        // 更新获取下一页数据的时间戳
        activeChannel.timestamp = preTimestamp
      } else {
        activeChannel.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      // 获取当前频道
      const activeChannel = this.channels[this.active]
      // 1.请求获取最新数据
      const res = await getArticle({
        channel_id: activeChannel.id,
        timestamp: Date.now(), // 获取最新时间戳即可
        with_top: 1
      })
      // 2.把最新数据放到最顶部
      const newArticles = res.data.data.results
      activeChannel.articles.unshift(...newArticles)
      // 3.停止下拉刷新
      this.isLoading = false
      // 4.提示用户刷新成功
      const message = newArticles.length
        ? `更新${newArticles.length}条数据`
        : '暂无数据更新'
      this.$toast(message)
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
        element.timestamp = null // 用于获取频道下一页数据的时间戳
      })
      // console.log(channels)
      this.channels = channels
    }
  }
}
</script>

<style>
</style>
