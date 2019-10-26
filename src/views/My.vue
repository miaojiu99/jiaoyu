<template>
  <div class="my">
    <div class="my-top" @click="$router.push('/info')">
      <van-nav-bar title="个人中心" left-arrow @click-left="$router.go(-1)">
        <van-icon name="setting-o" slot="right" />
      </van-nav-bar>
      <div class="my-top-msg">
        <van-image width="14vw" height="14vw" fit="cover" round :src="obj_data.avatar">
          <template v-slot:error>上传图片</template>
        </van-image>
        <div class="my-top-title">
          <h3 class>{{obj_data.realName}}</h3>
          <p
            class="van-ellipsis"
            style="width: 70vw; margin-top:0.2rem;"
            v-if="isName"
          >昵称：{{obj_data.name}}</p>
          <h3 v-else style="color: #f4f4f4">请点击完善自己的个人信息</h3>
         
        </div>
         <div
            class="renzheng"
            @click.stop="$router.push({path: '/approve', query: {real: obj_data.real}})"
          >认证</div>
      </div>

      <div class="my-top-btn">
        <span @click.stop="$router.push('/balance')">
          {{obj_data.wallet}}
          <br />我的余额
        </span>

        <div class="my-bar"></div>

        <span @click.stop="$router.push('/attention')">
          {{obj_data.focus}}
          <br />我的关注
        </span>
      </div>
    </div>
    <div class="my-order">
      <van-cell>
        <template slot="title">
          <span class="custom-title">买在状元</span>
        </template>
      </van-cell>
      <van-grid :border="false" :column-num="3">
        <van-grid-item @click="$router.push('/order')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconkecheng2" />
          </svg>
          <p>已买课程</p>
        </van-grid-item>

        <van-grid-item @click="$router.push({path: 'order', query: {num: 2}})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconkechengtixi" />
          </svg>
          <p>正在进行</p>
        </van-grid-item>

        <van-grid-item @click="$router.push({path: 'order', query: {num: 3}})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconkechengbiao" />
          </svg>
          <p>已完课程</p>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="my-order">
      <van-cell>
        <template slot="title">
          <span class="custom-title">卖在状元</span>
        </template>
      </van-cell>
      <van-grid :border="false" :column-num="3">
        <van-grid-item @click="$router.push({path: '/order', query: {teacher: 1}})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconkecheng1" />
          </svg>
          <p>已售课程</p>
        </van-grid-item>
        <van-grid-item @click="$router.push({path: '/order', query: {teacher: 1, num: 2}})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconpen" />
          </svg>
          <p>正在进行</p>
        </van-grid-item>
        <van-grid-item @click="$router.push({path: '/order', query: {teacher: 1, num: 3}})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconkecheng" />
          </svg>
          <p>已完课程</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- <div class="my-order">
      <van-cell value="查看全部" is-link :to="{path: 'order', query: {teacher:obj_data.teacher }}" >
        <template slot="title">
          <span class="custom-title">全部订单</span>
        </template>
      </van-cell>
      <van-grid :column-num="3">
        <van-grid-item v-for="value in 1" :key="value" icon="comm iconfont iconquanbudingdan" text="全部" :to="{path: 'order', query: {teacher:obj_data.teacher }}" />
        <van-grid-item v-for="value in 1" :key="value" icon="comm iconfont iconzhifu" text="待支付" />
        <van-grid-item v-for="value in 1" :key="value" icon="comm iconfont iconpingjia" text="待评价" />
      </van-grid>
    </div>-->

    <div class="my-bottom">
      <div class="my-tool">
        <van-cell>
          <template slot="title">
            <span class="custom-title">状元学伴</span>
          </template>
        </van-cell>
      </div>
      <van-grid :border="false" :column-num="4">

        <van-grid-item v-if="obj_data.state == 1" @click="$router.push('/submit-money')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconpre_icon_zhongyinbaozhengjin" />
          </svg>
          <p>保证金</p>
        </van-grid-item>

        <van-grid-item @click="$router.push({path: '/quiz', query: {id: 1} })">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icontiwen" />
          </svg>
          <p>我的提问</p>
        </van-grid-item>
        <van-grid-item @click.stop="$router.push('/attention')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconguanzhu" />
          </svg>
          <p>我的关注</p>
        </van-grid-item>
        <van-grid-item :to="{path: 'apply', query: {status:obj_data.status }}">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconruzhu" />
          </svg>
          <p>申请入驻</p>
        </van-grid-item>
        <van-grid-item @click="$router.push('/often-issue')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconwentishangbao" />
          </svg>
          <p>常见问题</p>
        </van-grid-item>
        <van-grid-item @click="$router.push({path: '/quiz', query: {id: 2} })">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconyihuida" />
          </svg>
          <p>我的回答</p>
        </van-grid-item>

        <van-grid-item @click="$router.push({name: 'big-img', query: {img: obj_data.avatar }})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconxingxiang" />
          </svg>
          <p>形象照片</p>
        </van-grid-item>
        <van-grid-item @click="$router.push('/ana')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconlinian" />
          </svg>
          <p>个人理念</p>
        </van-grid-item>

        <van-grid-item @click="$router.push('/amend')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconziwojieshao" />
          </svg>
          <p>个人介绍</p>
        </van-grid-item>

        <van-grid-item v-show="isTeacher" to="/myarticle">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconkecheng3" />
          </svg>
          <p>我的课程</p>
        </van-grid-item>
        <van-grid-item @click.stop="$router.push('/balance')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconqianbao" />
          </svg>
          <p>我的钱包</p>
        </van-grid-item>
        <van-grid-item @click="$router.push('/service')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconkefu" />
          </svg>
          <p>客服中心</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- <div class="my-bottom">
      <div class="my-tool">
        <van-cell>
          <template slot="title">
            <span class="custom-title">状元学伴</span>
          </template>
        </van-cell>
      </div>

      <van-cell is-link :to="{path: 'order', query: {teacher:obj_data.teacher }}" >
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icondingdan2" />
          </svg>
          <span class="custom-title">我的订单</span>
        </template>
      </van-cell>
      <van-cell is-link to="/shop">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconyigoucopy" />
          </svg>
          <span class="custom-title">已购</span>
        </template>
      </van-cell>
      <van-cell is-link to="/deposit">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icontixian" />
          </svg>
          <span class="custom-title">提现</span>
        </template>
      </van-cell>
      <van-cell v-show="isTeacher"  is-link to="/article">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconwenzhang" />
          </svg>
          <span class="custom-title">写文章</span>
        </template>
      </van-cell>
      <van-cell v-show="isTeacher"  is-link to="/myarticle">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconarticle" />
          </svg>
          <span class="custom-title">我的文章</span>
        </template>
      </van-cell>
      <van-cell is-link :to="{path: 'apply', query: {status:obj_data.status }}"  >
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshenqing" />
          </svg>
          <span class="custom-title">申请成为老师</span>
        </template>
      </van-cell>
    </div>-->
    <br />
    <van-button
      type="primary"
      size="large"
      @click="backLogin"
      color="linear-gradient(to bottom, #ff8c68, #f95341)"
    >退出登录</van-button>

    <br />
    <br />
    <br />
    <br />
    <br />

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="graphic" to="/classify">学堂</van-tabbar-item>
      <van-tabbar-item icon="award" to="/quiz">大家说</van-tabbar-item>
      <van-tabbar-item icon="friends" >职场</van-tabbar-item>
      <van-tabbar-item icon="manager" to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { set, global } from "@/api";
