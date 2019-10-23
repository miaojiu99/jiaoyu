<template>
  <div class="quiz">
    <van-nav-bar
      title="提问"
      right-text="发布问题"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/quiz-issue')"
    />

    <main>
      <div class="quiz-container" v-for="(i, index) in list" :key="index" @click="$router.push({path: '/quiz-content', query: {id: i.id}})">
      <div class="quiz-container-up">
        <h3 class="quiz-container-title">{{i.title}}</h3>
        <div class="quiz-container-check">{{i.count}}个回复</div>
      </div>
        <div class="quiz-container-text" >{{i.message}}</div>
        <div class="quiz-container-wrap">
          <div class="quiz-container-time">{{i.create_time}}</div>-
          <span>{{i.name}}</span>
        </div>
      </div>
    </main>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="award" to="/quiz">提问</van-tabbar-item>
      <van-tabbar-item icon="manager" to="my">账号</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { questionList} from '@/api'
export default {
  data() {
    return {
      active: 1,
      list: '',
    };
  },
  mounted() {

    questionList().then( res => {
      console.log(res)
      if (res.code == 1) {
        this.list = res.data;
      }
    })
  }
};
</script>

<style lang="scss">
.quiz {
  width: 100vw;
  min-height: 100vh;

  main {
    margin-bottom: 10vh;
    margin-top: 12vh;
  }

  .quiz-container {
    background: #fff;
    padding: 0.4rem;
    margin-bottom: 2vw;
    font-size: 0.3rem;
    line-height: 0.6rem;
    .quiz-container-up{
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

      span{
        color:#fbb274; 
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