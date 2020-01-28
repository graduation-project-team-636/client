import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: "http://120.77.146.251:8000", // api请求地址
    user_id: 0, // 0表示没有用户登录
    avatar: "http://120.77.146.251:8000/media/avatars/default.png" //用户头像
  },
  mutations: {
    avatarSet(state, params) {
      state.avatar = params;
    },
    userIdSet(state, params) {
      state.user_id = params;
    }
  },
  actions: {},
  modules: {}
});
