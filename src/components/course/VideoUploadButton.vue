<template>
  <div id="video_upload_button">
    <el-button type="danger" @click="upload_button_click_handle"
      >上传视频</el-button
    >

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

        <el-form-item label="视频文件" prop="video">
          <el-upload
            class="upload-demo"
            ref="upload"
            action
            :before-upload="beforeUploadVideo"
            :on-change="handleChange"
            :file-list="fileList"
            :auto-upload="true"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >

            <div slot="tip" class="el-upload__tip">
              支持多种视频格式，大小不超过500MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div v-if="progressSeen">
        <el-progress
          :text-inside="true"
          :stroke-width="15"
          :percentage="progress"
          status="success"
        ></el-progress>
      </div>

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
    const validateVideo = (rule, value, callback) => {
      if (this.ruleForm.videoFile == "") {
        callback(new Error("请选择视频文件"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      fileList: [],
      progress: 0,
      progressSeen: false,
      ruleForm: {
        name: "",
        videoDuration: 0,
        videoFile: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入视频名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        video: [{ required: true, trigger: "change", validator: validateVideo }]
      }
    };
  },
  props: { course_id: Number },
  watch: {
    dialogFormVisible: function(newVal) {
      if (newVal == false) {
        // 每次关闭dialog都重置数据
        this.fileList = [];
        this.ruleForm.name = "";
        this.ruleForm.videoDuration = "";
        this.ruleForm.videoFile = "";
      }
    }
  },
  methods: {
    upload_button_click_handle() {
      this.dialogFormVisible = true;
    },
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]];
    },
    beforeUploadVideo(file) {
      //上传前回调
      var fileSize = file.size / 1024 / 1024 < 500;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("不支持此视频格式");
        this.fileList = [];
      } else if (!fileSize) {
        this.$message.error("视频大小不能超过500MB");
        this.fileList = [];
      } else {
        this.ruleForm.videoFile = file;
        this.getVideoDuration(file);
      }

      // 不使用upload自带的上传方式，而是使用axios，所以阻止upload自带的上传
      return false;
    },
    getVideoDuration(file) {
      var url = URL.createObjectURL(file);
      var audioElement = new Audio(url);
      var self = this;
      var result;
      audioElement.addEventListener("loadedmetadata", function() {
        // 有异步同步问题，视频时长值的获取要等到这个匿名函数执行完毕才产生
        result = audioElement.duration; //时长为秒，小数，182.36
        self.ruleForm.videoDuration = parseInt(result); //转为int值
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //显示进度
          this.progressSeen = true;

          var params = new FormData();
          params.append("course_id", this.course_id);
          params.append("video_name", this.ruleForm.name);
          params.append("video_duration", this.ruleForm.videoDuration);
          params.append("video_data", this.ruleForm.videoFile);

          var config = {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
              var complete =
                ((progressEvent.loaded / progressEvent.total) * 100) | 0;
              this.progress = complete;
            }
          };

          var url = this.$store.state.baseUrl + "/video/upload/";

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
#video_upload_button {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>
