import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookie from "vue-cookie";

Vue.use(VueAxios, axios);
Vue.use(VueCookie);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
