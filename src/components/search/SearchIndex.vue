<template>
  <div class="search-index">
    <van-nav-bar
      title="选择城市"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-index-bar>
      <div v-for="(item, index) in cityList" :key="index">
        <van-index-anchor :index="item.name" />
        <van-cell v-for="(i, indexChild) in item.citys" :key="indexChild" :title="i" @click="selectCity(i)" />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import cityList from "@/utils/city";

export default {
  data() {
    return {
      cityList: ""
    };
  },

  mounted() {
    this.cityList = cityList.cityAll;
  },

    methods: {
        selectCity(value) {
            this.bus.$emit("SeletCitys", value);
            this.$router.go(-1)
        }
    }

};
</script>

<style lang="scss">
.search-index {
  width: 100vw;
  min-height: 100vh;
  padding-top: 8vw;

  .van-index-anchor--sticky {
    top: 19vw;
    height: 12vw;
    line-height: 12vw;
  }
}
</style>