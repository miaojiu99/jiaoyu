<template>
  <div class="big-img">
    <van-nav-bar title="形象照片"  right-text="编辑"   left-arrow @click-left="$router.go(-1)"  @click-right="img = null" />
    <van-image v-if="img" width="100vw" :src="img" />
    <div v-else class="big-img-uploader">
      <van-uploader :after-read="afterRead" />
      <p>点击编辑</p>
    </div>
  </div>
</template>

<script>
import { image, upFile, global, imagePost } from "@/api";

export default {
  data() {
    return {
      img: ""
    };
  },

  mounted() {
    const data = {
      userId: window.localStorage.getItem("userID")
    };
    image(data).then(res => {
      if (res.code == 1) {
        this.img = res.data.image;
      }
    });
    // this.img = this.$route.query.img;
  },

  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);

      var fData = new FormData();
      fData.append("file", file.file);

      upFile(fData).then(res => {
        this.img = global() + res.data;
        this.imagePostImg();
      });
    },

    imagePostImg() {
      const data = {
        userId:window.localStorage.getItem("userID"),
        image: this.img 
      }
      imagePost(data).then(res => {
        console.log(res)
      }) 
    }
  }
};
</script>

<style lang="scss">
.big-img {
  width: 100vw;
  height: 100vh;

  .big-img-uploader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
}
</style>