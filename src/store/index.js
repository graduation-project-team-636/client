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
    errorTextInput: "输入不符合规范",

    category_origin_datas: [
      { text: "全部", code: "category_all" },
      { text: "前端", code: "fe" },
      { text: "后端", code: "be" },
      { text: "移动", code: "mobile" },
      { text: "云计算&大数据", code: "bdata" },
      { text: "运维&数据库", code: "db" },
      { text: "动画&游戏", code: "3d" }
    ],
    tag_origin_datas: [
      // 前端
      { text: "全部", code: "tag_all" },
      { text: "HTML/CSS", code: "htmlcss" },
      { text: "JavaScript", code: "js" },
      { text: "Vue.js", code: "vue" },
      { text: "React.JS", code: "react" },
      { text: "Angular", code: "angular" },
      { text: "Node.js", code: "node" },
      { text: "jQuery", code: "jquery" },
      { text: "Bootstrap", code: "bootstrap" },
      { text: "Sass/Less", code: "sassless" },
      { text: "WebApp", code: "webapp" },
      { text: "小程序", code: "wxprogram" },
      { text: "前端工具", code: "fetool" },
      // 后端
      { text: "Java", code: "java" },
      { text: "SpringBoot", code: "springboot" },
      { text: "Spring Cloud", code: "springcloud" },
      { text: "SSM", code: "ssm" },
      { text: "Python", code: "python" },
      { text: "爬虫", code: "pachong" },
      { text: "Django", code: "django" },
      { text: "Go", code: "go" },
      { text: "PHP", code: "php" },
      { text: "C", code: "c" },
      { text: "C++", code: "c++" },
      { text: "C#", code: "c#" },
      { text: "Ruby", code: "ruby" },
      //移动
      { text: "Android", code: "android" },
      { text: "iOS", code: "ios" },
      { text: "React native", code: "reactnative" },
      { text: "WEEX", code: "weex" },
      // 云计算大数据
      { text: "大数据", code: "bigdata" },
      { text: "Hadoop", code: "hadoop" },
      { text: "Spark", code: "spark" },
      { text: "Hbase", code: "hbase" },
      { text: "Storm", code: "storm" },
      { text: "云计算", code: "cloudcompute" },
      { text: "AWS", code: "aws" },
      { text: "Docker", code: "docker" },
      //运维数据库
      { text: "Linux", code: "linux" },
      { text: "MySQL", code: "mysql" },
      { text: "Redis", code: "redis" },
      { text: "MongoDB", code: "mongodb" },
      { text: "Oracle", code: "oracle" },
      { text: "SQL Server", code: "sqlserver" },
      { text: "NoSql", code: "nosql" },
      //动画游戏
      { text: "模型制作", code: "modelcreate" },
      { text: "设计基础", code: "designbase" },
      { text: "设计工具", code: "designtool" },
      { text: "动效动画", code: "activephoto" },
      { text: "Unity 3D", code: "unity3d" },
      { text: "Cocos2d-x", code: "Cocos2dx" }
    ]
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
