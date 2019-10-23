<template>
  <div class="bank">
    <van-nav-bar title="修改银行卡" left-arrow fixed @click-left="$router.go(-1)" />

    <main>
      <van-field v-model="username" label="持卡人" placeholder="请输入持卡人" />
      <van-field v-model="opening" label="开户行" placeholder="请输入开户行" />
      <van-field v-model="bank" label="银行卡号" placeholder="请输入银行卡号" />
<div style="text-align: center">
<van-button type="info" size="large" @click="onClickRight" color="linear-gradient(to bottom, #ff8c68, #f95341)">完成</van-button>
</div>
      
    </main>
  </div>
</template>

<script>
import { bankPost } from "@/api";

export default {
  data() {
    return {
      username: "",
      opening: "",
      bank: "",
      userID: ""
    };
  },

  mounted() {
    this.userID = window.localStorage.getItem("userID");
  },

  methods: {
    onClickRight() {
      if (this.username == "") {
        this.$toast("请输入持卡人");
      } else if (this.opening == "") {
        this.$toast("请输入开户行");
      } else if (this.bank == "") {
        this.$toast("请输入银行卡号");
      } else {
        const data = {
          userId: this.userID,
          banking: this.opening,
          banker: this.username,
          bank: this.bank
        };
        bankPost(data).then(res => {
          console.log(res);
          if (res.code == 1) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
          this.$toast(res.msg);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.bank {
  width: 100vw;
  height: 100vh;

main{
  
   margin-top: 12vh;
}
  .van-cell {
    padding: 0.4rem;
    margin-bottom: 0.3rem;
  }
  .van-button--info{
    width: 90%;
    margin:1rem auto;
    
  }
}
</style>