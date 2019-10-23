<template>
  <div class="article">
    <van-nav-bar
      title="写文章"
      right-text="完成"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    />
    <main>
      <input class="article-title" v-model="title" type="text" placeholder="请填写文章标题" />
   
      <textarea class="edit" v-model="context" placeholder="请输入内容" cols="30" rows="12"></textarea>
    </main>
  </div>
</template>

<script>
import { addWrite } from "@/api";

export default {
  data() {
    return {
      title: "",
      context: "",
      clear: '',
    };
  },

  methods: {
    onClickRight() {
      if (this.title == "") {
        this.$toast("请填写标题");
      } else if (this.context == "") {
        this.$toast("请输入内容");
      } else if (this.context.length < 20) {
        this.$toast("填写长度不能小于20");
      } else {
        const data = {
          uesrId: window.localStorage.getItem("userID"),
          title: this.title,
          write: this.context
        };
        addWrite(data).then(res => {
          console.log(res);
          if (res.code == 1) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
          this.$toast(res.msg);
        });
      }
    },
  }
};
</script>

<style lang="scss">
.article {
  width: 100vw;
  height: 100vh;
  background: #fff;

  main {
    padding: 0.4rem;
  }

  .article-title {
    outline: 0;
    display: block;
    width: 100%;
    border: 0;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #f1f1f1;
  }

  .edit {
    outline: 0;
    background: #fff;
    border-radius: 0.2rem;
    width: 100%;
    overflow: hidden;
    padding: 0.3rem;
    padding-left: 0;
    box-sizing: border-box;
    border: 0;
    overflow-y: auto;
    height: 70vh;
    word-break: break-all; //解决兼容问题
  }
}
</style>