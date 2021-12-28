import Vue from "vue";
import VueRouter from "vue-router";
import local from "@utils/local";
import Login from "../views/login/index.vue";
import Layout from "@components/Layout/index.vue";

// 解决重复跳转报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  // 登录页
  {
    path: "/login",
    component: Login,
    visible: false,
  },
  {
    path: "/",
    component: Login,
    visible: false,
  },
  // 404页面
  {
    path: "/404",
    component: () => import("../views/404.vue"),
    visible: false,
  },
  {
    path: "*",
    redirect: "/404",
    visible: false,
  },
];
const details = [
  // 点位评估
  {
    path: "/point_evaluation",
    component: Layout,
    visible: false,
    isOneMenu: true, //是否只显示一级菜单
    children: [
      {
        path: "/point_evaluation",
        icon: "el-icon-document",
        name: "点位评估",
        visible: true,
        component: () => import("../views/pointEvaluation/index.vue"),
      },
    ],
  },
  // 选址推荐
  {
    path: "/address_recommend",
    component: Layout,
    visible: false,
    isOneMenu: true, //是否只显示一级菜单
    redirect: "/address_recommend",
    children: [
      {
        path: "/address_recommend",
        icon: "el-icon-location-outline",
        name: "选址推荐",
        visible: true,
        component: () => import("../views/addressRecommend/index.vue"),
      },
    ],
  },
  // 我的任务
  {
    path: "/my_mission",
    component: Layout,
    visible: false,
    isOneMenu: true, //是否只显示一级菜单
    redirect: "/my_mission",
    children: [
      {
        path: "/my_mission",
        icon: "el-icon-s-order",
        name: "我的任务",
        visible: true,
        component: () => import("../views/myMission/index.vue"),
      },
      {
        path: "/recommend_report",
        name: "推荐指数报告",
        visible: false,
        component: () => import("../views/report/recommendReport.vue"),
      },
      {
        path: "/point_report",
        name: "评估报告",
        visible: false,
        component: () => import("../views/report/pointReport.vue"),
      },
    ],
  },
  // 个人设置
  {
    path: "/set",
    component: Layout,
    isOneMenu: false, //是否只显示一级菜单
    name: "个人设置",
    icon: "el-icon-setting",
    visible: true,
    children: [
      {
        path: "/personal_data",
        name: "个人资料",
        visible: true,
        component: () => import("../views/setting/personalData/index.vue"),
      },
      // {
      //   path: "/log_center",
      //   name: "日志中心",
      //   visible: true,
      //   component: () => import("../views/setting/logCenter/index.vue"),
      // },
    ],
  },
];

const router = new VueRouter({
  base: process.env.VUE_APP_folder,
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const userInfo = local.get("userInfo");
  let isLogin;
  // if (userInfo) {
  //   // isLogin = userInfo.token || ""; // 判断是否登录，登录后直接放行
  //   isLogin = userInfo.userCode || ""; // 判断是否登录，登录后直接放行
  // }
  isLogin = true;

  if (isLogin) {
    next(); // 登录后直接放行
  } else {
    if (to.path === "/login") {
      next(); // 用户去登录页面 直接放行
    } else {
      next("/login"); // 如果用户想访问别的页面  直接跳转到登录
    }
  }
  // next(); // 登录后直接放行
});

// //动态路由----任务管理(详情页面)
// const asyncRoutes = [...notFound];
local.set("menus", details);
router.addRoutes([...routes, ...details]);

export default router;
