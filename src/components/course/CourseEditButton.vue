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
            action=""
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
    this.category_datas = this.$store.state.category_origin_datas;
    //原始数据去除第一个“全部”
    this.category_datas.shift();
    this.tag_origin_datas = this.$store.state.tag_origin_datas;
    this.tag_origin_datas.shift();
  },
  methods: {
    edit_button_click_handle() {
      //打开dialog
      this.dialogFormVisible = true;

      //每次打开都重置数据
      this.getCourseInfo();
      this.category_change_handle();
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
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    category_change_handle() {
      if (this.ruleForm.category == "fe") {
        alert(1);
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
