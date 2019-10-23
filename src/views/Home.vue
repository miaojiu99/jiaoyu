<template>
  <div class="home">
    <div class="home-search" @click="$router.push('/search')">
      <div class="sear">
        <van-icon class="iconsearch" name="search" />
        <span class="text">搜索平台老师或店铺名称</span>
      </div>
    </div>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="i in swiper" :key="i.id">
        <van-image height="40vw" fit="cover" lazy-load :src="i.image" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :border="false">
      <van-grid-item @click="$router.push({path: '/search', query: {name: '语文'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconxiyuwenquan" />
        </svg>
        <span>语文</span>
      </van-grid-item>
      <van-grid-item @click="$router.push({path: '/search', query: {name: '数学'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconshuxue1" />
        </svg>
        <span>数学</span>
      </van-grid-item>
      <van-grid-item @click="$router.push({path: '/search', query: {name: '英语'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconyingyu-abc" />
        </svg>
        <span>英语</span>
      </van-grid-item>
      <van-grid-item @click="$router.push({path: '/search', query: {name: '物理'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconwuli1" />
        </svg>
        <span>物理</span>
      </van-grid-item>
      <van-grid-item @click="$router.push({path: '/search', query: {name: '化学'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconhuaxuexuanzhong" />
        </svg>
        <span>化学</span>
      </van-grid-item>
      <van-grid-item @click="$router.push({path: '/search', query: {name: '生物'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconshengwu" />
        </svg>
        <span>生物</span>
      </van-grid-item>
      <van-grid-item @click="$router.push({path: '/search', query: {name: '政治'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfenzu" />
        </svg>
        <span>政治</span>
      </van-grid-item>
      <van-grid-item @click="$router.push({path: '/search', query: {name: '历史'}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconlishi1" />
        </svg>
        <span>历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 老师推荐 -->
    <div class="home-notify">
       <div class="home-notice">
        <h3>
          <em>
            教育
            <span style="color:#17aa51">公告</span>
          </em>
        </h3>

        <div class="home-bar"></div>
        <van-tag round plain type="primary">图文</van-tag>
        &nbsp;
        {{inform}}
      </div>
    </div>
    <div class="home-recommend">
     
      <van-row gutter="20">
        <van-col span="12"><img src="@/assets/images/1.png" /></van-col>
        <van-col span="12">
          <img src="@/assets/images/2.png" />
          <img src="@/assets/images/3.png" />
        </van-col>
      </van-row>
      <!-- <div class="home-notice-img">
        <img src="@/assets/images/notice.jpg" />
      </div> -->

      <h3 class="home-teacher-recommend van-hairline--bottom">老师推荐</h3>

      <div class="recommend">
        <div
          v-for="i in recommend"
          :key="i.id"
          @click="$router.push({name: 'details', query: { id: i.id}})"
          class="recommend-part van-hairline--surround"
        >
          <van-image width="15vw" height="15vw" round fit="conver" :src="i.avatar">
            <template v-slot:error>加载失败</template>
          </van-image>

          <h3>{{i.name}}</h3>
          <p>{{i.message}}</p>
        </div>
      </div>
    </div>

    <van-tabs v-model="active" color="#0af" sticky>
      <van-tab title="全部"></van-tab>
      <van-tab title="最新上架"></van-tab>
      <van-tab title="热销老师"></van-tab>
    </van-tabs>

    <!-- 老师列表 -->
    <div
      v-for="i in teacherList"
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
        </div>

        <div class="home-teacher-list-money">¥{{i.money}}
          <span>{{i.number}}篇文章</span>
        </div>
      </div>
    </div>

    <br />
    <br />
    <br />

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="award" to="/quiz">提问</van-tabbar-item>
      <van-tabbar-item icon="manager" to="my">账号</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { index, teacher, global } from "@/api";

