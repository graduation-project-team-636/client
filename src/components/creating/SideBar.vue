<template>
  <div id="creating_sidebar">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      style="height: 100%;"
    >
      <router-link
        to="/creating/course/create"
        class="creating_sidebar_routeLink"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">创建课程</span>
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
#creating_sidebar {
  height: 100%;

  .creating_sidebar_routeLink {
    text-decoration: none;
  }
}
</style>
