<template>
  <div id="home">
    <el-container style="height: 100%;">
      <el-header style="padding: 0px;"
        ><Headbar activeIndex="1"></Headbar
      ></el-header>
      <el-main>
        <div id="home_main">
          <div>
            <el-container>
              <el-aside width="250px" style="padding: 0px 0px 1px 0px;">
                <Sidebar></Sidebar
              ></el-aside>
              <el-main style="padding: 0px;"><Carousel></Carousel></el-main>
            </el-container>
          </div>

          <div>
            <div>
              <h2>热门课程</h2>
              <div class="home_coursecard">
                <CourseCard></CourseCard>
              </div>
              <div class="home_coursecard">
                <CourseCard></CourseCard>
              </div>
              <div class="home_coursecard">
                <CourseCard></CourseCard>
              </div>
              <div class="home_coursecard_last">
                <CourseCard></CourseCard>
              </div>
              <div class="home_coursecard">
                <CourseCard></CourseCard>
              </div>
              <div class="home_coursecard">
                <CourseCard></CourseCard>
              </div>
              <div class="home_coursecard">
                <CourseCard></CourseCard>
              </div>
              <div class="home_coursecard_last">
                <CourseCard></CourseCard>
              </div>
            </div>

            <div>
              <h2>最新课程</h2>
              <div class="home_coursecard"><CourseCard></CourseCard></div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ 相当于 /src
import Headbar from "@/components/home/Headbar.vue";
import Sidebar from "@/components/home/Sidebar.vue";
import Carousel from "@/components/home/Carousel.vue";
import CourseCard from "@/components/home/CourseCard.vue";

export default {
  name: "home_main",
  components: {
    Headbar,
    Sidebar,
    Carousel,
    CourseCard
  }
};
</script>

<style lang="scss">
#home {
  height: 100%;

  #home_main {
    width: 1200px;
    margin: auto;
  }

  .home_coursecard {
    width: 250px;
    display: inline-block;
    margin-right: 66px;
    margin-bottom: 20px;
  }

  .home_coursecard_last {
    width: 250px;
    display: inline-block;
    margin-right: 0px;
    margin-bottom: 20px;
  }
}
</style>
