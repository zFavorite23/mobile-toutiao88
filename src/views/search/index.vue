<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
      @input="onSearchInput"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell :title="item" :key="item" icon="search" v-for="item in suggestions" />
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <span>全部删除</span>&nbsp;&nbsp;
        <span>完成</span>
        <van-icon name="delete" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
// 引入请求
import { getSuggestions } from '@/api/search'

export default {
  name: 'search',
  data () {
    return {
      searchText: '', // 搜索框输出内容
      suggestions: [] // 搜索联想建议数据列表
    }
  },
  methods: {
    onSearch () {},

    // 搜索联想
    async onSearchInput () {
      // 判断输入框是否有数据
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const res = await getSuggestions(this.searchText)
      //   console.log(res)
      this.suggestions = res.data.data.options
    }
  }
}
</script>

<style>
</style>
