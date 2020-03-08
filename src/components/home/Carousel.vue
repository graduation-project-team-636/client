<template>
  <div id="home_carousel">
    <el-carousel height="337px" trigger="click">
      <el-carousel-item v-for="url in imgUrls" :key="url">
        <el-image
          style="width: 100%; height: 100%;"
          :src="url"
          fit="cover"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [
        require("../../assets/c++.png"),
        require("../../assets/fe.png"),
        require("../../assets/java_be.png"),
        require("../../assets/java_learn.png")
      ]
    };
  }
};
</script>

<style lang="scss">
#home_carousel {
  border: none;
  padding: 0px;
  width: 100%;
  height: 100%;
  margin: 0;

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
