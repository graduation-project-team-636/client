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
    avatar: "", //用户头像

    //一下是返回错误码对应的错误信息
    errorText0: "操作成功",
    errorText11: "用户名不存在",
    errorText12: "密码不正确",
    errorText13: "请先登录",
    errorText21: "用户名已存在",
    errorText22: "您不是管理员",
    errorTextUnknown: "发生了未知错误",
    errorTextInput: "输入不符合规范"
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
