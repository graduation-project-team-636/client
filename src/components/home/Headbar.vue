<template>
  <div id="headbar">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      >

      <div class="rightAvator">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </div>

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
      activeIndex2: "1"
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
  text-decoration-line: none;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
