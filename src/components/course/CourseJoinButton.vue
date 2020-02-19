<template>
  <div id="course_join_button">
    <el-button
      @click="buton_click_handle"
      class="course_button"
      icon="el-icon-caret-right"
      round
      >参加课程</el-button
    >
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入App里的reload方法
  data() {
    return {};
  },
  props: { course_id: Number },
  methods: {
    buton_click_handle() {
      var params = new FormData();
      params.append("course_id", this.course_id);

      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      var url = this.$store.state.baseUrl + "/course/attend/";

      //缓存this指针
      var self = this;

      this.axios
        .post(url, params, config)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.$message.success(self.$store.state.errorText0);
            self.reload();
          } else if (response.data.error_code == 13) {
            self.$message.error(self.$store.state.errorText13);
          } else if (response.data.error_code == 31) {
            self.$message.error(self.$store.state.errorText31);
          } else if (response.data.error_code == 32) {
            self.$message.success(self.$store.state.errorText32);
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
#course_join_button {
  .course_button {
    background-color: transparent;
    color: #cfd3d9;
  }
}
</style>
