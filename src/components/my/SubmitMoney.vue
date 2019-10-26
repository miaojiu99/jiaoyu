<template>
  <div class="submit-money">
    <van-nav-bar title="提交保证金" left-arrow @click-left="$router.go(-1)" />
    <br />
    <br />
    <br />
    <br />
    <div class="main">
      <van-button type="primary" @click="show = true" size="large">提交保证金</van-button>
    </div>

    <!-- 支付弹窗 -->
    <van-popup v-model="show">
      <div class="popup">
        <van-cell title="支付总额" value="¥300" />
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              title="微信"
              icon="comm2 iconfont iconweixinzhifu"
              clickable
              @click="radio = '1'"
            >
              <van-radio slot="right-icon" name="1" />
            </van-cell>

            <van-cell title="支付宝" icon="comm iconfont iconzhifubao" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-button type="info" @click="onConfirm" size="large">确认支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { pay } from "@/api";

export default {
  data() {
    return {
      show: false,
      radio: ""
    };
  },
  methods: {
    // 点击支付
    onConfirm() {
      const data = {
        userId: window.localStorage.getItem("userID"),
        type: this.radio // 1微信，2支付宝
      };

      if (this.radio == 1) {
        // 微信接口
        pay(data).then(res => {
          if (res.code == 1) {
            const data = res.data;
            var wxPay = window.api.require("wxPay");
            wxPay.payOrder(
              {
                apiKey: data.appid,
                orderId: data.prepayid,
                mchId: data.partnerid,
                nonceStr: data.noncestr,
                timeStamp: data.timestamp,
                package: data.package,
                sign: data.sign
              },
              function(ret, err) {
                console.log(JSON.stringify(ret));
              }
            );
          }
        });
      }

      if (this.radio == 2) {
        // 支付宝接口
        pay(data).then(res => {
          if (res.code == 1) {
            var aliPay = window.api.require("aliPay");
            aliPay.payOrder(
              {
                orderInfo: res.data
              },
              function(ret, err) {
                console.log(JSON.stringify(ret));
              }
            );
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.submit-money {
  width: 100vw;
  height: 100vh;

  .main {
    padding: 0.4rem;
  }

  .popup {
    padding: 0.4rem;
    width: 80vw;
    font-size: 0.35rem;
    .iconweixinzhifu {
      color: #00cc03;
    }
    .iconzhifubao {
      color: #11a0ef;
    }
    .van-cell {
      padding: 16px;
    }
    .van-button--large {
      margin-top: 0.5rem;
    }
  }
}
</style>