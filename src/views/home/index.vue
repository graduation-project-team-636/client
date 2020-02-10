<template>
  <div class="home">
    <el-row id="head">
      <el-col :span="24"><Headbar activeIndex="1"></Headbar></el-col>
    </el-row>

    <el-row id="display" :gutter="0" type="flex" justify="center">
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="3"
        ><Sidebar></Sidebar
      ></el-col>
      <el-col :xs="24" :sm="18" :md="15" :lg="14" :xl="11"
        ><Carousel></Carousel
      ></el-col>
    </el-row>

    <el-row id="recommend" :gutter="0" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14"
        ><div>
          <div>
            <h2>热门课程</h2>
            <CourseCard></CourseCard>
          </div>

          <div>
            <h2>最新课程</h2>
            <CourseCard></CourseCard>
          </div></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
// @ 相当于 /src
import Headbar from "@/components/home/Headbar.vue";
import Sidebar from "@/components/home/Sidebar.vue";
import Carousel from "@/components/home/Carousel.vue";
import CourseCard from "@/components/home/CourseCard.vue";

export default {
  name: "home",
  components: {
    Headbar,
    Sidebar,
    Carousel,
    CourseCard
  }
};
</script>

<style>
#display {
  margin-top: 20px;
}
</style>
