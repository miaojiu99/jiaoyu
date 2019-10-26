<template>
  <div class="quiz-issue">
    <van-nav-bar
      title="发表问题"
      right-text="确认发布"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    />
    <main>
      <input class="quiz-issue-title" type="text" v-model="title" placeholder="标题最多可输入40个字符哦~" />
      <van-cell title="问题类型" @click="issueTypeShow = true" is-link :value="typeValue" />
      <textarea
        class="quiz-issue-textarea"
        v-model="message"
        placeholder="说出您的问题吧！"
        cols="30"
        rows="12"
      ></textarea>
    </main>
    <!-- 问题类型弹出 -->
    <van-popup v-model="issueTypeShow" position="bottom" :style="{ height: '30%' }">
      <van-picker
        show-toolbar
        title="标题"
        :columns="arrList"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { addQuestion, questionType, global } from "@/api";
export default {
  data() {
    return {
      title: "",
      message: "",
      typeId: '',
      typeValue: '',
      arrList: [],
      questionTypeList: '', //
      issueTypeShow: false // 问题类型弹框显隐
    };
  },

  mounted() {
    questionType().then(res => {
      if (res.code == 1) {
        for (let i of res.data) {
          this.arrList.push(i.type)
        }

        this.questionTypeList = res.data;
      }
    });
  },

  methods: {
    onChange(value) {
      console.log(value);
    },
    //点击类型取消
    onCancel() {
      this.issueTypeShow = false;
    },


    //点击类型确认
    onConfirm(value, index) {
      this.typeValue = value;
      this.typeId = this.questionTypeList[index].id;
      this.issueTypeShow = false;
    },

    onClickRight() {
      if (this.title == "") {
        this.$toast("标题不能为空");
      } else if (this.message == "") {
        this.$toast("内容不能为空");
      } else {
        const data = {
          typeId: this.typeId,
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

  main {
    margin-bottom: 10vh;
    padding: 0.4rem;
  }
  .van-cell{
    padding: 16px 0;
  }
.van-cell:not(:last-child)::after{
  left:0;
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
    height: 50vh;
    margin-top: 0.5rem;
    word-break: break-all; //解决兼容问题
  }
}
</style>