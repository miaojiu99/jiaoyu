<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow fixed @click-left="$router.go(-1)" />
    <van-popup closeable v-model="show">
      <div class="money">
        <p>为{{obj_money.name}}修改价格</p>

        <div class="input-flex van-hairline--bottom">
          <strong>￥</strong>
          <input type="number" v-model="inputValue" />
        </div>

        <div class="btn-flex">
          <van-button @click="show = !show">取消</van-button>
          <van-button type="info" @click="configMoney(obj_money.id)">确认</van-button>
        </div>
      </div>
    </van-popup>

    <main>
      <div
        class="order-wrap"
        @click="$router.push({path: '/details', query: {id: i.teacherId}})"
        v-for="i in dataList"
        :key="i.id"
      >
        <van-cell :title=" '用户名:' + i.realName" :value="i.condition" :label=" '订单编号:' + i.orderCode">
          <!-- 头像 -->
          <van-image class="order-wrap-img" round width="1.2rem" height="1.2rem" :src="i.image">
            <template v-slot:error>加载失败</template>
          </van-image>

          <span class="order-wrap-money">{{i.condition + ' ￥' + i.money}}</span>
        </van-cell>

        <div class="order-flex" v-if="isTeacher == 1">
          <!-- 修改价格 -->
          <van-tag
            v-show="i.status == 1"
            plain
            round
            type="primary"
            size="medium"
            @click.stop="setMoney(i.id)"
          >修改价格</van-tag>
        </div>

        <div class="order-flex" v-else>
          <!-- 评价 -->
          <van-tag
            v-show="i.status == 3"
            plain
            round
            type="success"
            size="medium"
            @click.stop="$router.push({
              path: '/appraise',
              query: {
                orderId: i.id
              }
            })"
          >评价</van-tag>

          <!-- 完成 -->
          <van-tag
            v-show="i.status == 2"
            plain
            round
            type="success"
            @click.stop="onClickOrder(i.id)"
            size="medium"
          >完成</van-tag>

          <!-- 取消订单 -->
          <van-tag
            v-show="i.status == 1"
            plain
            round
            type="primary"
            size="medium"
            @click.stop="onClickCancel(i.id)"
          >取消订单</van-tag>

          <!-- 支付 -->
          <van-tag
            v-show="i.status == 1"
            plain
            round
            type="danger"
            size="medium"
            @click.stop="$router.push({ path: '/details',query: { id: i.teacherId }})"
          >支付</van-tag>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { orderList, global, cancel, okOrder, upMoney, buyList } from "@/api";
export default {
  data() {
    return {
      show: false,
      dataList: "",
      obj_money: "",
      inputValue: "", // 修改价格
      isTeacher: 0 // 判断是否是老师， 老师为1, 普通为0
    };
  },

  mounted() {
    this.isTeacher = this.$route.query.teacher;
    const status = this.$route.query.num;

    setTimeout(() => {
      const data = {
        userId: window.localStorage.getItem("userID"),
        status
      };

      if (this.isTeacher) {
        orderList(data).then(res => {
          if (res.code == 1) {
            const data = res.data;
            const list = data.map((item, index) => {
              item.avatar = global() + item.avatar;
              if (item.status == 1) {
                item.condition = "待付款";
              }
              if (item.status == 2) {
                item.condition = "进行中";
              }
              if (item.status == 3) {
                item.condition = "已完成";
              }
              if (item.status == 5) {
                item.condition = "已取消";
              }

              return item;
            });
            this.dataList = list;
          }
        });
      } else {
        buyList(data).then(res => {
          if (res.code == 1) {
            const data = res.data;
            const list = data.map((item, index) => {
              item.avatar = global() + item.avatar;
              if (item.status == 1) {
                item.condition = "待付款";
              }
              if (item.status == 2) {
                item.condition = "进行中";
              }
              if (item.status == 3) {
                item.condition = "已完成";
              }
              if (item.status == 5) {
                item.condition = "已取消";
              }

              return item;
            });
            this.dataList = list;
          }
        });
      }
    }, 400);
  },

  methods: {
    // 取消订单
    onClickCancel(id) {
      const data = {
        orderId: id
      };
      cancel(data).then(res => {
        if (res.code == 1) {
          for (let i of this.dataList) {
            if (i.id == id) {
              i.status = 5;
              i.condition = "已取消";
            }
          }
          this.$toast("取消成功");
        } else {
          this.$toast(res.msg);
        }
      });
    },

    // 已完成
    onClickOrder(id) {
      console.log(id);
      const data = {
        orderId: id
      };
      okOrder().then(res => {
        console.log(res);
      });
    },

    // 修改价格
    setMoney(id) {
      this.show = true;
      for (let i of this.dataList) {
        if (i.id == id) {
          this.obj_money = i;
          this.inputValue = this.obj_money.money;
          return;
        }
      }
    },

    // 确认修改价格
    configMoney(id) {
      const data = {
        orderId: id,
        money: this.inputValue
      };
      upMoney(data).then(res => {
        console.log(res);
        this.$toast(res.msg);
        if (res.code == 1) {
          this.obj_money.money = this.inputValue;
          this.show = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.order {
  width: 100vw;
  min-height: 100vh;

  main {
    margin-top: 12vh;
  }

  .btn-flex {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.3rem;
  }

  .van-cell {
    padding-left: 1.6rem;
    line-height: 0.8rem;
  }

  .home-notice-d-title {
    height: 0.9rem;
    overflow: hidden;
    margin: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .van-button {
    margin-left: 0.4rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }

  .money {
    strong {
      font-size: 0.8rem;
    }

    width: 80vw;
    padding: 0.4rem;

    .input-flex {
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      padding-bottom: 0.4rem;
    }

    input {
      width: 70vw;
      display: block;
      font-size: 0.7rem;
      outline: 0;
      border: 0;
    }
  }
  .order-wrap {
    position: relative;
    margin-bottom: 0.3rem;
    background: #fff;
    padding: 0 0.4rem 0.4rem;

    .van-cell__value {
      overflow: initial;
    }

    .order-wrap-img {
      position: absolute;
      left: -63vw;
      top: 0vw;
    }

    .order-wrap-money {
      font-size: 0.38rem;
      position: absolute;
      left: 0vw;
      text-align: right;
      color: #ff7200;
    }

    .van-image__error {
      font-size: 0.3rem;
    }

    .order-flex {
      margin-top: 0.3rem;
      display: flex;
      justify-content: flex-end;
    }

    .van-tag {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
      margin-left: 0.3rem;
    }

    .van-cell__title {
      flex: 2;
    }
  }
}
</style>