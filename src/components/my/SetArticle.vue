<template>
  <div class="set-article">
    <van-nav-bar
      title="修改文章"
      right-text="修改"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
      @click-right="setWrite"
    />
    <br />
    <br />
    <br />
    <br />
    <br />
    <main>
      <h3>文章标题</h3>
      <input class="article-title" v-model="title" type="text" placeholder="请填写文章标题" />
      <br />
      <textarea class="edit" v-model="context" placeholder="请输入内容" cols="30" rows="12"></textarea>
    </main>
  </div>
</template>

<script>
import { writeMessage, upWrite } from "@/api";
export default {
  data() {
    return {
      title: "",
      context: ""
    };
  },

  mounted() {
    setTimeout(() => {
      const data = {
        writeId: this.$route.query.id
      };

      writeMessage(data).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.title = res.data.title;
          this.context = res.data.write;
        }
      });
    }, 300);
  },

  methods: {
    setWrite() {
      const data = {
        id: this.$route.query.id,
        title: this.title,
        write: this.context
      };
      upWrite(data).then(res => {
        this.$toast(res.msg);
      });
    }
  }
};
</script>

<style lang="scss">
.set-article {
  width: 100vw;
  min-height: 100vh;
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
    border-bottom: 1px solid #0af;
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