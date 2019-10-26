<template>
  <div class="often-issue">
    <van-nav-bar title="常见问题" left-arrow @click-left="$router.go(-1)" />

    <div class="main">
      <van-cell :title="i.title" is-link v-for="i in writeList" :key="i.id" @click="$router.push({path: '/often-issue-two', query: {id: i.id}})" />
    </div>
  </div>
</template>

<script>
import { ofterWrite } from "@/api";
export default {
  data() {
    return {
      writeList: ""
    };
  },

  mounted() {
    ofterWrite().then(res => {
      console.log(res);
      if (res.code == 1) {
        this.writeList = res.data;
        console.log(this.writeList);
      }
    });
  }
};
</script>

<style lang="scss">
.often-issue {
  width: 100vw;
  height: 100vh;
}
</style>