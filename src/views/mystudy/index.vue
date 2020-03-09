<template>
  <div id="mystudy">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"
        ><Headbar activeIndex="6"></Headbar
      ></el-header>
      <el-main style="padding: 0px;">
        <div class="main">
          <el-container>
            <el-aside width="250px">
              <Sidebar></Sidebar>
            </el-aside>

            <el-main
              ref="mainElement"
              style="background-color: white; margin-left: 20px;"
            >
              <div v-if="seenNothing"><Nothing></Nothing></div>

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
import Nothing from "@/components/home/Nothing.vue";
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
    Nothing,
    Sidebar,
    CourseList
  },
  mounted() {
    this.getCourseThenSetHeight();
  },
  methods: {
    async getCourseThenSetHeight() {
      // await 只能出现在 async 函数中
      await this.getUserAttendCourse();
      this.setMainHeight();
    },
    setMainHeight() {
      if (this.courses.length <= 3) {
        this.$refs.mainElement.$el.style.height =
          document.documentElement.clientHeight - 60 + "px";
      }
    },
    getUserAttendCourse() {
      return new Promise(resolve => {
        var url = this.$store.state.baseUrl + "/course/attended_by_users/";
        var self = this;

        this.axios
          .get(url)
          .then(function(response) {
            if (response.data.error_code == 0) {
              self.courses = response.data.data.course;
              // 一定要有resolve(xxx)，如果不通过resolve返回任何值，就resolve()
              resolve();
            } else if (response.data.error_code == 13) {
              self.$message.error(self.$store.state.errorText13);
            } else {
              self.$message.error(self.$store.state.errorTextUnknown);
            }
          })
          .catch(function(error) {
            self.$message.error(error);
          });
      });
    }
  },
  computed: {
    mainHeight() {
      // 若列表高度不占满全屏，则设置占满
      // 课程列表数少于等于三个时，会占不满
      if (this.courses.length <= 3) {
        return document.documentElement.clientHeight - 60 + "px";
      } else {
        return 0;
      }
    },
    seenNothing() {
      if (this.courses.length == 0) {
        return true;
      } else {
        return false;
      }
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
    margin: auto;
  }

  .mystudy_courselist {
    margin-bottom: 20px;
  }
}
</style>
