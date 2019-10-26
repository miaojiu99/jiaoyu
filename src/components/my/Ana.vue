<template>
  <div class="ana">
    <van-nav-bar
      title="个人理念"
      right-text="修改"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClicktitlePost"
    />

    <div class="main">
      <van-field v-model="value" placeholder="请输入你的个人名言" />
    </div>
  </div>
</template>

<script>
import { titleIndex, titlePost } from "@/api";

export default {
  data() {
    return {
      value: ""
    };
  },

  mounted() {
    const data = {
      userId: window.localStorage.getItem("userID")
    };
    titleIndex(data).then(res => {
      this.value = res.data.title;
    });
  },



  methods: {
    onClicktitlePost() {
      const data = {
        userId: window.localStorage.getItem("userID"),
        title: this.value
      };
      titlePost(data).then(res => {
        this.$toast(res.msg);
      });
    }
  }
};
</script>

<style lang="scss">
.ana {
  width: 100vw;
  height: 100vh;

  .main {
    padding: 0.4rem;
  }
}
</style>