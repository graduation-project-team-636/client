<template>
  <div id="headbar">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">看课网</el-menu-item>
      <el-submenu index="2">
        <template slot="title">课程分类</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>

      <el-submenu index="3" style="float: right;">
        <template slot="title">
          <el-avatar :src="user_avatar"></el-avatar
        ></template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-submenu>

      <div class="rightContainer">
        <router-link to="/login" class="myButton">登录</router-link>
        <span type="text" class="myButton">/</span>
        <router-link to="/register" class="myButton">注册</router-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "headbar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
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
.rightContainer {
  float: right;
  margin-top: 20px;
  margin-bottom: 19px;
  margin-left: 10px;
  margin-right: 10px;
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
