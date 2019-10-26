<template>
  <div class="service">
    <van-nav-bar title="我的客服" left-arrow @click-left="$router.go(-1)" />

    <div class="content">
      <h3>{{serviceList.title}}</h3>
      <br />
      <br />
      <p v-html="serviceList.content"></p>
    </div>
  </div>
</template>

<script>
import { service } from "@/api";
export default {
  data() {
    return {
      serviceList: ""
    };
  },
  mounted() {
    service().then(res => {
      if (res.code == 1) {
        this.serviceList = res.data;
      }
    });
  }
};
</script>

<style lang="scss">
.service {
  width: 100vw;
  height: 100vh;

  .content {
    padding: 0.4rem;

    h3 {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>