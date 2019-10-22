<template>
  <div class="my-article">
    <van-nav-bar title="我的文章" left-arrow fixed @click-left="$router.go(-1)" />
    
    <main>
      <!--  -->
      <div v-for="(i, index) in writeList" :key="index">
        <van-swipe-cell :on-close="onClose" :name="i.id" v-if="i.show">
          <div
            class="articles van-hairline--bottom"
            @click="$router.push({path: '/setarticle', query: {id: i.id}})"
          >
            <div class="article-time">
              <span class="post">专栏</span>
              <span class="name">{{i.name}}</span>
              <span>{{i.create_time}}</span>
            </div>
            <p class="article-title van-ellipsis">{{i.title}}</p>
          </div>

          <template slot="right">
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </div>
    </main>
  </div>
</template>

<script>
import { write, deleteWrite } from "@/api";

export default {
  data() {
    return {
      writeList: ""
    };
  },
  mounted() {
    setTimeout(() => {
      const data = {
        teacherId: window.localStorage.getItem("userID")
      };
      write(data).then(res => {
        if (res.code == 1) {
          const data = res.data;
          for (let i of data) {
            i.show = true;
          }
          this.writeList = data;
        }
      });
    }, 500);
  },
  methods: {
    onClose(clickPosition, instance, id) {
      this.$dialog
        .confirm({
          message: "确定删除文章"
        })
        .then(() => {
          const data = {
            id: id.name
          };
          deleteWrite(data).then(res => {
            this.$toast(res.msg);
            for (let i of this.writeList) {
              if (i.id == id.name) {
                i.show = false;
                return;
              }
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
.my-article {
  width: 100vw;
  min-height: 100vh;
.van-nav-bar{
  padding: 0;
}
main{
  margin-top: 7.4vh;
}
  .details-text {
    color: #666;
    margin-top: 0.1rem;
    line-height: 0.8rem;
  }

  .van-button {
    height: 100%;
  }

  .articles {
    padding: 0.2rem 0.4rem;
    background: #fff;
    font-size: 0.36rem;
    line-height: 0.6rem;
    box-sizing: border-box;
  }

  .article-time {
    color: #909090;
    display: flex;
    align-items: center;
  }

  .post {
    color: #1989fa;
  }
  .post:after {
    content: "·";
    margin: 0 0.1rem;
    color: #b2bac2;
  }

  .name:after {
    content: "·";
    margin: 0 0.1rem;
    color: #b2bac2;
  }
}
</style>