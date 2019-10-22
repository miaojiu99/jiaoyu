<template>
  <div class="buy">
    <van-nav-bar title="确认购买" fixed left-arrow @click-left="$router.go(-1)" />

    <br />
    <br />

    <main>
      <van-cell title="选择收货地址" is-link to="address" />

      <!-- <div class="buy-address">
        <van-icon name="location" size=".6rem" color="#0af" />
        <div class="buy-address-msg">
          <p>
            张浩然 &nbsp;&nbsp;
            <span>17863005036</span>
          </p>
          <p>山东省山东省山东省山东省山东省山东省山东省山东省山东省山东省山东省山东省山东省山东省山东省</p>
        </div>
        <van-icon name="arrow" />
      </div> -->

      <div class="buy-msg">
        <p class="title">商品信息</p>
        <div class="buy-msg-flex">
          <div class="buy-msg-img">
            <img src="http://img1.sycdn.imooc.com/szimg/5d844ae7089e674906000338-358-201.jpg" alt />
          </div>
          <div class="buy-msg-title">
            <p>微信小程序入门与实战 常用组件API开发技巧项目实战</p>
            <span class="buy-msg-money">￥149.00</span>
          </div>
        </div>
      </div>

      <div class="buy-money">
        <van-cell title="商品金额" value="￥366" />
        <van-cell title="限时优惠" value="-￥166" />
      </div>

      <div class="buy-msg" style="margin-top: .4rem">
        <p class="title">支付方式</p>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="支付宝" icon="comm iconfont iconzhifubao" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell
              title="微信"
              icon="comm2 iconfont iconweixinzhifu"
              clickable
              @click="radio = '2'"
            >
              <van-radio slot="right-icon" name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </main>

    <van-submit-bar :price="30530" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: ""
    };
  },

  methods: {
    onSubmit() {}
  }
};
</script>

<style lang="scss">
.buy {
  width: 100vw;
  min-height: 100vh;

  .van-icon-comm {
    color: #00a8f5;
  }

  .van-icon-comm2 {
    color: #09bb07;
  }

  main {
    padding: 0.4rem;
    font-size: 0.35rem;
  }

  .buy-address {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0.3rem;
  }

  .buy-address-msg {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    color: #666;
    font-size: 0.35rem;

    p {
      margin-top: 0.1rem;
    }
  }

  p {
    margin: 0;
  }

  .buy-msg {
    background: #fff;
    padding: 0.3rem;
    margin-top: 0.3rem;
  }

  .title {
    color: #666;
  }

  .buy-msg-flex {
    display: flex;
    font-size: 0.33rem;
  }

  .buy-msg-img {
    width: 2.2rem;
    height: 1.6rem;
    display: flex;
    overflow: hidden;
    border-radius: 0.1rem;
    flex: 1;
    margin-right: 0.3rem;
  }
  .buy-msg-title {
    flex: 3;
    p {
      margin: 0;
    }
  }

  .buy-msg-money {
    display: block;
    margin-top: 2vw;
    color: #f44;
  }
  img {
    width: 100%;
  }
  .buy-payment {
    margin-top: 0.3rem;
    background: #fff;
  }
}
</style>