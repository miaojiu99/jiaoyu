<template>
  <div class="read">
    <van-nav-bar title="文章" left-arrow fixed :z-index="99" @click-left="$router.go(-1)" />
    <br />
    <br />
    <br />
    <br />

    <main>
      <h3>{{obj_data.title}}</h3>

      <p>{{obj_data.write}}</p>
    </main>
  </div>
</template>

<script>
import { writeMessage } from "@/api";

export default {
  data() {
    return {
      obj_data: ""
    };
  },
  mounted() {
    const data = {
      writeId: this.$route.query.id
    };

    writeMessage(data).then(res => {
      console.log(res);
      if (res.code == 1) {
        this.obj_data = res.data;
      }
    });
  }
};
</script>

<style lang="scss">
.read {
  width: 100vw;
  height: 100vh;

  main {
    padding: 0.4rem;
    background: #fff;
    color: #666;
    line-height: 0.8rem;
    font-size: 0.38rem;
  }

  p {
    text-indent: 0.8rem;
  }
}
</style>