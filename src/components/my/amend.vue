<template>
  <div class="amend">
    <van-nav-bar
      right-text="完成"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    />
    <main>
      <h3>个人介绍</h3>
      <textarea class="edit" v-model="messageText" placeholder="请输入内容" cols="30" rows="12"></textarea>
    </main>
  </div>
</template>

<script>
import { messagePost, message } from "@/api";
export default {
  data() {
    return {
      messageText: ""
    };
  },

  mounted() {
    const data = {
      userId: window.localStorage.getItem('userID')
    }
    message(data).then( res => {
      this.messageText = res.data.message;
    })
  },

  methods: {
    onClickRight() {
      if (this.messageText < 20) {
        this.$toast("至少输入20字符");
      } else {
        const data = {
          userId: window.localStorage.getItem("userID"),
          message: this.messageText
        };
        messagePost(data).then(res => {
          this.$toast(res.msg);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.amend {
  width: 100vw;
  height: 100vh;
  background: #fff;
.van-nav-bar{
  padding: 0;
}
  main {
    padding: 0.4rem;
   margin-top: 8vh;
  }
  .edit {
    outline: 0;
    background: #fff;
    border-radius: 0.2rem;
    width: 100%;
    height: 70vh;
    padding: 0.3rem;
    padding-left: 0;
    box-sizing: border-box;
    border: 0;
    word-break: break-all; //解决兼容问题
  }
}
</style>