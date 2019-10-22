<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      }

      if (to.meta.index == from.meta.index) {
        this.transitionName = "";
      }

      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style>
html {
  position: relative;
  background-color: #f7faff;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  font-size: 0.4rem;
}

h3,
p {
  margin: 0;
}

.van-nav-bar {
  padding-top: 8vw;
}

img {
  width: 100%;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.35s;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
