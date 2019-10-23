<template>
  <div class="appraise">
    <van-nav-bar
      title="发表评价"
      right-text="发布"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    />

    <main>
      <div class="van-hairline--bottom" style="background: #fff">
        <div class="home-notice" style="background:#fff;padding-top: 1vw;;">
          <div class="home-notice-d" @click="$router.push('/details')">
            <div class="home-notice-d-img">
              <img :src="obj_data.avatar" />
            </div>

            <div class="home-notice-d-text">
              <p class="home-notice-d-title">{{obj_data.message}}</p>

              <div class="home-notice-d-count">
                <span>{{obj_data.name}}老师</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  class="home-notice-d-count-span"
                >{{obj_data.count}}篇文章</span>
              </div>
            </div>
          </div>
        </div>

        <div class="evaluate">
          <strong>整体评价</strong>
          &nbsp;
          <van-rate v-model="active" />
        </div>
      </div>
      <div class="edit-div">
        <textarea class="edit" v-model="valueText" placeholder="请输入评价" cols="30" rows="10"></textarea>
      </div>
    </main>
  </div>
</template>

<script>
import { reviews, orderComment, global } from "@/api";
export default {
  data() {
    return {
      active: 5,
      obj_data: "",
      valueText: ""
    };
  },
  mounted() {
    const id = this.$route.query.orderId;
    const data = {
      orderId: id
    };
    orderComment(data).then(res => {
      console.log(res);
      if (res.code == 1) {
        res.data.avatar = global() + res.data.avatar;
        this.obj_data = res.data;
      }
    });
  },
  methods: {
    onClickRight() {
      const data = {
        orderId: this.$route.query.orderId,
        review: this.valueText,
        number: this.active
      };

      if (!this.valueText) {
        this.$toast("请输入评论");
      } else {
        reviews(data).then(res => {
          this.$toast(res.msg);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.appraise {
  width: 100vw;
  height: 100vh;

  .evaluate {
    display: flex;
    align-items: center;
    padding: 0.4rem;
  }
  .edit {
    outline: 0;
    background: #fff;
    border-radius: 0.2rem;
    width: 100%;
    overflow: hidden;
    padding: 0.4rem;
    box-sizing: border-box;
    border: 0;
    word-break: break-all; //解决兼容问题
  }

  .appraise-font {
    font-size: 0.33rem;
    color: #887878;
  }

  .home-notice {
    padding: 0 0.3rem;
  }

  .van-tag {
    margin-right: 6vw;
  }
  .home-notice-d {
    display: flex;
    justify-content: space-between;
    font-size: 0.35rem;
    margin-top: 5vw;
    padding-bottom: 0.2rem;

    .home-notice-d-img {
      width: 35vw;
      height: 20vw;
      display: flex;
      border-radius: 0.2rem;
      overflow: hidden;
      margin-right: 3vw;
      flex: 1;
    }

    .home-notice-d-text {
      flex: 3;
    }

    .home-notice-d-title {
      height: 0.9rem;
      overflow: hidden;
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .home-notice-d-count {
      font-size: 0.33rem;
      margin: 1vw 0;
    }

    .home-notice-d-count-span {
      display: inline-block;
      color: #999;
      margin-top: 4vw;
    }
  }
}
</style>