<template>
  <div id="course_delete_button">
    <el-button
      class="course_button"
      @click="dialogVisible = true"
      icon="el-icon-delete"
      round
      >删除</el-button
    >

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除此课程？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirm_click_handle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  props: { course_id: Number },
  methods: {
    confirm_click_handle() {
      this.dialogVisible = false;

      var params = new FormData();
      params.append("course_id", this.course_id);

      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      var url = this.$store.state.baseUrl + "/course/delete/";

      var self = this;

      this.axios
        .post(url, params, config)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.$router.push({
              path: "/classification"
            });
          } else if (response.data.error_code == 13) {
            self.$message.error(this.$store.state.errorText13);
          } else if (response.data.error_code == 22) {
            self.$message.error(this.$store.state.errorText22);
          } else if (response.data.error_code == 31) {
            self.$message.error(this.$store.state.errorText31);
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
#course_delete_button {
  .course_button {
    background-color: transparent;
    color: #cfd3d9;
  }
}
</style>
