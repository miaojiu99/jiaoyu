<template>
  <div class="login">
    <div class="level-center">
      <img src="~@/assets/images/logo.png" alt />
    </div>
    <br />

    <van-cell-group>
      <van-field left-icon="comm iconfont iconyiliaohangyedeICON-"  class="theme-padding"  placeholder="请输入手机号" v-model="userPhone"></van-field>
      <van-field left-icon="comm iconfont iconsuo" class="theme-padding" v-model="password" type="password" placeholder="请输入密码"></van-field>
    </van-cell-group>
    <br />

    <van-button  size="large" color="linear-gradient(to bottom, #ff8c68, #f95341)" type="info" @click="SubmitButton">登录</van-button>

    <div class="login-fun">
      <div class="left" @click="$router.push('/login/forget')">忘记密码?</div>
    </div>
    <van-button  type="info" class="login-bottom" @click="$router.push('/login/register')" color="#f95341" plain>注册</van-button>
    
  </div>
</template>

<script>
import { login } from "@/api";
import { phoneFormat } from "@/utils";

export default {
  data() {
    return {
      userPhone: "",
      password: "",
      isDisable: false // 取消多次点击
    };
  },
  mounted() {
    if (window.localStorage.getItem("userphone")) {
      this.userPhone = window.localStorage.getItem("userphone");
    }
  },

  methods: {
    SubmitButton() {
      if (this.userphone == "") {
        this.$toast("请输入手机号");
      } else if (!phoneFormat(this.userPhone)) {
        this.$toast("手机号格式不正确");
      } else if (this.password == "") {
        this.$toast("请输入密码");
      } else {
        const data = {
          phone: this.userPhone,
          password: this.password
        };
        login(data).then(res => {
          if (res.code == 1) {
            var phone = this.userPhone;
            window.localStorage.setItem("userphone", phone);
            window.localStorage.setItem("userID", res.data.id);
            this.$router.push("/");
            setTimeout(() => {
              this.$router.push("/");
            }, 50);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  box-sizing: border-box;
  padding-top: 2rem;
  padding: 0 0.4rem;
  // background: #fff;

  /* 水平居中 */
  .level-center {
    margin: 0 auto;
    text-align: center;
    width: fit-content;

    img {
      width: 30vw;
      height: 30vw;
    }
  }

  .theme-padding {
    padding: 0.4rem;
  }
  .van-cell-group{
    background: none;
    border: 0;
  }
  .van-cell{
    border-radius: 5rem;
    margin-bottom: 0.4rem;
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border-width:0;
  }
  .van-cell:not(:last-child)::after{
    border: 0;
  }
  .login-fun {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 0.36rem;
    margin-top: 0.3rem;
  }

  .icon {
    width: 2rem;
    height: 2rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .login-bottom{
    position: relative;
    text-align: center;
    bottom: -50vw;
    left:50%;
    margin: auto;
    z-index: 99;
    transform: translateX(-50%)
  }
  .van-button--normal{
    padding: 0 30px;
  }
}
</style>