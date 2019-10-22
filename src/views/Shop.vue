<template>
  <div class="shop">
    <van-nav-bar title="已购" left-arrow @click-left="$router.go(-1)" />

    <div class="address-false" v-if="show">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconzanwuxiaoxi-" />
      </svg>
      <h3>暂无购买</h3>
      <p>点击右上角按钮新增</p>
    </div>

    <main v-else>
      <div
        v-for="i in shopList"
        :key="i.id"
        class="home-teacher-list van-hairline--bottom"
        @click="$router.push({name: 'details', query: { id: i.id }})"
      >
        <van-image
          width="30vw"
          height="23vw"
          radius="1vw"
          style="margin-right: 3vw"
          fit="cover"
          lazy-load
          :src="i.avatar"
        >
          <template v-slot:error>加载失败</template>
        </van-image>

        <div class="home-teacher-list-text">
          <p class="home-teacher-list-message van-ellipsis">{{i.message}}</p>

          <div class="home-teacher-list-name">
            <span>{{i.name}}老师</span>
            <span>{{i.count}}篇文章</span>
          </div>
        </div>
      </div>
    </main>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/shop">已购</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="my">账号</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { bought, global } from "@/api";

export default {
  name: "home",
  data() {
    return {
      active: 1,
      show: false,
      shopList: ""
    };
  },

  mounted() {
    this.getBought();
  },
  methods: {
    getBought() {
      const data = {
        userId: window.localStorage.getItem("userID")
      };
      bought(data).then(res => {
        console.log(res);
        if (res.code == 1) {
          if (res.data == false) {
            this.show = true;
          } else {
            for (let i of res.data) {
              i.avatar = global() + i.avatar;
            }
            this.shopList = res.data;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.shop {
  .icon {
    width: 4rem;
    height: 4rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
.van-nav-bar{
  padding: 0;
}
// main{
  
//    margin-top: 8vh;
// }
  .home-teacher-list {
    margin:0.2rem 0.4rem;
    padding: 2vw 0.2rem;
    border-radius: 2vw;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 0.35rem;

    .home-teacher-list-text {
      padding: 0.2rem 0.2rem 0 0;
      flex: 3;
    }

    .home-teacher-list-message {
      height: 1.2rem;
      width: 55vw;
    }

    .home-teacher-list-name {
      color: #666;
      font-size: 0.3rem;
      margin-bottom: 3vw;
    }
    .home-teacher-list-name span:nth-last-child(1) {
      margin-left: 5vw;
    }
  }

  .address-false {
    margin-top: 30vw;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>