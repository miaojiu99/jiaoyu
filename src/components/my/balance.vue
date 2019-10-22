<template>
  <div class="balance">
    <van-nav-bar
      title="我的零钱"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <main>
        <br>
        <br>
        <van-icon name="gold-coin" size="2rem" color="#f44" />

        <p>我的零钱</p>

        <h1>￥{{obj_data.money}}</h1>

        <br>
        <br>
        <br>
        <br>

        <van-button @click="$router.push('/deposit')">提现</van-button>

    </main>
  </div>
</template>

<script>
import {wallet} from '@/api'

export default {
  data() {
    return {
      obj_data: ''
    }
  },
  mounted() {
    var data = {
      userId: window.localStorage.getItem('userID')
    }
    wallet(data).then( res => {
      console.log(res)
      if (res.code == 1) {
        this.obj_data = res.data;
      }
    })
  }
  
}
</script>

<style lang="scss">
.balance {
  width: 100vw;
  height: 100vh;
.van-nav-bar{
  padding: 0;
}
  h1 {
      margin: 0;
  }

  main {
    
   margin-top: 8vh;
      display: flex;
      align-items: center;
      flex-direction: column;
  }
  .van-button {
      width: 50vw;
      color: #007cff;
      background: #ddd;
  }
}
</style>