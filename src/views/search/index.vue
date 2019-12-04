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
      <div slot="action" @click="onSearch(searchText)">搜索</div>
    </van-search>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell
        :title="item"
        :key="item"
        icon="search"
        v-for="item in suggestions"
        @click="onSearch(item)"
      >
        <!-- 我们要把 item 处理成带有高亮的字符串 -->
        <!-- 过滤器：专门用于文本格式化，但是它只能用在 {{}} 和 v-bind 中 -->
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
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
    // 搜索处理函数
    onSearch (q) {
      this.$router.push(`/search/${q}`)
    },

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
    },

    // 搜索高亮
    highlight (str) {
      // /this.searchText/  注意：/这里的一切都是字符串/
      // 如果想要动态的创建一个正则表达式，使用 new RegExp 手动构造
      // 它会根据字符串创建一个正则表达式对象
      // 参数2：用来指定匹配模式，例如 g 全局，i 忽略大小写
      // /dsadsa/gi
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(
        reg,
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style>
</style>
