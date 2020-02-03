import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //baseUrl: "http://120.77.146.251:8000/api", // api请求地址
    baseUrl: "http://localhost:8000/api",
    isLogin: false,
    user_id: 0, // 0表示没有用户登录
    username: "",
    groupid: 2, //用户组，1为管理员，2为普通用户
    reg_time: "",
    avatar: "" //用户头像
  },
  mutations: {
    avatarSet(state, param) {
      state.avatar = param;
    },
    loginSet(state, params) {
      state.isLogin = true;
      state.user_id = params.user_id;
      state.username = params.username;
      state.groupid = params.groupid;
      state.avatar = params.avatar;
      state.reg_time = params.reg_time;
    },
    logoutSet(state) {
      state.isLogin = false;
      state.user_id = 0;
      state.username = "";
      state.groupid = 2;
      state.avatar = "";
      state.reg_time = "";
    }
  },
  actions: {},
  modules: {}
});