import { phoneConceal } from "@/utils";
export default {
  name: "my",
  data() {
    return {
      active: 4,
      obj_data: {},
      isName: false,
      isTeacher: false
    };
  },

  mounted() {
    const userID = window.localStorage.getItem("userID");
    const data = {
      userId: userID
    };
    set(data).then(res => {
      if (res.code === 1) {
        const data = res.data;
        data.phone = phoneConceal(data.phone);

        // 判断是否有名称
        if (data.name) {
          this.isName = true;
        }

        if (data.avatar) {
          data.avatar = global() + data.avatar;
        }

        // 当teacher是1, 则是老师
        if (data.teacher) {
          this.isTeacher = true;
        }

        this.obj_data = data;
      } else {
        this.$toast(res.msg);
      }
    });
  },

  methods: {
    backLogin() {
      window.localStorage.removeItem("userID");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
.my {
  width: 100vw;
  min-height: 100vh;
  background: #f4f2f3;

  .van-nav-bar {
    background: none;
    // padding: 0;

    .van-nav-bar__left {
      left: 0;
    }
    .van-nav-bar__title {
      color: #fff;
    }

    .van-icon {
      color: #fff;
    }
  }

  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .van-cell {
    padding: 0.4rem;
  }
  .my-top {
    background: url(../assets/images/my1.png) top center no-repeat #007cff;
    background-size: 100%;
    color: #fff;
    padding: 0 0.4rem 0.1rem;
    margin-bottom: 0.2rem;

    .my-top-msg {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
    }

    .my-top-btn {
      margin-top: 4vw;
      margin-bottom: 3vw;
      display: flex;
      font-size: 0.33rem;
      justify-content: space-around;

      span {
        display: inline-block;
        width: 25vw;line-height: 0.8rem;
        text-align: center;
      }
    }

    .my-bar {
      width: 0.2vw;
      height: 7vw;
      margin-top: 0.4rem;
      background: #fff;
    }

    .my-top-title {
      position: relative;
      margin-left: 5vw;

      

      span {
        font-size: 0.35rem;
        color: #666;
      }
    }
    .renzheng {
        position: absolute;
        right: 0.2rem;
        top: rem;
        border: 1px solid #fff;
        padding: 0.1rem 0.3rem;
        font-size: 0.34rem;
      }
  }
  .my-order {
    margin: 2vw 3vw;
    overflow: hidden;
    border-radius: 0.2rem;
    background: #fff;

    .custom-title {
      font-size: 0.4rem;
      font-weight: bold;
    }
    .van-cell__value {
      font-size: 0.3rem;
    }
    .van-hairline--top::after {
      border-top-width: 0;
    }
    .van-grid-item__content::after {
      border-width: 0;
    }
    .van-grid-item__icon {
      color: #ff8a67;
    }
    .van-grid-item__content {
      color: #666;
      font-size: 0.34rem;
      .icon {
        width: 10vw;
        height: 10vw;
        margin-bottom: 0.4rem;
      }
    }
  }

  .my-tool {
    .custom-title {
      font-size: 0.4rem;
      font-weight: bold;
    }
  }
  .my-bottom {
    margin: 2vw 3vw;
    overflow: hidden;
    padding-bottom: 4vw;
    border-radius: 0.2rem;
    background: #fff;

    .van-grid-item__content {
      padding: 8px;
      color: #666;
      font-size: 0.34rem;
      .icon {
        width: 8vw;
        height: 8vw;
        margin-bottom: 0.4rem;
      }
      p{margin-bottom: 0.2rem;}
    }
  }
  .van-cell__title {
    .icon {
      float: left;
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.2rem;
    }
  }
  .van-button--large {
    width: 94vw;
    margin: 0 3vw;
  }
}
</style>