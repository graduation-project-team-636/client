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
              <el-aside
                width="250px"
                style="padding: 0px 0px 1px 0px; margin: 0px; border: none; background-color: #26303f;"
              >
                <Sidebar></Sidebar
              ></el-aside>
              <el-main style="padding: 0px; margin: 0px; border: none;"
                ><Carousel></Carousel
              ></el-main>
            </el-container>
          </div>

          <div>
            <div>
              <h2>热门课程</h2>
              <div v-if="seenNothing"><Nothing></Nothing></div>

              <div
                v-for="(course, index) in hotest_course_data"
                :key="index"
                v-bind:class="{
                  home_coursecard: (index + 1) % 4 != 0,
                  home_coursecard_last: (index + 1) % 4 == 0
                }"
              >
                <CourseCard
                  :course_id="course.course_id"
                  :course_name="course.course_name"
                  :course_introduction="course.course_introduction"
                  :course_category="course.course_category"
                  :course_tag="course.course_tag"
                  :course_cover="course.course_cover"
                  :course_attendance="course.course_attendance"
                ></CourseCard>
              </div>
            </div>

            <div>
              <h2>最新课程</h2>
              <div v-if="seenNothing"><Nothing></Nothing></div>

              <div
                v-for="(course, index) in newest_course_data"
                :key="index"
                v-bind:class="{
                  home_coursecard: (index + 1) % 4 != 0,
                  home_coursecard_last: (index + 1) % 4 == 0
                }"
              >
                <CourseCard
                  :course_id="course.course_id"
                  :course_name="course.course_name"
                  :course_introduction="course.course_introduction"
                  :course_category="course.course_category"
                  :course_tag="course.course_tag"
                  :course_cover="course.course_cover"
                  :course_attendance="course.course_attendance"
                ></CourseCard>
              </div>
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
import Nothing from "@/components/home/Nothing.vue";
import Carousel from "@/components/home/Carousel.vue";
import CourseCard from "@/components/home/CourseCard.vue";

export default {
  name: "home_main",
  data() {
    return {
      newest_course_data: [],
      hotest_course_data: []
    };
  },
  components: {
    Headbar,
    Sidebar,
    Carousel,
    CourseCard,
    Nothing
  },
  mounted() {
    this.get_newest_course_data();
    this.get_hotest_course_data();
  },
  methods: {
    get_newest_course_data() {
      var myParams = {
        // 选择全部时，把tag_all变为all，category_all变为all，其它值则不变
        course_category: "all",
        course_tag: "all",
        order: 1,
        page: 1
      };

      var courseDataUrl = this.$store.state.baseUrl + "/course/access";
      var self = this;

      this.axios
        .get(courseDataUrl, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.newest_course_data = self.myslice(
              response.data.data.course,
              0,
              8
            );
          } else {
            self.$message.error(this.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    get_hotest_course_data() {
      var myParams = {
        // 选择全部时，把tag_all变为all，category_all变为all，其它值则不变
        course_category: "all",
        course_tag: "all",
        order: 2,
        page: 1
      };

      var courseDataUrl = this.$store.state.baseUrl + "/course/access";
      var self = this;

      this.axios
        .get(courseDataUrl, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            // 只需要拿8个数据
            self.hotest_course_data = self.myslice(
              response.data.data.course,
              0,
              8
            );
          } else {
            self.$message.error(this.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    myslice(array, start, end) {
      var result = [];
      // 首先判断end是否越界,start不作判断，调用时统一为0
      if (end > array.length) {
        result = array;
      } else {
        for (var i = start; i < end; i++) {
          result.push(array[i]);
        }
      }
      return result;
    }
  },
  computed: {
    seenNothing() {
      if (this.newest_course_data.length == 0) {
        return true;
      } else {
        return false;
      }
    }
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
