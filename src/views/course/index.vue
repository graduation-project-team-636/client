<template>
  <div id="course">
    <el-container style="height: 100%;">
      <el-header style="padding: 0px;"><Headbar></Headbar></el-header>
      <el-main style="padding: 0px;"
        ><div class="course_head">
          <div class="course_main">
            <el-container style="padding-top: 20px;">
              <el-aside width="200px"
                ><el-image class="image" :src="course_cover"></el-image
              ></el-aside>

              <el-main style="padding:0px;">
                <el-container style="padding: 10px 20px 10px 20px;">
                  <el-aside width="750px"
                    ><div class="course_title">
                      {{ course_name }}
                    </div>
                    <div class="course_info">{{ course_introduction }}</div>
                    <div class="course_attendence">
                      参加人数 <i class="el-icon-user"></i>
                      {{ course_attendance }}
                    </div>
                  </el-aside>
                  <el-main style="padding: 0px;">
                    <div v-if="seenManager" class="course_button_div1">
                      <CourseDeleteButton
                        :course_id="course_id"
                      ></CourseDeleteButton>
                    </div>
                    <div v-if="seenManager" class="course_button_div1">
                      <CourseEditButton
                        :course_id="course_id"
                      ></CourseEditButton>
                    </div>

                    <div v-if="seenLogin" class="course_button_div2">
                      <CourseJoinButton
                        :course_id="course_id"
                      ></CourseJoinButton>
                    </div>
                  </el-main>
                </el-container>
              </el-main>
            </el-container>
          </div>
        </div>

        <div class="course_table">
          <div v-if="seenManager" class="course_table_upload">
            <VideoUploadButton :course_id="course_id"></VideoUploadButton>
          </div>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="时长" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.video_duration | secondsFormat
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="视频标题" width="870">
              <template slot-scope="scope">
                <span
                  class="course_video_title"
                  @click="video_title_click_handle(scope.row)"
                  >{{ scope.row.video_name }}</span
                >
              </template>
            </el-table-column>
            <el-table-column v-bind:label="tableLastColumn">
              <template slot-scope="scope">
                <VideoEditButton
                  v-if="seenManager"
                  :tableScope="scope"
                  class="table_button"
                ></VideoEditButton>
                <VideoDeleteButton
                  v-if="seenManager"
                  :tableScope="scope"
                  class="table_button"
                ></VideoDeleteButton>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import CourseEditButton from "@/components/course/CourseEditButton.vue";
import CourseDeleteButton from "@/components/course/CourseDeleteButton.vue";
import CourseJoinButton from "@/components/course/CourseJoinButton.vue";
import VideoUploadButton from "@/components/course/VideoUploadButton.vue";
import VideoEditButton from "@/components/course/VideoEditButton.vue";
import VideoDeleteButton from "@/components/course/VideoDeleteButton.vue";

export default {
  data() {
    return {
      course_id: 0,
      course_name: "",
      course_introduction: "",
      course_category: "",
      course_tag: "",
      course_cover: "",
      course_attendance: 0,
      tableData: []
    };
  },
  components: {
    Headbar,
    CourseEditButton,
    CourseDeleteButton,
    CourseJoinButton,
    VideoUploadButton,
    VideoEditButton,
    VideoDeleteButton
  },
  mounted() {
    this.getCourseInfo();
    this.getAllVideo();
  },
  methods: {
    getCourseInfo() {
      var myParams = {
        course_id: this.$route.query.course_id
      };

      var courseInfoUrl = this.$store.state.baseUrl + "/course/query";
      var self = this;

      this.axios
        .get(courseInfoUrl, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.course_id = response.data.data.course_id;
            self.course_name = response.data.data.course_name;
            self.course_introduction = response.data.data.course_introduction;
            self.course_category = response.data.data.course_category;
            self.course_tag = response.data.data.course_tag;
            self.course_cover = response.data.data.course_cover;
            self.course_attendance = response.data.data.course_attendance;
          } else if (response.data.error_code == 31) {
            self.$message.error(this.$store.state.errorText31);
          } else {
            self.$message.error(this.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    getAllVideo() {
      var myParams = {
        course_id: this.$route.query.course_id
      };

      var url = this.$store.state.baseUrl + "/video/access";
      var self = this;

      this.axios
        .get(url, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.tableData = response.data.data.video;
          } else {
            self.$message.error(self.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    video_title_click_handle(video) {
      this.$router.push({
        path: "/video",
        query: { course_id: this.course_id, video_id: video.video_id }
      });
    }
  },
  computed: {
    seenManager() {
      if (this.$store.state.isLogin == true && this.$store.state.groupid == 1) {
        return true;
      } else {
        return false;
      }
    },
    tableLastColumn() {
      if (this.$store.state.isLogin == true && this.$store.state.groupid == 1) {
        return "操作";
      } else {
        return "";
      }
    },
    seenLogin() {
      return this.$store.state.isLogin;
    }
  },
  filters: {
    secondsFormat: function(time) {
      var formatBit = function(val) {
        val = +val;
        return val > 9 ? val : "0" + val;
      };

      let min = Math.floor(time % 3600);
      let val =
        formatBit(Math.floor(time / 3600)) +
        ":" +
        formatBit(Math.floor(min / 60)) +
        ":" +
        formatBit(time % 60);
      return val;
    }
  }
};
</script>

<style lang="scss">
#course {
  height: 100%;

  .course_head {
    background-color: #2f3f60;
    height: 200px;
  }

  .course_main {
    width: 1200px;
    height: 100%;
    color: white;
    margin: auto;
    background-color: #2f3f60;
  }

  .image {
    width: 100%;
    height: 150px;
  }

  .course_table {
    width: 1200px;
    color: white;
    margin: auto;
  }

  .course_table_upload {
    float: right;
    margin-right: 18px;
    margin-top: 20px;
  }

  .course_title {
    font-size: 22px;
    font-weight: bold;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .course_info {
    font-size: 15px;
    color: white;
    margin-top: 14px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .course_attendence {
    color: #cfd3d9;
    margin-top: 13px;
  }

  .course_button {
    background-color: transparent;
    color: #cfd3d9;
  }

  .course_button_div1 {
    display: inline-block;
    margin-left: 10px;
  }

  .course_button_div2 {
    margin-top: 30px;
    margin-left: 87px;
  }

  .table_button {
    float: left;
    margin-right: 9px;
  }

  .course_video_title:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
