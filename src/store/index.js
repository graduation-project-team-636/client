import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: "http://120.77.146.251:8000", // api请求地址
    isLogin: false,
    user_id: 0, // 0表示没有用户登录
    username: "0",
    groupid: 2, //用户组，1为管理员，2为普通用户
    reg_time: "",
    avatar: "http://120.77.146.251:8000/media/avatars/default.png" //用户头像
  },
  mutations: {
    avatarSet(state, param) {
      state.avatar = param;
    },
    loginSet(state, params) {
      state.user_id = params.user_id;
      state.username = params.username;
      state.groupid = params.groupid;
      state.avatar = params.avatar;
      state.reg_time = params.reg_time;
      if (state.user_id != 0) {
        state.isLogin = true;
      }
    }
  },
  actions: {},
  modules: {}
});
