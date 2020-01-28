<template>
  <div>
    <div class="left">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="right">
      <div class="profileItem">
        <span class="myspan">用户名：</span>{{ username }}
      </div>
      <div class="profileItem">
        <span class="myspan">用户组：</span>
      </div>
      <div class="profileItem">
        <span class="myspan">注册时间：</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username: "1234564"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
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
.left {
  float: left;
}
.right {
  float: left;
  margin-top: 25px;
  margin-left: 25px;
  font-size: 14px;
  color: #898989;
}
.profileItem {
  margin-top: 10px;
}
.myspan {
  color: #2c3e50;
}
</style>
