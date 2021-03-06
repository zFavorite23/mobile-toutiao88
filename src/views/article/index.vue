<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading v-if="loading" class="article-loading" />
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate}}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="onFollow"
        >{{ article.is_followed ? '取消关注' : '+ 关注' }}</van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button
          round
          size="small"
          hairline
          type="primary"
          plain
          icon="good-job-o"
          @click="onLike"
        >{{ article.attitude === 1 ? '取消点赞' : '点赞' }}</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          type="danger"
          plain
          icon="delete"
          @click="onDislike"
        >{{ article.attitude === 0 ? '喜欢' : '不喜欢' }}</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>
        网络超时，点击
        <a href="#" @click.prevent="loadArticle">刷新</a> 试一试。
      </p>
    </div>
    <!-- /加载失败的消息提示 -->

    <!-- 评论列表 -->
    <ArticleComment />
  </div>
</template>

<script>
// 引入请求
import {
  getArticle,
  addLike,
  deleteLike,
  addDislike,
  deleteDislike
} from '@/api/article'
import { followUser, unFollowUser } from '@/api/user'
import ArticleComment from './components/article-comment'

export default {
  name: 'ArticleIndex',
  components: {
    ArticleComment
  },
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      // 文章详情

      article: {}
    }
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    // 获取文章详细列表
    async loadArticle () {
      // 开启转圈圈
      this.loading = true
      try {
        //   const id = this.$router.params.articleId
        const res = await getArticle(this.articleId)
        // console.log(this.articleId)
        //   console.log(res)
        this.article = res.data.data
      } catch (err) {
        console.log(err)
      }
      // 关闭转圈圈
      this.loading = false
    },

    // 关注用户
    async onFollow () {
      // 用户id
      const userId = this.article.aut_id
      if (this.article.is_followed) {
        // 如果关注了 取消换关注
        await unFollowUser(userId)
      } else {
        // 如果没有关注 则关注用户
        await followUser(userId)
      }
      // 更新视图
      this.article.is_followed = !this.article.is_followed
    },

    // 用户点赞
    async onLike () {
      if (this.article.attitude === 1) {
        // 取消点赞
        await deleteLike(this.articleId)
        // 更新视图
        this.article.attitude = -1
      } else {
        // 点赞
        await addLike(this.articleId)
        // 更新视图
        this.article.attitude = 1
      }
    },

    // 喜欢文章
    async onDislike () {
      if (this.article.attitude === 0) {
        // 对文章不喜欢
        await deleteDislike(this.articleId)
        // 更新视图
        this.article.attitude = -1
      } else {
        // 对文章喜欢
        await addDislike(this.articleId)
        // 更新视图
        this.article.attitude = 0
      }
    }
  }
}
</script>

<style scoped lang='less'>
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error {
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan {
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
