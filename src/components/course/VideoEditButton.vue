<template>
  <div id="video_edit_button">
    <el-button size="mini" @click="handleEdit(tableScope.row)">编辑</el-button>

    <el-dialog title="上传视频" width="700px" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="视频名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入App里的reload方法
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        video_id: 0,
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入视频名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      }
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
    handleEdit(row) {
      this.dialogFormVisible = true;

      //每次打开都重置数据
      this.ruleForm.video_id = row.video_id;
      this.ruleForm.name = row.video_name;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var modifyUrl = this.$store.state.baseUrl + "/video/modify/";

          var modifyParams = new FormData();
          modifyParams.append("video_id", this.ruleForm.video_id);
          modifyParams.append("video_name", this.ruleForm.name);

          var self = this;

          var config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          this.axios
            .post(modifyUrl, modifyParams, config)
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
        } else {
          this.$message.error(this.$store.state.errorTextInput);
        }
      });
    }
  }
};
</script>

<style lang="scss">
#video_edit_button {
}
</style>
