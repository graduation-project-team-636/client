<template>
  <div style="height: 100%;">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100%;"
    >
      <el-menu-item disabled>
        <span slot="title">个人设置</span>
      </el-menu-item>
      <router-link to="/admin/user/home" class="routeLink">
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <span slot="title">个人主页 </span>
        </el-menu-item>
      </router-link>
      <el-menu-item index="2">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">我的学习</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">我的投稿</span>
      </el-menu-item>

      <el-menu-item disabled>
        <span slot="title">系统设置</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-check"></i>
        <span slot="title">待审核</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      alert(key, keyPath);
    }
  }
};
</script>

<style>
.routeLink {
  text-decoration: none;
}
</style>
