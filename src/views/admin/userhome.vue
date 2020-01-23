<template>
  <div id="userhome">
    <el-row>
      <el-col><UserBaseInfo></UserBaseInfo> </el-col>
    </el-row>

    <el-row>
      <el-col><UserMoreInfo></UserMoreInfo> </el-col>
    </el-row>
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

<style></style>
