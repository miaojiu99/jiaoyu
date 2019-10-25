<template>
  <div class="register">
    <div class="theme-padding">
      <van-icon name="arrow-left" size="1.5em" @click="$router.go(-1)"></van-icon>

      <main>
        <van-cell-group style="margin-top: 2rem;">
          <van-field
            left-icon="comm iconfont iconyiliaohangyedeICON-"
            v-model="userphone"
            placeholder="手机号"
          ></van-field>

          <van-field
            center
            left-icon="comm iconfont iconyiliaohangyedeICON-"
            v-model="code"
            :disabled="isCode"
            placeholder="验证码"
          >
            <van-button
              :disabled="isCode"
              @click="onCode"
              slot="button"
              type="info"
              size="small"
              color="#ff8a67"
            >{{ codeText }}</van-button>
          </van-field>

          <van-field
            type="password"
            v-model="password"
            left-icon="comm iconfont iconsuo"
            placeholder="新密码"
          ></van-field>
          <van-field
            type="password"
            v-model="confpassword"
            left-icon="comm iconfont iconsuo"
            placeholder="确认密码"
          ></van-field>
        </van-cell-group>
        <br />
        <br />
        <van-button
          @click="onSubmit"
          size="large"
          color="linear-gradient(to bottom, #ff8c68, #f95341)"
        >完成</van-button>
        <!-- <van-button @click="onSubmit" size="large">完成</van-button> -->
      </main>
    </div>
  </div>
</template>

<script>
import { forget, send } from "@/api";
import { phoneFormat } from "@/utils";

export default {
  data() {
    return {
      userphone: "", // 手机号

      code: "", // 验证码

      password: "", // 密码

      confpassword: "", //确认密码

      isCode: true, // 验证码是否可以点击

      codeText: "获取验证码",

      timeCode: 60, // 验证码时间

      is: true, // 用is进行图标判断

      isDisable: false, // 解决按钮多次提交

      uuid: "",

      type: "password", // type 切换input类型

      eye: "eye" // 切换图标颜色,
    };
  },

  methods: {
    onSubmit() {
      const data = {
        phone: this.userphone,
        password: this.password,
        code: this.code
      };

      if (this.userphone == "") {
        this.$toast("请输入手机号");
      } else if (!phoneFormat(this.userphone)) {
        this.$toast("手机号不正确");
      } else if (this.code == "") {
        this.$toast("请输入验证码");
      } else if (this.password == "") {
        this.$toast("请输入密码");
      } else if (this.confpassword == "") {
        this.$toast("请输入确认密码");
      } else if (this.confpassword !== this.password) {
        this.$toast("两次密码不一致");
      } else {
        forget(data).then(res => {
          console.log(res);
          if (res.code == 1) {
            window.localStorage.setItem("userphone", this.userphone);
            this.$router.go(-1);
          } else {
            this.$toast(res.msg);
          }
        });
      }
    },

    // 开始倒计时
    begin() {
      const timer = setInterval(() => {
        this.timeCode--;
        this.codeText = "已发送(" + this.timeCode + "s)";

        if (this.timeCode == 0) {
          clearInterval(timer);
          this.isCode = false;
          this.timeCode = 60;
          this.codeText = "重新获取";
        }
      }, 1000);
    },

    onCode() {
      const data = {
        phone: this.userphone
      };
      send(data).then(res => {
        if (res.code == 1) {
          this.begin();
          this.$toast("提示内容");
        } else {
          this.$toast(res.msg);
        }
      });
    }
  },

  watch: {
    userphone(value) {
      if (phoneFormat(this.userphone)) {
        this.isCode = false;
      } else {
        this.isCode = true;
      }
    }
  }
};
</script>


<style lang="scss">
.register {
  width: 100vw;
  height: 100vh;

  .van-icon-arrow-left {
    margin-top: 3vw;
    margin-left: 0.4rem;
    color: #f9513e;
  }

  main {
    padding: 0.4rem;
  }
  .van-cell-group {
    background: none;
    border: 0;
  }
  .van-cell {
    border-radius: 5rem;
    margin-bottom: 0.4rem;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
  .van-cell:not(:last-child)::after {
    border: 0;
  }
}
</style>

