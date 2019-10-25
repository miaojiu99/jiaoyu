<template>
  <div class="quiz">
    <van-nav-bar
      :title="title"
      right-text="发布问题"
      @click-left="$router.go(-1)"
      @click-right="$router.push('/quiz-issue')"
    />

    <div class="main" v-show="isTagShow != 2">
      <div
        class="quiz-container"
        v-for="(i, index) in list"
        :key="index"
        @click="$router.push({path: '/quiz-content', query: {id: i.id}})"
      >
        <div class="only-flex">
          <van-image round width="1rem" height="1rem" :src="i.avatar" />
          <h3 class="only-flex-name">{{i.name}}</h3>
          <span class="comm-time">{{i.create_time}}</span>
        </div>
        <h3 class="quiz-content-h3">{{i.message}}</h3>
        <div class="comm-desc">
          <span>
            <van-icon name="comm iconfont iconyuedu" />556
          </span>
          <span>
            <van-icon name="comm iconfont icondianzan" />556
          </span>
        </div>
      </div>
    </div>

    <div class="main" v-show="isTagShow == 2">
      <div
        class="quiz-container"
        v-for="(i, index) in list"
        :key="index"
        @click="$router.push({path: '/quiz-content', query: {id: i.id}})"
      >
        <div class="only-flex">
          <h3 class="only-flex-name">{{i.title}}</h3>
          <span class="comm-time">{{i.create_time}}</span>
        </div>
        <p class="quiz-content-h3">我的回答：{{i.reply}}</p>
        <div class="comm-desc">
          <span>
            <van-icon name="comm iconfont iconyuedu" />556
          </span>
          <span>
            <van-icon name="comm iconfont icondianzan" />556
          </span>
        </div>
      </div>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="graphic" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="award" to="/quiz">提问</van-tabbar-item>
      <van-tabbar-item icon="manager" to="my">账号</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { questionList, myQuestion, myAnswer, global } from "@/api";
export default {
  data() {
    return {
      title: "学堂",
      active: 2,
      list: "",
      isTagShow: ""
    };
  },
  mounted() {
    let isTag = this.$route.query.id;
    this.isTagShow = isTag;
    const data = {
      userId: window.localStorage.getItem("userID")
    };

    if (isTag == 1) {
      this.title = "我的提问";
      myQuestion(data).then(res => {
        if (res.code == 1) {
          this.list = res.data;
          for (let i of this.list) {
            i.avatar = global() + i.avatar;
          }
        }
      });
    } else if (isTag == 2) {
      this.title = "我的回答";
      myAnswer(data).then(res => {
        if (res.code == 1) {
          this.list = res.data;
          for (let i of this.list) {
            i.avatar = global() + i.avatar;
          }
        }
      });
    } else {
      questionList().then(res => {
        if (res.code == 1) {
          this.list = res.data;
          for (let i of this.list) {
            i.avatar = global() + i.avatar;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.quiz {
  width: 100vw;
  h3 {
    font-weight: normal;
  }
  .main {
    margin-bottom: 10vh;
  }
  .comm-time {
    display: inline-block;
    font-size: 0.3rem;
    color: #888;
    margin-bottom: 0.2rem;
  }

  .comm-desc {
    margin-top: 4vw;
    word-break: break-all;
    font-size: 0.35rem;

    span {
      font-size: 0.34rem;
      i {
        margin-right: 0.2rem;
      }
    }
    span:last-of-type {
      float: right;
    }
  }

  .quiz-container {
    background: #fff;
    margin: 3vw;
    border-radius: 0.2rem;
    overflow: hidden;
    padding: 0.4rem 0.3rem 0.3rem;
    margin-bottom: 2vw;
    font-size: 0.3rem;
    line-height: 0.6rem;

    .quiz-content-h3 {
      font-size: 0.42rem;
      margin: 0.2rem 0;
      line-height: 0.76rem;
      // letter-spacing: 1px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .only-flex {
      display: flex;
      align-items: center;
    }

    .van-image__error {
      font-size: 0.3rem;
    }

    .only-flex-name {
      flex: 1;
      font-size: 0.4rem;
      margin-left: 0.3rem;
    }
    .quiz-container-up {
      height: 4vh;
    }
    .quiz-container-title {
      width: 70vw;
      color: #000;
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .quiz-container-check {
      font-size: 0.3rem;
      color: #888;
      width: 20vw;
      float: right;
      text-align: right;
    }

    .quiz-container-text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .quiz-container-wrap {
      display: flex;

      span {
        color: #fbb274;
      }
    }

    .quiz-container-time {
      color: #ccc;
      margin-top: 0.1rem;
      margin-right: 0.2rem;
    }
  }
}
</style>