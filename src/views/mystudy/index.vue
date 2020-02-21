<template>
  <div id="mystudy">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"
        ><Headbar activeIndex="6"></Headbar
      ></el-header>
      <el-main style="padding: 0px;">
        <div class="main">
          <el-container style="background-color: white; height: 100%">
            <el-aside
              width="250px"
              style="border-right: #c0c4cc solid 1px; padding-top: 20px;"
              ><div class="block">
                <el-avatar
                  :size="200"
                  :src="avatar"
                  style="border: #c0c4cc solid 1px; "
                ></el-avatar>
              </div>

              <div class="mystudy_info_block">
                <div class="info">
                  <div class="profileItem">
                    <i class="el-icon-user"></i>
                    <span class="myspan"> 昵称：</span>{{ name }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-time"></i>
                    <span class="myspan"> 注册时间：</span>{{ reg_time }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-s-custom"></i>
                    <span class="myspan"> 性别：</span>{{ sex }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-location"></i>
                    <span class="myspan"> 城市：</span>{{ city }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-edit-outline"></i>
                    <span class="myspan"> 职业：</span>{{ occupation }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-headset"></i>
                    <span class="myspan"> 爱好：</span>{{ hobby }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-edit"></i>
                    <span class="myspan"> 个性签名：</span>{{ signature }}
                  </div>
                </div>
              </div>
            </el-aside>

            <el-main
              ><CourseList
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
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import CourseList from "@/components/mystudy/CourseList.vue";

export default {
  name: "mystudy",
  data() {
    return {
      avatar: "",
      name: "",
      reg_time: "",
      sex: "",
      city: "",
      occupation: "",
      hobby: "",
      signature: "",
      courses: []
    };
  },
  components: {
    Headbar,
    CourseList
  },
  mounted() {
    this.getUserProfile();
    this.getUserAttendCourse();
  },
  methods: {
    getUserProfile() {
      var profileGetUrl = this.$store.state.baseUrl + "/user/profile/";
      var self = this;

      this.axios
        .get(profileGetUrl)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.avatar = response.data.data.avatar;
            self.name = response.data.data.name;
            self.reg_time = response.data.data.reg_time.split(" ")[0];

            if (response.data.data.sex == "1") {
              // 男
              self.sex = "男";
            } else {
              self.sex = "女";
            }

            self.city =
              response.data.data.city == "" ? "未知" : response.data.data.city;

            self.occupation =
              response.data.data.occupation == ""
                ? "未知"
                : response.data.data.occupation;

            self.hobby =
              response.data.data.hobby == "" ? "无" : response.data.data.hobby;

            self.signature =
              response.data.data.signature == ""
                ? "无"
                : response.data.data.signature;
          }
          // 用户未登录
          else if (response.data.error_code == 13) {
            self.$message.error(self.$store.state.errorText13);
          } else {
            self.$message.error(self.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
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

  .block {
    margin-left: 25px;
    overflow: hidden;
  }

  .mystudy_info_block {
    margin-left: 5px;
    margin-right: 5px;
  }

  .main {
    width: 1200px;
    height: 100%;
    margin: auto;
    background-color: white;
  }

  .info {
    margin-top: 25px;
    margin-left: 10px;
    font-size: 16px;
    color: #898989;
  }

  .profileItem {
    margin-top: 15px;
    line-height: 26px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  .myspan {
    color: #2c3e50;
  }
}
</style>
