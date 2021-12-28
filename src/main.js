import Vue from "vue";
import App from "./App.vue";
import less from "less";
import router from "./router";
import store from "./store";
// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 全局filter
import filters from "./filters";

// 注册全局filter过滤
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(less);
Vue.config.productionTip = false;
// 防抖处理-立即执行
const on = Vue.prototype.$on;
Vue.prototype.$on = function (event, func) {
  let timer;
  let flag = true;
  let newFunc = func;
  if (event == "click") {
    newFunc = function () {
      if (flag) {
        func.apply(this, arguments);
        flag = false;
      }
      clearTimeout(timer);
      timer = setTimeout(function () {
        flag = true;
      }, 900);
    };
  }
  on.call(this, event, newFunc);
};
Vue.use(ElementUI);
Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$Bus = vm;
