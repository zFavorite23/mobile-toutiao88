<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 内容列表 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
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
      active: '',
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
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
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
      this.channels = res.data.data.channels
    }
  }
}
</script>

<style>
</style>
