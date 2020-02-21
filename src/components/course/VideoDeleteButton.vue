<template>
  <div id="video_delete_button">
    <el-button size="mini" type="danger" @click="handleDelete(tableScope.row)"
      >删除</el-button
    >

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除此视频？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirm_click_handle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入App里的reload方法
  data() {
    return {
      dialogVisible: false,
      video_id: 0
    };
  },
  props: { tableScope: Object },
  methods: {
    /*row: {
      "video_id": 1,
      "video_name": "aaa",
      "video_duration": 3600,
      "video_data": "http://120.77.146.251:8000/media/xxx"
    }*/
    handleDelete(row) {
      this.dialogVisible = true;
      this.video_id = row.video_id;
    },
    confirm_click_handle() {
      var params = new FormData();
      params.append("video_id", this.video_id);

      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      var url = this.$store.state.baseUrl + "/video/delete/";

      var self = this;

      this.axios
        .post(url, params, config)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.$message.success(self.$store.state.errorText0);
            self.reload();
          } else if (response.data.error_code == 13) {
            self.$message.error(self.$store.state.errorText13);
          } else if (response.data.error_code == 22) {
            self.$message.error(self.$store.state.errorText22);
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
#video_delete_button {
}
</style>
