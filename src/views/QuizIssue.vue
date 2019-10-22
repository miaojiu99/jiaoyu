<template>
  <div class="quiz-issue">
    <van-nav-bar
      title="发表问题"
      right-text="确认发布"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    />
    <main>
      <input class="quiz-issue-title" type="text" v-model="title" placeholder="标题最多可输入40个字符哦~" />
      <textarea
        class="quiz-issue-textarea"
        v-model="message"
        placeholder="说出您的问题吧！"
        cols="30"
        rows="12"
      ></textarea>
    </main>
  </div>
</template>

<script>
import { addQuestion } from "@/api";
export default {
  data() {
    return {
      title: "",
      message: ""
    };
  },

  methods: {
    onClickRight() {
      if (this.title == "") {
        this.$toast("标题不能为空");
      } else if (this.message == "") {
        this.$toast("内容不能为空");
      } else {
        const data = {
          userId: window.localStorage.getItem("userID"),
          title: this.title,
          message: this.message
        };

        addQuestion(data).then(res => {
          this.$toast(res.msg);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.quiz-issue {
  width: 100vw;
  height: 100vh;
  background: #fff;
  .van-nav-bar{
  padding: 0;
}
  main {
    margin-bottom: 10vh;
    margin-top: 7vh;
    padding: 0.4rem;
  }

  .quiz-issue-title {
    outline: 0;
    display: block;
    margin: 0.4rem 0;
    width: 100%;
    border: 0;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #f1f1f1;
  }

  .quiz-issue-textarea {
    outline: 0;
    resize: none;
    border-radius: 0.2rem;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border: 0;
    overflow-y: auto;
    height: 70vh;
    word-break: break-all; //解决兼容问题
  }
}
</style>