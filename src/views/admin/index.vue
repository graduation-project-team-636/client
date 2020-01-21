<template>
  <div id="admin">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"><Headbar></Headbar></el-header>
      <el-container>
        <el-aside width="200px"> <Sidebar></Sidebar></el-aside>
        <el-container>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import Sidebar from "@/components/admin/Sidebar.vue";
export default {
  components: {
    Headbar,
    Sidebar
  }
};
</script>

<style>
#admin {
  height: 100%;
}
</style>
