<template>
  <div class="details">
    <van-nav-bar
      title="老师详情"
      fit="cover"
      fixed
      left-arrow
      :z-index="99"
      @click-left="$router.go(-1)"
    />
    <van-image width="100vw" style="margin-top: 20vw;" height="40vw" :src="obj_data.avatar" />
    <div class="details-header">
      <div class="details-header-desc">
        <h3>{{obj_data.name}}老师</h3>
        <van-button
          class="tag-btn"
          v-if="activeAttention == 1"
          @click="onAttention"
          plain
          type="primary"
          size="normal"
          color="#f95341"
        >已关注</van-button>

        <van-button class="tag-btn" v-else @click="onAttention" type="primary"  color="#ff8c68" size="normal">关注</van-button>
      </div>
      <p class="details-header-phone">手机号:{{obj_data.phone}}</p>
    </div>

    <!-- 购买 -->
    <div>
      <van-button  class="details-buy" v-if="obj_data.write == 0" @click="show = true" color="linear-gradient(to right, #ff8c68, #f95341)" type="info">购买 ￥{{obj_data.money}}</van-button>
    </div>
    

    <van-tabs v-model="active">
      <van-tab title="个人介绍">
        <p class="details-header-message">
          {{obj_data.message}}
        </p>
      </van-tab>

      <van-tab title="文章列表">
        <div v-for="(i,index) in articleList" :key="index" @click="$router.push({path: '/read', query: {id: i.id}})" class="article van-hairline--bottom">
        <van-image
          width="30vw"
          height="23vw"
          radius="1vw"
          fit="cover"
          style="margin-right: 3vw"
          lazy-load
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="article-teacher-list">
          <div class="article-time">
            <van-tag type="warning" plain class="post">专栏</van-tag>
            <span class="name">{{i.name}}</span>
            <!-- <span>{{i.create_time}}</span> -->
          </div>
          <p class="article-title van-ellipsis">{{i.title}}</p>
          <div class="article-teacher-list-money">¥{{i.money}}

        </div>
        </div>
        </div>
      </van-tab>

      <van-tab title="老师评价">
        <div
          v-for="(i, index) in commentList"
          :key="index"
          class="details-container van-hairline--bottom"
        >
          <div class="details-container-flex">
            <div class="details-container-img">
              <img :src="i.avatar" />
            </div>
            <div class="details-container-name">
              <div>
                <p class="details-name">用户名</p>
                <van-rate v-model="i.number" size=".4rem" color="#f95341" readonly />
                <div style="margin-top: 3vw">{{i.message}}</div>
              </div>
              <span class="time">{{i.create_time}}</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 支付弹窗 -->
    <van-popup v-model="show">
      <div class="popup">
        <van-cell title="支付总额" :value="'¥'+obj_data.money" />
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
import {
  indexMessage,
  write,
  global,
  focus,
  addOrder,
  reviewList
} from "@/api";
export default {
  data() {
    return {
      active: 0,
      show: false,
      radio: "",
      activeAttention: 0,
      teacherId: "", // 老师id
      obj_data: "",
      articleList: "", //文章列表
      commentList: "" // 评论列表
    };
  },

  mounted() {
    setTimeout(() => {
      this.init();

      // 文章列表
      this.openWrite();

      // 用户评论
      this.comment();
    }, 500);
  },

  methods: {
    init() {
      const teacherId = this.$route.query.id;
      this.teacherId = teacherId;
      const userId = window.localStorage.getItem("userID");

      const data = {
        teacherId,
        userId
      };

      indexMessage(data).then(res => {
        console.log(res);
        if (res.code == 1) {
          const data = res.data;

          // 确定是否关注 0 是未关注
          if (data.focus == 0) {
            this.activeAttention = 0;
          } else {
            this.activeAttention = 1;
          }

          data.avatar = global() + data.avatar;
          this.obj_data = data;
        } else {
          this.$toast(res.msg);
        }
      });
    },

    // 文章列表
    openWrite() {
      const data = {
        teacherId: this.teacherId
      };
      write(data).then(res => {
        if (res.code == 1) {
          this.articleList = res.data;
        }
      });
    },

    onPage(url) {
      console.log(url);
      window.api.openWin({
        name: new Date().getTime(),
        url: url,
        reload: true,
        bgColor: "#000",
        vScrollBarEnabled: false,
        slidBackEnabled: false,
        bounces: false,
        animation: {
          type: "movein",
          subType: "from_right",
          duration: 300
        }
      });
    },

    // 用户评论
    comment() {
      const data = {
        teacherId: this.teacherId
      };
      reviewList(data).then(res => {
        if (res.code == 1) {
          const data = res.data;
          for (let i of data) {
            i.avatar = global() + i.avatar;
          }
          this.commentList = data;
        }
      });
    },

    // 点击支付
    onConfirm() {
      this.show = false;
      const data = {
        userId: window.localStorage.getItem("userID"),
        teacherId: this.teacherId,
        type: this.radio // 1微信，2支付宝
      };

      if (this.radio == 1) {
        // 微信接口
        addOrder(data).then(res => {
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
        addOrder(data).then(res => {
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
    },

    // 关注
    onAttention() {
      const data = {
        userId: window.localStorage.getItem("userID"),
        teacherId: this.teacherId
      };
      focus(data).then(res => {
        this.$toast(res.msg);
        if (res.code == 1) {
          if (this.activeAttention == 0) {
            this.activeAttention = 1;
          } else {
            this.activeAttention = 0;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.details {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #fff;

  .details-header {
    position: relative;
    z-index: 999;
    width: 80vw;
    border-radius: 0.2rem;
    box-shadow: 0 5px 4px 0px #f5f5f5;
    margin:-10vw auto 4vw;
    background: #fff;
    padding: 0.4rem;

    .tag-btn {
      height: 0.7rem;
      line-height: 0.7rem;
      font-weight: 500;
    }

    .details-header-desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .details-header-phone {
      font-size: 0.33rem;
      padding: 0.1rem 0 0rem;
      color: #666;
    }

    h3 {
      font-size: 0.4rem;
    }
  }

  .details-buy {
    width: 100%;
    position: fixed;
    bottom: 0vh;
    z-index: 99;
    text-align: center;
    right: 50%;
    transform: translateX(50%)
  }

  .details-header-message {
    background: #fff;
    padding: 0.4rem 0.4rem;
    word-wrap: break-word;
    line-height: 0.7rem;
    color: #787878;
    box-sizing: border-box;
  }

  .details-name {
    padding-bottom: 0.2rem;
  }

  .details-container {
    padding: 0.4rem;
    font-size: 0.35rem;
    background: #fff;
    position: relative;

    .details-container-flex {
      display: flex;
    }

    .details-container-name {
      display: flex;
      justify-content: space-between;
      flex: 1;
    }

    .details-container-img {
      width: 1rem;
      height: 1rem;
      border-radius: 1rem;
      margin-right: 0.2rem;
      overflow: hidden;
    }

    .time {
      position: absolute;
      color: #898989;
      right: 0.4rem;
      font-size: 0.3rem;
    }
  }

  .van-nav-bar {
    z-index: 99;
    
  }
  .van-tab{
    color: #333;
  }
  .van-tabs__line{
    width: 30px !important;
    background-color: #fd4a13;
  }
  .van-tab--active{
    color: #fd4a13;
  }
  .van-hairline--bottom::after{
    border-bottom-width:0;
  }
  .van-tab__pane{
    background: #f9f9f9;
    margin: 3vw 0;
  }
  .article {
    margin: 2vw 3vw;
    padding: 0.2rem;
    background: #fff;
    font-size: 0.36rem;
    line-height: 0.6rem;
    box-sizing: border-box;
    // box-shadow: 0 0 5px 0 #f1f1f1;
  }

  .article-teacher-list{
      padding: 0.2rem 0.2rem 0 0;
      display: inline-block;
      justify-content: space-between;
      width: 50vw;
  }
  .article-time {
    color: #909090;
    display: flex;
    align-items: center;
  }
  .article-title{
    margin: 0.4rem 0 0.2rem;
  }
  .article-teacher-list-money{
    color: #f44;
  }
  .post {
    // color: #1989fa;
    margin-right: 0.1rem;
  }
  // .post:after {
  //   content: "·";
  //   margin: 0 0.1rem;
  //   color: #b2bac2;
  // }

  .name:after {
    content: "·";
    margin: 0 0.1rem;
    color: #b2bac2;
  }

  .popup {
    padding: 0.4rem;
    width: 80vw;
    font-size: 0.35rem;
    .iconweixinzhifu{
      color:#00cc03 ;
    }
    .iconzhifubao{
      color: #11a0ef;
    }
    .van-cell{
        padding: 16px;
      }
    .van-button--large{
      margin-top: 0.5rem;
    }
  }
  
}
</style>