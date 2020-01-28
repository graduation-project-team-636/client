<template>
  <div id="userhome">
    <div>
      <el-row class="head">
        <el-col><UserBaseInfo></UserBaseInfo> </el-col>
      </el-row>
      <el-row>
        <el-col class="divide"></el-col>
      </el-row>
      <el-row class="main">
        <el-col><UserMoreInfo></UserMoreInfo> </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserBaseInfo from "@/components/admin/UserBaseInfo.vue";
import UserMoreInfo from "@/components/admin/UserMoreInfo.vue";

export default {
  name: "userhome",
  components: {
    UserBaseInfo,
    UserMoreInfo
  }
};
</script>

<style>
.head {
  margin-left: 100px;
  width: 1000px;
}
.main {
  margin-left: 50px;
  width: 1000px;
}
.divide {
  height: 1px;
  background-color: gray;
  margin-top: 30px;
  margin-bottom: 50px;
}
</style>
