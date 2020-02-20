<template>
  <div id="mystudy_courselist">
    <el-card>
      <el-container>
        <el-aside width="150px"
          ><el-image :src="course_cover"></el-image
        ></el-aside>
        <el-main style="padding: 10px 20px 10px 20px;">
          <div class="mystudy_title">{{ course_name }}</div>
          <div class="mystudy_info">{{ course_introduction }}</div>
          <div class="mystudy_info">
            <div class="mystudy_attendence">
              参加人数 <i class="el-icon-user"></i>{{ course_attendance }}
            </div>
            <div class="mystudy_float">
              <el-button type="primary" round @click="keep_learn_click_handle"
                >继续学习</el-button
              ><el-button type="danger" round @click="exit_course_click_handle"
                >退出课程</el-button
              >
            </div>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入App里的reload方法
  data() {
    return {};
  },
  props: {
    course_id: Number,
    course_name: String,
    course_introduction: String,
    course_category: String,
    course_tag: String,
    course_cover: String,
    course_attendance: Number
  },
  methods: {
    keep_learn_click_handle() {
      this.$router.push({
        path: "/course",
        query: { course_id: this.course_id }
      });
    },
    exit_course_click_handle() {
      var params = new FormData();
      params.append("course_id", this.course_id);

      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      var url = this.$store.state.baseUrl + "/course/withdraw/";

      //缓存this指针
      var self = this;

      this.axios
        .post(url, params, config)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.$message.success(self.$store.state.errorText0);
            self.reload();
          } else if (response.data.error_code == 13) {
            self.$message.success(self.$store.state.errorText13);
          } else if (response.data.error_code == 31) {
            self.$message.success(self.$store.state.errorText31);
          } else if (response.data.error_code == 33) {
            self.$message.success(self.$store.state.errorText33);
          } else {
            self.$message.success(self.$store.state.errorTextUnknown);
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
#mystudy_courselist {
  .mystudy_title {
    font-size: 20px;
    font-weight: bold;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .mystudy_info {
    font-size: 15px;
    color: #999;
    margin-top: 15px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .mystudy_attendence {
    display: inline-block;
    margin-top: 13px;
  }

  .mystudy_float {
    display: block;
    float: right;
    margin-top: px;
  }
}
</style>
