<template>
  <div class="classify">
    <van-nav-bar title="分类" left-arrow @click-left="$router.go(-1)" />

    <section>
      <van-sidebar v-model="activeKey" @change="changeActiveKey">
        <van-sidebar-item
          :title="i.grade"
          v-for="(i, index) in teacherTypeList"
          :key="index"
        />
      </van-sidebar>
      <div class="especially">
        <img src="@/assets/images/sad.png" class="classify-img" />
        <div class="classify-content">
          <van-divider :style="{ color: '#f95341', borderColor: '#ccc', padding: '0 50px'}" >{{content.grade}}</van-divider>
          <a></a>
          <van-tag
            plain
            size="medium"
            v-for="(item, indexItme) in content.type"
            :key="indexItme"
            @click="$router.push({name: 'search', query: {id: item.type_id, name: 1}})"
          >{{item.type}}</van-tag>
        </div>
      </div>
    </section>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="graphic" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="award" to="/quiz">学堂</van-tabbar-item>
      <van-tabbar-item icon="manager" to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { teacherTypeWrap } from "@/api";

export default {
  data() {
    return {
      teacherTypeList: "",
      active: 1,

      content: '',

      activeKey: 0,
      offsetTopArr: []
    };
  },
  mounted() {
    const THAT = this;

    setTimeout(() => {
      let especially = document.getElementsByClassName("especially")[0];
      if (especially.getElementsByClassName("classify-content")) {
        var a = especially.getElementsByClassName("classify-content");
        for (let i of a) {
          this.offsetTopArr.push(i.offsetTop);
        }
      }
    }, 1500);

    function debounce(fn, wait) {
      var timeout = null;
      return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      };
    }
    // 处理函数
    function handle() {
      let target = document.documentElement.scrollTop;
      if (target) {
        for (let i in THAT.offsetTopArr) {
          if (target < THAT.offsetTopArr[i]) {
            THAT.activeKey = i++;
            return;
          }
        }
      }
    }

    this.init();
  },

  methods: {
    init() {
      teacherTypeWrap().then(res => {
        if (res.code == 1) {
          let number = 0;
          this.teacherTypeList = res.data.grade;
          this.content = this.teacherTypeList[this.activeKey]
          console.log(this.content)
          console.log(this.teacherTypeList);
        }
      });
    },

    changeActiveKey(value) {
      this.activeKey = value;
      this.content = this.teacherTypeList[value]
    }
  }
};
</script>

<style lang="scss">
.classify {
  width: 100vw;
  min-height: 100vh;
  background: #fff;

  section {
    
    display: flex;
  }

  .especially {
    padding-bottom: 20vh;
  }
.classify-img{
  width: 70vw;padding: 0.4rem;
  padding-bottom: 0;
}
  .classify-content {
    padding: 0.4rem 0rem 0.4rem 0.4rem;
    width: 72vw;

    a {
      display: block;
    }
.van-grid-item__content{
      padding: 8px;
      P{
        font-size: 14px;
        color: #333;
        margin-top: 0.2rem;
      }
    }
.van-divider{
      margin: 0;
    }
  }

  .van-sidebar {
    width: 24vw;
    position: sticky;
    top: 19vw;
    height: 85vh;
background: #fafafa;
  }
  .van-sidebar-item{
    text-align: center;
  }
.van-sidebar-item--select{
    border-color: #ff8c68;
  }
  .van-tag {
    margin: 0.2rem 0.4rem 0.2rem 0;
    background: #fff;
    color: #666;
    width: 1.6rem;
    text-align: center;
    padding: 0.2rem;
  }
}
</style>