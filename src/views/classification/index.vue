<template>
  <div id="classification">
    <el-row id="head">
      <el-col :span="24"><Headbar activeIndex="2"></Headbar></el-col>
    </el-row>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";

export default {
  name: "classification",
  components: {
    Headbar
  }
};
</script>

<style></style>
