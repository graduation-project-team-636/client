<template>
  <div id="course_edit_button">
    <el-button
      class="course_edit_button_style"
      @click="edit_button_click_handle"
      icon="el-icon-setting"
      round
      >编辑</el-button
    >

    <el-dialog title="课程信息" width="700px" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="课程简介" prop="introduction">
          <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
        </el-form-item>

        <el-form-item label="课程分区" prop="category">
          <el-select
            @change="category_change_handle"
            v-model="ruleForm.category"
            placeholder="请选择课程分区"
          >
            <el-option
              v-for="category_data in category_datas"
              :key="category_data.code"
              :label="category_data.text"
              :value="category_data.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程标签" prop="tag">
          <el-select v-model="ruleForm.tag" placeholder="请选择课程标签">
            <el-option
              v-for="tag_data in tag_datas"
              :key="tag_data.code"
              :label="tag_data.text"
              :value="tag_data.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            v-model="ruleForm.coverFile"
          >
            <img
              v-if="ruleForm.coverUrl"
              :src="ruleForm.coverUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
    const validateCover = (rule, value, callback) => {
      if (this.ruleForm.coverFile == "") {
        callback(new Error("请选择课程封面"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      // 用户是否有上传图片，没有的话，按原课程图片上传
      isUploadImg: false,
      ruleForm: {
        name: "",
        introduction: "",
        category: "",
        tag: "",
        coverUrl: "",
        coverFile: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请填写课程简介", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择课程分区", trigger: "change" }
        ],
        tag: [{ required: true, message: "请选择课程标签", trigger: "change" }],
        cover: [{ required: true, trigger: "change", validator: validateCover }]
      },
      category_datas: [],
      tag_datas: [],
      tag_origin_datas: []
    };
  },
  props: { course_id: Number },
  mounted() {
    this.category_datas = this.get_category_tag_data(
      this.$store.state.category_origin_datas
    );
    this.tag_origin_datas = this.get_category_tag_data(
      this.$store.state.tag_origin_datas
    );
  },
  methods: {
    get_category_tag_data(origin_data) {
      var result = [];
      //原始数据去除第一个“全部”
      for (var i = 1; i < origin_data.length; i++) {
        result.push(origin_data[i]);
      }
      return result;
    },
    edit_button_click_handle() {
      //打开dialog
      this.dialogFormVisible = true;

      //每次打开都重置数据
      this.isUploadImg = false;
      this.getCourseInfo();
    },
    getCourseInfo() {
      var myParams = {
        course_id: this.course_id
      };

      var courseInfoUrl = this.$store.state.baseUrl + "/course/query";
      var self = this;

      this.axios
        .get(courseInfoUrl, { params: myParams })
        .then(function(response) {
          self.ruleForm.name = response.data.data.course_name;
          self.ruleForm.introduction = response.data.data.course_introduction;
          self.ruleForm.category = response.data.data.course_category;
          self.ruleForm.tag = response.data.data.course_tag;
          self.ruleForm.coverUrl = response.data.data.course_cover;

          // 注意，由于使用了promise，有异步同步问题，必须在then语句发生后，data才有数据
          self.category_change_handle();

          // 将返回的图片url转化为blob对象，后面可以以file参数填充到formdata
          self.imgUrlToFile(self.ruleForm.coverUrl);
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    category_change_handle() {
      if (this.ruleForm.category == "fe") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 0, 12);
      } else if (this.ruleForm.category == "be") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 12, 25);
      } else if (this.ruleForm.category == "mobile") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 25, 29);
      } else if (this.ruleForm.category == "bdata") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 29, 37);
      } else if (this.ruleForm.category == "db") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 37, 44);
      } else if (this.ruleForm.category == "3d") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 44, 50);
      }
    },
    imgUrlToFile(url) {
      var self = this;
      var imgLink = url;
      var tempImage = new Image();
      //如果图片url是网络url，要加下一句代码
      tempImage.crossOrigin = "*";
      tempImage.onload = function() {
        var base64 = self.getBase64Image(tempImage);
        var imgblob = self.base64toBlob(base64);
        var filename = self.getFileName(self.ruleForm.coverUrl);
        self.ruleForm.coverFile = self.blobToFile(imgblob, filename);
      };
      tempImage.src = imgLink;
    },
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },
    base64toBlob(base64) {
      let arr = base64.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    blobToFile(blob, filename) {
      // edge浏览器不支持new File对象，所以用一下方法兼容
      blob.lastModifiedDate = new Date();
      blob.name = filename;
      return blob;
    },
    getFileName(url) {
      // 获取到文件名
      let pos = url.lastIndexOf("/"); // 查找最后一个/的位置
      return url.substring(pos + 1); // 截取最后一个/位置到字符长度，也就是截取文件名
    },
    myslice(array, start, end) {
      var result = [];
      for (var i = start; i < end; i++) {
        result.push(array[i]);
      }
      return result;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      } else {
        this.ruleForm.coverFile = file;
        this.imagePreview(this.ruleForm.coverFile);
        this.isUploadImg = true;
      }

      // 不使用upload自带的上传方式，而是使用axios，所以阻止upload自带的上传
      return false;
    },
    imagePreview: function(file) {
      var self = this;
      //定义一个文件阅读器
      var reader = new FileReader();
      //文件装载后将其显示在图片预览里
      reader.onload = function(e) {
        //将bade64位图片保存至数组里供上面图片显示
        self.ruleForm.coverUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;

          var modifyUrl = this.$store.state.baseUrl + "/course/modify/";

          var modifyParams = new FormData();
          modifyParams.append("course_id", this.course_id);
          modifyParams.append("course_name", this.ruleForm.name);
          modifyParams.append(
            "course_introduction",
            this.ruleForm.introduction
          );
          modifyParams.append("course_category", this.ruleForm.category);
          modifyParams.append("course_tag", this.ruleForm.tag);
          if (this.isUploadImg) {
            modifyParams.append("course_cover", this.ruleForm.coverFile);
          } else {
            var filename = this.getFileName(this.ruleForm.coverUrl);
            modifyParams.append(
              "course_cover",
              this.ruleForm.coverFile,
              filename
            );
          }

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
              } else if (response.data.error_code == 31) {
                self.$message.error(self.$store.state.errorText31);
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
#course_edit_button {
  .course_edit_button_style {
    background-color: transparent;
    color: #cfd3d9;
  }

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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
