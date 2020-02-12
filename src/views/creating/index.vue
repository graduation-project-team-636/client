<template>
  <div>
    <el-container>
      <el-header style="padding:0px;"
        ><Headbar activeIndex="7"></Headbar
      ></el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";

export default {
  name: "creating",
  components: {
    Headbar
  }
};
</script>

<style></style>
