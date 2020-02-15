<template>
  <div id="admin">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"
        ><Headbar activeIndex="3-1"></Headbar
      ></el-header>
      <el-container>
        <el-aside width="200px">
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
          </div></el-aside
        >
        <el-container>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";

export default {
  components: {
    Headbar
  }
};
</script>

<style lang="scss">
#admin {
  height: 100%;

  #admin_sidebar {
    .routeLink {
      text-decoration: none;
    }
  }
}
</style>
