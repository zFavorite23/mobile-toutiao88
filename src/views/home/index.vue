<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <van-button
        class="search-button"
        slot="title"
        round
        type="info"
        size="mini"
        @click="$router.push('/search')"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 内容列表 -->
          <!-- v-model="loading" 控制上拉加载更多的 loading加载中
          :finished="finished" 控制是否加载结束
             true 不在触发加载更多了，直接显示“没有跟多了”  false 继续触发加载跟多
          finished-text="没有更多了"  设置没有数据之后的提示文本
          @load="onLoad" 上拉加载更多触发的自定义事件-->
          <van-list
            v-model="loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
              @click="$router.push({
                name: 'article',
                params:{
                    articleId:article.art_id
                }
              })"
            >
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="index">
                    <van-image height="80" :src="img" lazy-load />
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <span>{{ article.aut_name }}</span>
                  <span>{{ article.comm_count }}评论</span>
                  <span>{{ article.pubdate | relativeTime }}</span>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-icon slot="nav-right" name="wap-nav" class="icon" @click="isChannelsShow = true " />
    </van-tabs>

    <!-- 频道弹窗 -->
    <van-popup
      v-model="isChannelsShow"
      closeable
      close-icon-position="top-right"
      round
      position="bottom"
      :style="{ height: '95%' }"
      @open="onChannelOpen"
    >
      <div class="channel-container">
        <van-cell title="我的频道" :border="false">
          <van-button
            type="danger"
            size="mini"
            @click="isEditShow = !isEditShow"
          >{{ isEditShow ? '完成' : '编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(channel,index) in channels"
            :key="channel.id"
            :text="channel.name"
            @click="onChannelActiveOrDelete(channel, index)"
          >
            <van-icon
              slot="icon"
              name="close"
              size="15"
              v-show="isEditShow && channel.name != '推荐' "
            />
          </van-grid-item>
        </van-grid>

        <van-cell title="推荐频道" :border="false" />
        <van-grid :gutter="10">
          <van-grid-item
            v-for="channel in recommendChannels"
            :key="channel.id"
            :text="channel.name"
            @click="onChannelAll(channel)"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
//  引入请求
import { getUserChannels } from '@/api/user'
import { getArticles } from '@/api/article'
import { getAllChannels } from '@/api/channels'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'Home',
  data () {
    return {
      channels: [], // 频道列表
      active: '', // 频道列表索引
      loading: false, // 加载更多
      isLoading: false, // 下拉刷新
      isChannelsShow: false, // 控制弹显示
      AllChannels: [], // 所有频道
      isEditShow: false // 删除频道叉叉的显示
    }
  },
  created () {
    // 获取频道列表
    this.loadgetUserChannels()
  },
  watch: {
    // 频道列表存入到本地
    channels () {
      setItem('channels', this.channels)
    }
  },
  computed: {
    // 除去我的频道 剩下的推荐频道
    recommendChannels () {
      const arr = []
      // 遍历所有频道
      this.AllChannels.forEach(channel => {
        const ret = this.channels.find(item => {
          // 如果有这个id则在这个频道中
          return item.id === channel.id
        })
        // 如果不包含 则添加到我的频道中
        if (!ret) {
          arr.push(channel)
        }
      })
      return arr
    }
  },
  methods: {
    // 获取当前频道下的文章列表
    async onLoad () {
      // 获取当前频道
      const activeChannel = this.channels[this.active]
      // 当前频道的文章列表
      const articles = activeChannel.articles
      // console.log(articles)
      // 1. 请求加载数据
      const res = await getArticles({
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
      const res = await getArticles({
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
      let channels = []
      // 获取本地数据
      const loadChannels = getItem('channels')
      // 如果有本地数据则使用本地数据
      if (loadChannels) {
        channels = loadChannels
      } else {
        // 没有数据则获取线上数据
        const res = await getUserChannels()
        // console.log(res)
        const onLinechannels = res.data.data.channels
        // 给每一个频道添加一个数据 用来存储频道的文章列表
        onLinechannels.forEach(element => {
          element.articles = [] // 频道的文章列表
          element.finished = false // 频道的加载结束状态
          element.timestamp = null // 用于获取频道下一页数据的时间戳
        })
        channels = onLinechannels
      }

      // console.log(channels)
      this.channels = channels
    },

    // 打开弹窗 获取所有频道
    async onChannelOpen () {
      const res = await getAllChannels()
      res.data.data.channels.forEach(element => {
        element.articles = [] // 频道的文章列表
        element.finished = false // 频道的加载结束状态
        element.timestamp = null // 用于获取频道下一页数据的时间戳
      })
      this.AllChannels = res.data.data.channels
    },

    // 添加到我的频道
    onChannelAll (channel) {
      this.channels.push(channel)
    },

    // 切换频道和删除频道
    onChannelActiveOrDelete (channel, index) {
      if (this.isEditShow && channel.name !== '推荐') {
        // 如果是编辑状态切频道不为 推荐 则删除
        this.channels.splice(index, 1)
      } else {
        // 不是编辑状态则切换到该频道
        this.active = index
        this.isChannelsShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .article-info span {
    margin-right: 10px;
  }

  .van-tabs {
    // 频道列表
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      right: 0;
      z-index: 2;
    }
    // 文章列表
    /deep/ .van-tabs__content {
      margin-top: 90px;
    }
    // 列表图标
    /deep/ .van-tabs__nav {
      .icon {
        position: sticky;
        right: 0;
        display: flex;
        align-items: center;
        background-color: #fff;
        opacity: 0.8;
      }
    }
  }
  /deep/ .channel-container {
    margin-top: 30px;
  }
  // 删除频道的叉叉
  /deep/ .van-grid-item__icon-wrapper {
    position: absolute;
    top: -12px;
    right: -7px;
  }
  // 搜索框
  .search-button {
    width: 100%;
    background-color: #5babfb;
  }
}
</style>
