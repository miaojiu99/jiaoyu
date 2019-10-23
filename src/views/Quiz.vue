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
      <div class="only-flex">
          <van-image round width="1rem" height="1rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <!-- <template v-slot:error>加载失败</template> -->
          </van-image>
          <h3 class="only-flex-name">昵称</h3>
          <span class="comm-time">2019-10-24</span>
        </div>
        <h3 class="quiz-content-h3">提问问题描述提问问题描述提问问题描述提问问题描述提问问题描述提问问题描述提问问题描述提问问题描述提问问题描述提问问题描述提问问题描述</h3>
        <div class="comm-desc">
          <span><van-icon name="comm iconfont iconyuedu" />556</span>
          <span><van-icon name="comm iconfont icondianzan" />556</span>

        </div>

      <!-- <div class="quiz-container-up">
        <h3 class="quiz-container-title">{{i.title}}</h3>
        <div class="quiz-container-check">{{i.count}}个回复</div>
      </div>
        <div class="quiz-container-text" >{{i.message}}</div>
        <div class="quiz-container-wrap">
          <div class="quiz-container-time">{{i.create_time}}</div>-
          <span>{{i.name}}</span>
        </div> -->
      </div>
    </main>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="award" to="/quiz">学堂</van-tabbar-item>
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
h3{font-weight: normal;}
  main {
    margin-bottom: 10vh;
    margin-top: 12vh;
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
    
    span{
      font-size: 0.34rem;
      i{margin-right: 0.2rem;}
    }
    span:last-of-type{
      float: right;
    }
  }
 
  .quiz-container {
    background: #fff;
    margin: 3vw;
    border-radius: 0.2rem;
    overflow: hidden;
    padding:0.4rem 0.3rem 0.3rem;
    margin-bottom: 2vw;
    font-size: 0.3rem;
    line-height: 0.6rem;

    .quiz-content-h3{
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