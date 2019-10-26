<template>
  <div class="often-issue-two">
    <van-nav-bar title="常见问题" left-arrow @click-left="$router.go(-1)" />

    <div class="main">

        <p v-html='content'></p>

    </div>
  </div>
</template>

<script>
import { ofterWriteDetail } from "@/api";
export default {
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    const data = {
      id: this.$route.query.id
    };

    ofterWriteDetail(data).then(res => {
        console.log(res)
        if (res.code == 1) {
            this.content = res.data.content;
        }
    })

  }
};
</script>

<style lang="scss">
.often-issue-two {
  width: 100vw;
  height: 100vh;

  .main {
      margin: .4rem;
  }
}
</style>