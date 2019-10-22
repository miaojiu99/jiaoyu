import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const RouterModel = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        index: 1,
      }
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("./views/Shop.vue"),
      meta: {
        index: 1
      }
    },
    {
      path: "/quiz",
      name: "quiz",
      component: () => import("./views/Quiz.vue"),
      meta: {
        index: 1
      }
    },
    {
      path: "/quiz-content",
      name: "quiz-content",
      component: () => import("./views/QuizContent.vue"),
      meta: {
        index: 2
      }
    },
    {
      path: "/quiz-issue",
      name: "quiz-issue",
      component: () => import("./views/QuizIssue.vue"),
      meta: {
        index: 2
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        index: 0
      }
    },
    {
      path: "/login/forget",
      name: "forget",
      component: () => import("./views/Forget.vue"),
      meta: {
        index: -1
      }
    },
    {
      path: "/login/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      meta: {
        index: 1
      }
    },
    {
      path: "/my",
      name: "my",
      component: () => import("./views/My.vue"),
      meta: {
        index: 1
      }
    },

    {
      path: "/search",
      name: "search",
      component: () => import("@/components/search/search.vue"),
      meta: {
        index: 2
      }
    },

    // 列表详情
    {
      path: "/details",
      name: "details",
      component: () => import("@/components/details/details.vue"),
      meta: {
        index: 2
      }
    },

    {
      path: "/read",
      name: "read",
      component: () => import("@/components/details/read.vue"),
      meta: {
        index: 3
      }
    },

    {
      path: "/apply",
      name: "apply",
      component: () => import("@/components/apply/apply.vue"),
      meta: {
        index: 3
      }
    },

    {
      path: "/classy",
      name: "classy",
      component: () => import("@/components/class/classy.vue"),
      meta: {
        index: 3
      }
    },

    {
      path: "/info",
      name: "info",
      component: () => import("@/components/my/info.vue"),
      meta: {
        index: 2
      }
    },

    {
      path: "/amend",
      name: "amend",
      component: () => import("@/components/my/amend.vue"),
      meta: {
        index: 3
      }
    },

    {
      path: "/bank",
      name: "bank",
      component: () => import("@/components/my/bank.vue"),
      meta: {
        index: 4
      }
    },

    {
      path: "/deposit",
      name: "deposit",
      component: () => import("@/components/my/deposit.vue"),
      meta: {
        index: 2
      }
    },

    {
      path: "/balance",
      name: "balance",
      component: () => import("@/components/my/balance.vue"),
      meta: {
        index: 2
      }
    },

    {
      path: "/order",
      name: "order",
      component: () => import("@/components/my/order.vue"),
      meta: {
        index: 2
      }
    },

    {
      path: "/appraise",
      name: "appraise",
      component: () => import("@/components/my/appraise.vue"),
      meta: {
        index: 3
      }
    },

    {
      path: "/attention",
      name: "attention",
      component: () => import("@/components/my/attention.vue"),
      meta: {
        index: 3
      }
    },
    {
      path: "/bankall",
      name: "bankall",
      component: () => import("@/components/my/bankAll.vue"),
      meta: {
        index: 3
      }
    },
    
    // 我的文章
    {
      path: "/myarticle",
      name: "bankall",
      component: () => import("@/components/my/MyArticle.vue"),
      meta: {
        index: 2
      }
    },

    // 修改文章
    {
      path: "/setarticle",
      name: "setarticle",
      component: () => import("@/components/my/SetArticle.vue"),
      meta: {
        index: 3
      }
    },

    {
      path: "/article",
      name: "article",
      component: () => import("@/components/my/article.vue"),
      meta: {
        index: 2
      }
    },
    {
      path: "/searchindex",
      name: "searchindex",
      component: () => import("@/components/search/SearchIndex.vue"),
      meta: {
        index: 3
      }
    },

  ]
});

// 判断登录，当id为空，则跳转到登录页
RouterModel.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem("userID");
  if (!token) {
    if (!to.fullPath.startsWith("/login")) {
      next({ name: "login" });
      return;
    }
  } else if (to.name === "login") {
    next({ name: "home" });
    return;
  }
  next();
});

export default RouterModel;
