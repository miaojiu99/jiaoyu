<template>
  <div class="quiz-content">
    <van-nav-bar title="讨论详情" fixed left-arrow @click-left="$router.go(-1)" />

    <main>
      <div class="quiz-content-only">
        <div class="only-flex">
          <van-image round width="1.2rem" height="1.2rem" :src="obj_data.avatar">
            <template v-slot:error>加载失败</template>
          </van-image>
          <h3 class="only-flex-name">{{obj_data.name}}</h3>
          <span class="comm-time">{{obj_data.create_time}}</span>
        </div>
        
        <h3 class="quiz-content-h3">{{obj_data.title}}</h3>
        <div class="comm-desc">问题描述：{{obj_data.message}}</div>
      </div>
      <div class="comm-all">
        <van-cell title="全部回答" icon="comm iconfont iconquestion" />
        <div class="quiz-content-wrap" v-for="(i, index) in replyList" :key="index">
          <van-image round width="1.2rem" height="1.2rem" :src="i.avatar" />
          <div class="wrap-discern">
            <h3 class="wrap-title">{{i.name}}</h3>
            <div class="comm-time">{{i.create_time}}</div>
            <div class="comm-desc">{{i.reply}}</div>
          </div>
        </div>
      </div>
    </main>

<van-button type="info" class="quiz-content-onclick" size="large" @click="isReplyShow = true" >我要回答</van-button>

    

    <!-- 回复弹框 -->
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '50%' }">
      <div class="reply">
        <textarea class="reply-textarea" v-model="message" placeholder="请输入您的回复" cols="30" rows="9"></textarea>

        <div class="reply-btn">
          <van-button size="large" @click="isReplyShow=false">取消</van-button>
          <van-button type="primary" color="linear-gradient(to bottom, #ff8c68, #f95341)"  size="large" @click="onClickReply">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { questionMessage, global, reply } from "@/api";
export default {
  data() {
    return {
      isReplyShow: false, //回复弹框
      obj_data: "",
      message: "", // 回复内容
      replyList: "" //回复列表
    };
  },
  mounted() {
    setTimeout( () => {

      this.init();
    }, 500)
  },
  methods: {
    init() {
      const data = {
        id: this.$route.query.id
      };
      questionMessage(data).then(res => {
        if (res.code == 1) {
          const data = res.data;
          data.question.avatar = global() + data.question.avatar;
          this.obj_data = data.question;
          for (let i of data.reply) {
            i.avatar = global() + i.avatar;
          }
          this.replyList = data.reply;
        }
      });
    },

    onClickReply() {
      if (this.message == "") {
        this.$toast("回复内容不能为空");
      } else {
        const data = {
          id: this.$route.query.id,
          teacherId: window.localStorage.getItem("userID"),
          message: this.message
        };
        reply(data).then(res => {
          this.$toast(res.msg);
          if (res.code == 1) {
            this.init();
            this.isReplyShow = false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.quiz-content {
  width: 100vw;
  min-height: 100vh;
.van-nav-bar{
  padding: 0;
}
  main {
    margin-bottom: 10vh;
    margin-top: 7.4vh;
  }

  .comm-time {
    display: inline-block;
    font-size: 0.3rem;
    color: #888;
    margin-bottom: 0.2rem;
  }

  .comm-desc {
    line-height: 6vw;
    word-break: break-all;
    font-size: 0.35rem;
  }

  .quiz-content-only {
    padding: 0.4rem;
    background: #fff;
    .quiz-content-h3{
      margin-top:0.3rem;
      margin-bottom: 0.2rem;
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
  }
  .comm-all{
    margin-top: 0.3rem;
    .iconquestion {
      color: #00a6ff;
    }
  }
  .quiz-content-wrap {
    display: flex;
    padding: 0.4rem;
    background: #fff;
    // margin-bottom: 0.3rem;
    border-bottom: 1px solid #f1f1f1;

    .wrap-discern {
      flex: 1;
      margin-left: 0.3rem;
    }

    .wrap-title {
      margin: 0.15rem 0;
      font-size: 0.36rem;
    }

    .wrap-content {
      margin-top: 0.3rem;
      line-height: 0.6rem;
    }
  }

  // 点击回复
  
    .quiz-content-onclick{
    width: 100%;
    position: fixed;
    bottom: 0vh;
    z-index: 99;
      height: 36px;
      line-height: 36px;
    }

  //   回复弹框
  .reply {
    padding: 0.4rem;

    .reply-textarea {
      border: 0;
      resize: none;
      padding: 0.3rem;
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 0.2rem;
      width: 100%;
    }
    .reply-btn {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;

      .van-button {
        border-right: 0;
        border-left: 0;
        border-bottom: 0;
      }
    }
  }
}
</style>