<template>
  <div class="search">
    <!-- 筛选 -->
    <van-popup v-model="showPopup" position="top" :style="{ minHeight: '50%' }">
      <br />
      <br />
      <div class="search-popup-wrap">
        <p>老师类型</p>
        <van-tag
          v-for="(i, index) in teacherType"
          :key="index"
          plain
          size="medium"
          :class=" {active: i.isActive} "
          @click="onClickType(index, i.typeId)"
        >{{i.type}}</van-tag>
      </div>

      <div class="search-popup-wrap">
        <p>老师品牌</p>
        <van-tag
          v-for="(i, index) in teacherBrand"
          :key="index"
          plain
          size="medium"
          :class=" {active: i.isActive} "
          @click="onClickBrand(index, i.brandId)"
        >{{i.brand}}</van-tag>
      </div>
      <br />

      <van-cell title="选择城市" :value="area" @click="onSelectCity" is-link />

      <br />
      <br />
      <br />

      <div class="search-popup-btn">
        <van-button size="large" @click="empty">清空</van-button>
        <van-button type="primary" @click="check" size="large">查看</van-button>
      </div>
    </van-popup>

    <!-- 城市筛选 -->
    <div v-if="showCity">
      <van-index-bar>
        <div v-for="(item, index) in cityList" :key="index">
          <van-index-anchor :index="item.name" />
          <van-cell
            v-for="(i, indexChild) in item.citys"
            :key="indexChild"
            :title="i"
            @click="selectCity(i)"
          />
        </div>
      </van-index-bar>
    </div>

    <!-- 搜索 -->
    <div v-else>
      <div class="search-con">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
        <van-search
          v-model="valueInput"
          :placeholder="hostRecommend"
          show-action
          shape="round"
          @search="onSearch"
        >
          <!-- 筛选 -->
          <div slot="action">
            <van-icon name="apps-o" size=".6rem" @click="showPopup = true" />
          </div>
        </van-search>
      </div>

      <main v-show="RecommendResult == 1" style="padding: .4rem;">
        <p>老师类型</p>
        <van-tag
          plain
          v-for="(i, index) in teacherType"
          :key="index"
          @click="onClickTypeIndex(i.typeId)"
          size="medium"
        >{{i.type}}</van-tag>
      </main>

      <main v-show="RecommendResult == 2" class="search-">
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
      </main>

      <div class="search-loading" v-show="isLoading">
        <van-loading type="spinner" color="#0af" size="1rem">加载中...</van-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { teacherSearch, typeBrand, global } from "@/api";
import cityList from "@/utils/city";

export default {
  data() {
    return {
      valueInput: "",
      cityList: "", //城市列表
      showCity: false, //显示城市
      showPopup: false, //筛选
      hostRecommend: "热门推荐", // 热门推荐
      RecommendResult: 1, // 推荐结果 0 代表隐藏搜索筛选  1 代表 搜索筛选 2 代表搜索结果
      isLoading: false, //加载结果
      teacherType: "", //老师类型
      typeId: "", //老师类型ID
      teacherBrand: "", //老师品牌
      brandId: "", //老师品牌ID
      area: "", //地区
      teacherList: "" //老师搜索列表
    };
  },

  mounted() {
    this.cityList = cityList.cityAll;

    const name = this.$route.query.name;

    if (name) {
      this.valueInput = name;
      this.onSearch();
    }

    // 老师类型和品牌
    typeBrand().then(res => {
      if (res.code == 1) {
        const data = res.data;
        for (let i of data.type) {
          i.isActive = false;
        }
        for (let i of data.brand) {
          i.isActive = false;
        }

        this.teacherType = data.type;
        this.teacherBrand = data.brand;
      }
    });
  },

  methods: {
    // 开始搜索
    onSearch() {
      const data = {
        area: "",
        typeId: "",
        brandId: "",
        name: this.valueInput
      };

      teacherSearch(data).then(res => {
        if (res.code == 1) {
          if (res.data == false) {
            this.$toast("查询结果为空,请重新搜索");
          } else {
            for (let i of res.data) {
              i.avatar = global() + i.avatar;
            }
            this.teacherList = res.data;
          }
        }
      });
      this.showPopup = false;
      this.RecommendResult = 0;
      this.isLoading = true;
    },

    // 点击选择城市
    onSelectCity() {
      this.showPopup = false;
      this.showCity = true;
    },

    // 选择城市
    selectCity(value) {
      this.area = value;
      this.showCity = false;
      this.showPopup = true;
    },

    // 清空
    empty() {
      for (let i of this.teacherType) {
        i.isActive = false;
      }
      for (let i of this.teacherBrand) {
        i.isActive = false;
      }
      this.area = "";
      this.typeId = "";
      this.brandId = "";
    },

    // 查看
    check() {
      const data = {
        area: this.area,
        typeId: this.typeId,
        brandId: this.brandId
      };

      teacherSearch(data).then(res => {
        if (res.code == 1) {
          if (res.data == false) {
            this.$toast("查询结果为空,请重新搜索");
            return;
          }
          for (let i of res.data) {
            i.avatar = global() + i.avatar;
          }
          this.teacherList = res.data;
        }
      });

      this.showPopup = false;
      this.RecommendResult = 0;
      this.isLoading = true;
    },

    // 点击老师类型
    onClickTypeIndex(id) {
      this.typeId = id;
      this.check();
    },

    // 点击老师类型
    onClickType(index, id) {
      for (let i of this.teacherType) {
        i.isActive = false;
      }
      this.typeId = id;
      this.teacherType[index].isActive = true;
    },

    // 点击老师品牌
    onClickBrand(index, id) {
      for (let i of this.teacherBrand) {
        i.isActive = false;
      }
      this.brandId = id;
      this.teacherBrand[index].isActive = true;
    }
  },

  watch: {
    isLoading() {
      if (this.isLoading) {
        setTimeout(() => {
          this.isLoading = false;
          this.RecommendResult = 2;
        }, 1500);
      }
    }
  }
};
</script>

<style lang="scss">
.search {
  width: 100vw;
  height: 100vh;
  background: #fff;

  .active {
    color: #1989fa !important;
    background: #e1eaef !important;
  }

  .van-index-anchor--sticky {
    top: 9vw;
    height: 12vw;
    line-height: 12vw;
  }

  .van-search__action {
    line-height: 0;
  }

  .search-popup-wrap {
    padding: 0.3rem;
  }

  .search-popup-btn {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .van-button {
    border-bottom: 0;
    border-left: 0;
  }

  .search-loading {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  .van-loading__text {
    margin-left: 0;
    margin-top: 3vw;
    color: #0af;
  }

  .search-con {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10vw 0.3rem 0.1rem;
    box-shadow: 0 0 2px 1px #f1f1f1;
  }

  [class*="van-hairline"]::after {
    border: none;
  }

  .van-search {
    width: 100%;
  }
  .van-tag {
    margin-right: 0.4rem;
    margin-top: 0.2rem;
    background: #f5f5f5;
    color: #666;
    width: 2.2rem;
    text-align: center;
    padding: 0.2rem;
  }

  p {
    margin-bottom: 0.1rem;
    color: #333;
    font-size: 0.36rem;
  }

  // 老师列表
  .home-teacher-list {
    margin:0.3rem 0;
    padding: 2vw 0.2rem;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 0.35rem;
    // box-shadow: 0 0 10px 0 #f1f1f1;
    border-bottom:0.2rem solid #f9f9f9; 

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
      font-size: 0.3rem;
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