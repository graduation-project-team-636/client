import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookie from "vue-cookie";
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";

Vue.use(VueAxios, axios);
Vue.use(VueCookie);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

Vue.use(VideoPlayer);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// 路由跳转前检测是否登录，未登录的话不能进入一些页面
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin == true) {
    if (store.state.isLogin == true) {
      // 已登录可进入
      next();
    } else {
      // 未登录则进入登陆页面
      next({
        path: "/login"
      });
    }
  } else {
    // 确保一定要调用next()
    next();
  }
});
