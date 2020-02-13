<template>
  <div id="creating">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"
        ><Headbar activeIndex="7"></Headbar
      ></el-header>
      <el-main style="padding: 0px;"
        ><div class="creating_main">
          <el-container style="background-color: white;">
            <el-aside width="200px"><SideBar></SideBar></el-aside>
            <el-main><router-view></router-view></el-main>
          </el-container></div
      ></el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import SideBar from "@/components/creating/SideBar.vue";

export default {
  name: "creating",
  components: {
    Headbar,
    SideBar
  }
};
</script>

<style lang="scss">
#creating {
  height: 100%;
  background-color: #f3f5f7;

  .creating_main {
    width: 1200px;
    height: 100%;
    margin: auto;
    background-color: white;
  }
}
</style>
