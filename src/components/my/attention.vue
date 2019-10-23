<template>
  <div class="attention">
    <van-nav-bar title="我的关注" left-arrow @click-left="$router.go(-1)" />

    <main>
      <div
        class="attention-container van-hairline--bottom"
        v-for="i in dataList"
        :key="i.id"
        @click="$router.push({path: '/details', query: {id: i.id}})"
      >
        <div class="attention-container-wrap">
          <div class="attention-img">
            <img :src="i.avatar" alt />
          </div>

          <div class="attention-text">
            <p class="attention-text-name">{{i.name}}</p>
          </div>
        </div>

        <van-button v-if="i.activeAttention ==1 " type="primary" size="normal" color="#f95341" @click.stop="onAttention(i.id)">已关注</van-button>
        <van-button v-if="i.activeAttention ==0 " size="normal" color="#ff8c68" @click.stop="onAttention(i.id)">关注</van-button>
      </div>
    </main>
  </div>
</template>

<script>
import { myFocus, global, focus } from "@/api";

export default {
  data() {
    return {
      dataList: ""
    };
  },

  mounted() {
    const data = {
      userId: window.localStorage.getItem("userID")
    };
    myFocus(data).then(res => {
      if (res.code == 1) {
        const data = res.data;
        const list = data.map((item, i) => {
          item.avatar = global() + item.avatar;
          item.activeAttention = 1;
          return item;
        });
        this.dataList = list;
      }
    });
  },

  methods: {
    // 关注
    onAttention(value) {
      const data = {
        userId: window.localStorage.getItem("userID"),
        teacherId: value
      };
      focus(data).then(res => {
        console.log(res)
        this.$toast(res.msg);
        if (res.code == 1) {
          for (let i of this.dataList) {
            if (i.id == value) {
              if (i.activeAttention == 0) {
                i.activeAttention = 1;
              }else {
                i.activeAttention = 0;
              }
              
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.attention {
  width: 100vw;
  min-height: 100vh;

  .attention-container {
    padding: 0.3rem 0.4rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .attention-container-wrap {
    display: flex;
    align-items: center;
  }

  .attention-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    margin-right: 3vw;
    overflow: hidden;
  }

  .van-button {
    height: 0.7rem;
    line-height: 0.7rem;
  }
}
</style>