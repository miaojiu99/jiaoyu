<template>
  <div class="deposit">
    <van-nav-bar title="零钱提现" left-arrow @click-left="$router.go(-1)" />

    <main>
      <div class="deposit-main">
        <div class="deposit-main-top">
          <span>到账银行卡</span>

          <div class="bank-class">
            <div class="bank">{{obj_data.banking}}({{obj_data.bank}})</div>
            <div>2小时到账</div>
          </div>
        </div>

        <div class="deposit-main-bottom">
          <p>提现金额</p>

          <div class="input-flex van-hairline--bottom">
            <strong>￥</strong>
            <input type="number" v-model="valueInput" />
          </div>

          <p class="all">
            当前零钱余额{{obj_data.money}}元,
            <span class="bank" @click="onClickMoney(obj_data.money)">全部提现</span>
          </p>
        </div>

        <div class="btn">
          <van-button
            type="primary"
            :disabled="disabled"
            @click="show = true, showKeyboard = true"
            size="large"
          >提现</van-button>
        </div>
      </div>
    </main>

    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <br />
      <!-- 密码输入框 -->
      <van-password-input
        :value="valuePassword"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { withdrawal, wallet } from "@/api";

export default {
  data() {
    return {
      valueInput: "",
      type: "",
      obj_data: "",
      disabled: true,
      show: false,
      valuePassword: "", //密码输入
      showKeyboard: true
    };
  },

  mounted() {
    var data = {
      userId: window.localStorage.getItem("userID")
    };
    wallet(data).then(res => {
      console.log(res);
      if (res.code == 1) {
        const data = res.data;
        this.obj_data = data;

        if (!data.bank) {
          this.obj_data.bank = "请填写银行卡";
        } else {
          this.obj_data.bank = this.obj_data.bank.substr(-4)
        }
      }
    });
  },

  methods: {
    // 点击全部提现
    onClickMoney(value) {
      this.valueInput = value;
    },

    //提现
    onClickWithdrawal() {
      const data = {
        userId: window.localStorage.getItem("userID"),
        password: this.valuePassword,
        money: this.valueInput
      };
      withdrawal(data).then(res => {
        console.log(res);
        this.valuePassword = ""; // 清空密码
        if (res.code == 1) {
          this.$toast.success(res.msg);
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },

    onInput(key) {
      this.valuePassword = (this.valuePassword + key).slice(0, 6);
    },
    onDelete() {
      this.valuePassword = this.valuePassword.slice(
        0,
        this.valuePassword.length - 1
      );
    }
  },

  watch: {
    // 检查输入框是否有值
    valueInput(value) {
      if (!value) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },

    // 当密码的长度为六时,自动隐藏弹出框,确认提现
    valuePassword(value) {
      if (value.length == 6) {
        this.show = false;
        this.onClickWithdrawal();
      }
    }
  }
};
</script>

<style lang="scss">
.deposit {
  width: 100vw;
  height: 100vh;
.van-nav-bar{
  padding: 0;
}
  .van-button {
    border: 0;
  }

  main {
    padding: 0.4rem;
    font-size: 0.33rem;
  }

  .deposit-main {
    background: #fff;
  }

  .deposit-main-top {
    display: flex;
    color: #676767;
    background: #ddd;
    padding: 0.4rem;
  }

  .deposit-main-bottom {
    padding: 0.4rem;
  }

  .bank {
    color: #007cff;
    margin-bottom: 0.2rem;
  }

  .bank-class {
    margin-left: 0.4rem;
  }

  strong {
    font-size: 0.8rem;
  }

  .input-flex {
    display: flex;
    align-items: center;
    padding-bottom: 0.4rem;
  }

  input {
    width: 70vw;
    display: block;
    font-size: 0.7rem;
    outline: 0;
    border: 0;
  }
  .all {
    color: #888;
    margin-top: .3rem;
  }
  .btn {
    padding: 0.4rem;
  }
}
</style>