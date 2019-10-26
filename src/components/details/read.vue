<template>
  <div class="read">
    <van-nav-bar title="文章" left-arrow fixed :z-index="99" @click-left="$router.go(-1)" />
    <br />
    <br />
    <br />
    <br />
    <div class="main" v-if="id == 1">
      <p v-html="obj_data.content"></p>
    </div>
    <div class="main" v-else>
      <h3>{{obj_data.title}}</h3>

      <p>{{obj_data.write}}</p>
    </div>
  </div>
</template>

<script>
import { writeMessage, ofterWriteDetail, global } from "@/api";

export default {
  data() {
    return {
      obj_data: "",
      id: '',
    };
  },
  mounted() {
    const data = {
      writeId: this.$route.query.id
    };

    this.id = this.$route.query.is

    if (this.id == 1) {
      const data = {
        id: this.$route.query.id
      };
      ofterWriteDetail(data).then(res => {
        console.log(res);

        if (res.code == 1) {
          if (res.data) {
            this.obj_data = res.data;
            this.obj_data.image = global() + res.data.image;
            this.obj_data.title = "";
          }
        }
      });
    } else {
      writeMessage(data).then(res => {
        if (res.code == 1) {
          this.obj_data = res.data;
          console.log(this.obj_data);
        }
      });
    }
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