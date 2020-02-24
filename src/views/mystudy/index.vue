<template>
  <div id="mystudy">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"
        ><Headbar activeIndex="6"></Headbar
      ></el-header>
      <el-main style="padding: 0px;">
        <div class="main">
          <el-container style="background-color: white;">
            <el-aside
              width="250px"
              style="border-right: #c0c4cc solid 1px; padding-top: 20px;"
            >
              <Sidebar></Sidebar>
            </el-aside>

            <el-main>
              <div id="course_list">
                <CourseList
                  class="mystudy_courselist"
                  v-for="(course, index) in courses"
                  :key="index"
                  :course_id="course.course_id"
                  :course_name="course.course_name"
                  :course_introduction="course.course_introduction"
                  :course_category="course.course_category"
                  :course_tag="course.course_tag"
                  :course_cover="course.course_cover"
                  :course_attendance="course.course_attendance"
                ></CourseList>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import Sidebar from "@/components/mystudy/Sidebar.vue";
import CourseList from "@/components/mystudy/CourseList.vue";

export default {
  name: "mystudy",
  data() {
    return {
      courses: []
    };
  },
  components: {
    Headbar,
    Sidebar,
    CourseList
  },
  mounted() {
    this.getUserAttendCourse();
  },
  methods: {
    getUserAttendCourse() {
      var url = this.$store.state.baseUrl + "/course/attended_by_users/";
      var self = this;

      this.axios
        .get(url)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.courses = response.data.data.course;
          } else if (response.data.error_code == 13) {
            self.$message.error(self.$store.state.errorText13);
          } else {
            self.$message.error(self.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    }
  }
};
</script>

<style lang="scss">
#mystudy {
  height: 100%;
  background-color: #f3f5f7;

  .main {
    width: 1200px;
    height: 100%;
    margin: auto;
    background-color: white;
  }

  .mystudy_courselist {
    margin-bottom: 20px;
  }
}
</style>
