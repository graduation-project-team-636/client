<template>
  <div id="home_sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2d3a4b"
      text-color="#ccc"
      active-text-color="#ffd04b"
      style="padding:0px; margin: 0px; border: none;"
    >
      <router-link to="/classification" class="myButton">
        <el-menu-item index="1">
          <span slot="title">前端 / 小程序 / JS</span>
          <span style="float: right;"><i class="el-icon-caret-right"></i></span>
        </el-menu-item>
      </router-link>

      <router-link to="/classification" class="myButton">
        <el-menu-item index="2">
          <span slot="title">后端 / JAVA / Python</span>
          <span style="float: right;"><i class="el-icon-caret-right"></i></span>
        </el-menu-item>
      </router-link>

      <router-link to="/classification" class="myButton">
        <el-menu-item index="3">
          <span slot="title">移动 / Android / IOS</span>
          <span style="float: right;"><i class="el-icon-caret-right"></i></span>
        </el-menu-item>
      </router-link>

      <router-link to="/classification" class="myButton">
        <el-menu-item index="4">
          <span slot="title">云计算 / 大数据 / 容器</span>
          <span style="float: right;"><i class="el-icon-caret-right"></i></span>
        </el-menu-item>
      </router-link>

      <router-link to="/classification" class="myButton">
        <el-menu-item index="5">
          <span slot="title">运维 / 测试 / 数据库</span>
          <span style="float: right;"><i class="el-icon-caret-right"></i></span>
        </el-menu-item>
      </router-link>

      <router-link to="/classification" class="myButton">
        <el-menu-item index="6">
          <span slot="title"> UI设计 / 3D动画 / 游戏</span>
          <span style="float: right;"><i class="el-icon-caret-right"></i></span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      alert(key, keyPath);
    },
    handleClose(key, keyPath) {
      alert(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
#home_sidebar {
  border: none;
  padding: 0px;
  margin: 0px;

  .myButton {
    text-decoration: none;
  }
}
</style>
