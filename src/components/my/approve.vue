<template>
  <div class="approve">
    <van-nav-bar title="实名认证" left-arrow @click-left="$router.go(-1)" />

    

    <div class="content" v-if="real== 2">
      <van-cell title="审核状态" :value="obj_data.txt" />
      <van-cell title="姓名" :value="obj_data.realName" />
      <van-cell title="身份证号" :value="obj_data.card" />
      <van-cell title="身份证正面">
        <van-image width="2rem" :src="obj_data.cardOne" />
      </van-cell>
      <van-cell title="身份证反面">
        <van-image width="2rem" :src="obj_data.cardTwo" />
      </van-cell>
      <br />
      <van-button type="primary" size="large" @click="real = 0">重新编辑</van-button>
    </div>

    <div class="content" v-else>
      <van-field v-model="userName" placeholder="请输入真实姓名" />

      <van-field v-model="userCard" placeholder="请输入身份证号" />

      <div class="images">
        <br />
        <van-uploader :after-read="afterRead">
          <van-image v-if="userImage" fit="cover" width="80vw" :src="userImage" />
        </van-uploader>
        <br />

        <van-uploader :after-read="afterReadBack">
          <van-image v-if="userImageBack" fit="cover" width="80vw" :src="userImage" />
        </van-uploader>
      </div>

      <br />

      <van-button type="primary" size="large" @click="onClickApply">申请</van-button>
    </div>
  </div>
</template>

<script>
import { upFile, global, realPost, realName } from "@/api";

export default {
  data() {
    return {
      real: "", //判断状态
      obj_data: "",
      userName: "", // 用户姓名
      userCard: "", //用户身份证号
      userImage: "", // 身份证正面
      userImageBack: "" // 身份证反面
    };
  },

  mounted() {
    this.real = this.$route.query.real;

    this.init();
  },

  methods: {
    init() {
      const data = {
        userId: window.localStorage.getItem("userID")
      };
      realName(data).then(res => {
        if (res.code == 1) {
          this.obj_data = res.data;
          if (this.real == 1) {
            this.obj_data.text = "待审核";
          }
          if (this.real == 2) {
            this.obj_data.text = "通过";
          }
          if (this.real == 3) {
            this.obj_data.text = "拒绝";
          }
        }
      });
    },

    afterRead(file) {
      var fData = new FormData();
      fData.append("file", file.file);

      upFile(fData).then(res => {
        this.userImage = global() + res.data;
      });
    },

    afterReadBack(file) {
      var fData = new FormData();
      fData.append("file", file.file);

      upFile(fData).then(res => {
        this.userImageBack = global() + res.data;
      });
    },

    // 点击申请
    onClickApply() {
      const data = {
        userId: window.localStorage.getItem("userID"),
        card: this.userCard,
        realName: this.userName,
        cardOne: this.userImage,
        cardTwo: this.userImageBack
      };

      if (this.userName == "") {
        this.$toast("请输入姓名");
      } else if (this.userCard == "") {
        this.$toast("请输入身份证号");
      } else if (this.userImage == "") {
        this.$toast("请输入正面身份证图片");
      } else if (this.userImageBack == "") {
        this.$toast("请输入反面身份证图片");
      } else {
        realPost(data).then(res => {
          this.$toast(res.msg);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.approve {
  width: 100vw;
  height: 100vh;

  .content {
    padding: 0.4rem;
  }

  .images {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .van-uploader__upload,
  .van-uploader {
    width: 80vw;
    height: 40vw;
    overflow: hidden;
  }
}
</style>