<template>
  <div class="apply">
    <van-nav-bar title="申请" right-text="重新申请" left-arrow @click-left="$router.go(-1)" @click-right="status = 0"  />
    <main class="level-center" v-if="status == 1">
      <p>
        <van-icon color="#1989fa" size="1rem" name="success" />
      </p>
      <p style="color: #1989fa; font-size: .7rem;">申请已提交</p>
      <p style="color: #888;">请耐心等待</p>
    </main>

    <main class="level-center" v-if="status == 2">
      <p>
        <van-icon color="#1989fa" size="1rem" name="smile-o" />
      </p>
      <p style="color: #888;">申请已通过</p>
    </main>

    <main class="level-center" v-if="status == 3">
      <p>
        <van-icon color="#ee0a24" size="1rem" name="cross" />
      </p>
      <p style="color: #ee0a24; font-size: .7rem;">申请已拒绝</p>
    </main>

    <main v-if="status == 0">
      <van-cell title="区域" :value="area" @click="showPicker = true" is-link />
      <van-cell title="类型" :value="value2" @click="showPicker2 = true" is-link />
      <van-cell title="品牌" :value="value3" @click="showPicker3 = true" is-link />
      <van-cell title="价格" :value="money" @click="showPicker4 = !showPicker4" is-link />
      <van-field v-model="money" v-show="showPicker4" center clearable placeholder="请输入出售价格"></van-field>

      <br>
      <br>
      <van-button type="info" size="large" @click="onChange" color="linear-gradient(to bottom, #ff8c68, #f95341)">确认申请</van-button>
    </main>

    <van-popup v-model="showPicker" position="bottom">
      <van-area :area-list="areaList" @confirm="onConfirm" />
    </van-popup>

    <van-popup v-model="showPicker2" position="bottom">
      <van-picker
        show-toolbar
        :columns="types"
        @cancel="showPicke2r = false"
        @confirm="onConfirm2"
      />
    </van-popup>

    <van-popup v-model="showPicker3" position="bottom">
      <van-picker
        show-toolbar
        :columns="brands"
        @cancel="showPicker3 = false"
        @confirm="onConfirm3"
      />
    </van-popup>
  </div>
</template>

<script>
import { apply, typeBrand } from "@/api";
import list from "@/utils/area";

export default {
  data() {
    return {
      area: "请填写区域",
      typeId: "",
      brandId: "",
      value2: "请填写类型",
      value3: "请填写品牌",
      money: "",
      areaList: "",
      showPicker: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      types: [],
      brands: [],
      typesWrap: "",
      brandsWrap: "",

      status: 0, //判断申请状态
    };
  },

  mounted() {
    this.areaList = list;

    this.status = this.$route.query.status;
    

    typeBrand().then(res => {
      if (res.code == 1) {
        const data = res.data;

        this.typesWrap = data.type;
        this.brandsWrap = data.brand;

        for (let i of data.type) {
          this.types.push(i.type);
        }
        for (let i of data.brand) {
          this.brands.push(i.brand);
        }
      }
    });
  },

  methods: {
    // 点击申请
    onChange() {
      const data = {
        userId: window.localStorage.getItem("userID"),
        area: this.area, //区域
        brandId: this.brandId, //品牌id
        typeId: this.typeId, //类型
        money: this.money // 价格
      };
      apply(data).then(res => {
        console.log(res);
        if (res.code == 1) {
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
        this.$toast(res.msg);
      });
    },

    // 区域
    onConfirm(value) {
      this.area = "";
      for (let i of value) {
        this.area += i.name;
      }
      this.showPicker = false;
    },

    // 类型
    onConfirm2(value, index) {
      this.value2 = value;
      this.showPicker2 = false;
      this.typeId = this.typesWrap[index].typeId;
    },

    // 品牌
    onConfirm3(value, index) {
      this.value3 = value;
      this.showPicker3 = false;
      this.brandId = this.brandsWrap[index].brandId;
    }
  }
};
</script>

<style lang="scss">
.apply {
  width: 100vw;
  height: 100vh;

  /* 水平居中 */
  .level-center {
    margin: 0 auto;
    text-align: center;
    width: fit-content;
  }

  main {
    padding: 0.4rem;
  }
  .van-cell {
    padding: 0.5rem 0.4rem;
  }
}
</style>