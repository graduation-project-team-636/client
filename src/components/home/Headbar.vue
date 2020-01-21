<template>
  <div id="headbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b"
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
          <el-avatar :src="user_avatar"></el-avatar
        ></template>
        <router-link to="/admin/user/home">
          <el-menu-item index="3-1">个人中心</el-menu-item></router-link
        >
        <el-menu-item index="3-2">退出登录</el-menu-item>
      </el-submenu>

      <router-link to="/register" class="myButton">
        <el-menu-item index="5" style="float: right;"
          >注册</el-menu-item
        ></router-link
      >

      <router-link to="/login" class="myButton"
        ><el-menu-item index="4" style="float: right;"
          >登录</el-menu-item
        ></router-link
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "headbar",
  data() {
    return {
      activeIndex: "1",
      user_avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      alert(key, keyPath);
    }
  }
};
</script>

<style>
#headbar {
  padding: 0px;
  margin: 0px;
}
.rightAvator {
  float: right;
  margin-top: 11px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 20px;
}
.myButton {
  color: white;
  text-decoration: none;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
