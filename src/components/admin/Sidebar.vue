<template>
  <div id="admin_sidebar" style="height: 100%;">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
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
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style lang="scss">
#admin_sidebar {
  .routeLink {
    text-decoration: none;
  }
}
</style>
