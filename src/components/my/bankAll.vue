<template>
  <div class="bank-all">
    <van-nav-bar
      title="银行卡"
      left-arrow
      fixed
      :right-text="text"
      @click-left="$router.go(-1)"
      @click-right="$router.push('/bank')"
    />
    <main>
      <div v-show="bankShow" class="bank-all-bank van-hairline--bottom">
        <div class="bank-all-flex">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconyinhangqia" />
          </svg>

          <strong>
            <p>{{userBank.banking}}</p>
          </strong>
        </div>
        <strong class="bank-all-bank-position">{{userBank.bank}}</strong>
      </div>
    </main>
  </div>
</template>

<script>
import { bank } from "@/api";
export default {
  data() {
    return {
      userBank: "",
      bankShow: false,
      text: '修改',
    };
  },

  mounted() {
    const data = {
      userId: window.localStorage.getItem("userID")
    };
    bank(data).then(res => {
      if (res.code == 1) {
        const data = res.data;
        if (data.bank) {
          this.bankShow = true;
          this.userBank = data;
          this.userBank.bank = data.bank.substr(-4);
        }else {
          this.text = '添加'
        }
      }
    });
  }
};
</script>

<style lang="scss">
.bank-all {
  width: 100vw;
  height: 100vh;

main{
  
   margin-top: 12vh;
}
  .bank-all-bank {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0.4rem;
    background: #fff;
  }

  .bank-all-flex {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin-right: 3vw;
  }
}
</style>