export default {
  name: "home",
  data() {
    return {
      active: 0,
      isSwitchover: false,
      swiper: "", //轮播图
      recommend: "", //老师推荐
      inform: "", //通知公告
      teacherList: "" //老师列表
    };
  },

  mounted() {
    setTimeout(() => {
      this.index();
      this.teachers();
    }, 500);
  },

  methods: {
    // 首页接口
    index() {
      index().then(res => {
        if (res.code == 1) {
          const data = res.data;

          // 轮播图
          for (let i of data.figure) {
            i.image = global() + i.image;
          }
          this.swiper = data.figure;

          // 通知公告
          this.inform = data.write[0].title;

          // 老师推荐
          var recommendList = data.recommend.filter((item, index) => {
            return index < 3;
          });
          for (let i of recommendList) {
            i.avatar = global() + i.avatar;
          }
          this.recommend = recommendList;
        }
      });
    },

    // 老师列表
    teachers() {
      const data = {
        type: this.active
      };
      teacher(data).then(res => {
        if (res.code == 1) {
          // 老师列表
          for (let i of res.data) {
            i.avatar = global() + i.avatar;
          }
          this.teacherList = res.data;
        }
      });
    },

    backTop() {
      document.documentElement.scrollTop = 0;
    },

    // 点击切换
    switchover() {
      this.isSwitchover = !this.isSwitchover;
    }
  },

  watch: {
    active(value) {
      this.teachers();
    }
  }
};
</script>

<style lang="scss">
.home {
  width: 100vw;
  min-height: 100vw;
  

  .icon {
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  h3 {
    font-size: 0.4rem;
  }

  .home-search {
    position: sticky;
    top: 8vh;
    z-index: 99;
    padding: 2vw 3vw 2vw;

    font: {
      size: 0.35rem;
      family: simsun;
    }
    .iconsearch {
      font-weight: 700;
      margin-right: 1.5vw;
    }

    .sear {
      height: 8vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f1f1f1;
      color: #999;
      border-radius: 1rem;
      border: 1px solid #ececec;
    }
  }
  .van-swipe {
    height: 40vw;
    margin: 12vw 3vw 2vw;
    overflow: hidden;
    border-radius: 0.2rem;

  }

  .van-grid {
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 2vw 0;
    background: #fff;
    span {
      color: #666;
      margin-top: 0.1rem;
      font-size: 0.33rem;
    }
  }

  .van-grid-item__content{
    padding: 8px;
  }
  .home-notify{
    padding: 0.3rem 0.4rem;
    background: #fff;
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
    .home-notice {
      display: flex;
      align-items: center;
      font-size: 0.33rem;
    }

    .home-notice-img {
      height: 30vw;
      border-radius: 2vw;
      overflow: hidden;
      margin: 3vw 0;
    }
    .home-bar {
      width: 0.1vw;
      height: 100%;
      background: #ddd;
      height: 5vw;
      margin: 0 2vw;
    }
  }
  // 通知公告和老师推荐
  .home-recommend {
    padding: 0.3rem 0.4rem;
    background: #fff;
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;

    .van-row{
      margin-bottom: 4vw;
    }
    .home-teacher-recommend {
      padding-bottom: 2vw;
    }

    .recommend {
      display: flex;
      justify-content: space-between;
      height: 43vw;
      margin-top: 5vw;
    }

    // .recommend-part:first-of-type {
    //   background: #d4fad2;
    // }

    // .recommend-part:last-of-type {
    //   background: #d0e3fb;
    // }

    // .recommend-part:nth-last-child(2) {
    //   background: #ffe2cd;
    // }

    .recommend-part {
      width: 28%;
      background: #fff;
      display: flex;
      padding: 0.5rem 0.15rem;
      align-items: center;
      flex-direction: column;
      font-size: 0.3rem;
      box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.1);
      border-radius: 0.2rem;
      overflow: hidden;

      h3 {
        margin: 2vw 0;
      }

      p {
        color: #888;
        height: 8.2vw;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }

  // 老师列表
  .home-teacher-list {
    margin:0.2rem 0.4rem;
    padding: 2vw 0.2rem;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 0.35rem;

    .home-teacher-list-text {
      padding: 0.2rem 0.2rem 0 0;
      flex: 3;
    }
    .van-hairline--bottom::after{border-bottom-width:0;}
    .home-teacher-list-message {
      height: 0.8rem;
      width: 55vw;
    }

    .home-teacher-list-name {
      color: #666;
      font-size: 0.32rem;
      margin-bottom: 3vw;
    }
    // .home-teacher-list-name span:nth-last-child(1) {
    //   margin-left: 5vw;
    // }

    .home-teacher-list-money {
      color: #f44;

      span{
        color: #999;
        font-size: 0.32rem;
        text-align: right;
        float:right;
      }
    }
  }
}
</style>
