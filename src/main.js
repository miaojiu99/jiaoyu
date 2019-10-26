import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Vant from "vant";
import "vant/lib/index.css";

import { Lazyload } from 'vant';
Vue.use(Lazyload);


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
Vue.use(VueAwesomeSwiper)


Vue.prototype.bus = new Vue();


Vue.use(Vant);

import "amfe-flexible";

Vue.config.productionTip = false;

// window.apiready = function() {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
// };
