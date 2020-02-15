<template>
  <div id="home_headbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="border: none;"
    >
      <router-link to="/"
        ><el-menu-item index="1" style="float: left;"
          >看课网</el-menu-item
        ></router-link
      >

      <router-link to="/classification">
        <el-menu-item index="2" style="float: left;"
          >课程分类</el-menu-item
        ></router-link
      >

      <el-submenu index="3" style="float: right;">
        <template slot="title">
          <el-avatar :src="avatar" :fit="avatarFit"></el-avatar
        ></template>
        <router-link to="/admin/user/home" class="myButton">
          <el-menu-item index="3-1"
            ><i class="el-icon-user"></i>个人中心</el-menu-item
          ></router-link
        >
        <el-menu-item v-on:click="handleLogout"
          ><i class="el-icon-caret-right"></i>退出登录</el-menu-item
        >
      </el-submenu>

      <router-link v-if="seenLogout" to="/register" class="myButton">
        <el-menu-item index="5" style="float: right;"
          >注册</el-menu-item
        ></router-link
      >

      <router-link v-if="seenLogout" to="/login" class="myButton"
        ><el-menu-item index="4" style="float: right;"
          >登录</el-menu-item
        ></router-link
      >

      <router-link v-if="seenLogin" to="/mystudy" class="myButton"
        ><el-menu-item index="6" style="float: right;"
          >我的学习</el-menu-item
        ></router-link
      >

      <router-link
        v-if="seenLogin"
        to="/creating/course/create"
        class="myButton"
      >
        <el-menu-item index="7" style="float: right;"
          >创作中心</el-menu-item
        ></router-link
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "home_headbar",
  data() {
    return {
      avatar: "",
      avatarFit: "cover"
    };
  },
  props: { activeIndex: String },
  mounted() {
    this.handleIfLogin();
  },
  watch: {
    // 监听用户头像是否修改
    "$store.state.avatar": function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.avatar = newValue;
      }
    }
  },
  methods: {
    handleIfLogin() {
      // 如果有用户登录
      if (this.$store.state.isLogin) {
        this.avatar = this.$store.state.avatar;
      }
    },
    handleLogout() {
      // 退出登录
      var logoutUrl = this.$store.state.baseUrl + "/logout/";

      var self = this;

      this.axios
        .post(logoutUrl)
        .then(function(response) {
          // 成功
          if (response.data.error_code == 0) {
            self.$store.commit("logoutSet");
            self.$router.push({ path: "/" });
          } else if (response.data.error_code == 13) {
            self.$message.error(self.$store.state.errorText13);
          } else {
            self.$message.error(self.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    }
  },
  computed: {
    seenLogin() {
      return this.$store.state.isLogin;
    },
    seenLogout() {
      return !this.$store.state.isLogin;
    }
  }
};
</script>

<style lang="scss">
#home_headbar {
  padding: 0px;
  margin: 0px;

  .myButton {
    color: white;
    text-decoration: none;
  }
}
</style>
