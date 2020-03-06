<template>
  <div id="admin_userbaseinfo">
    <div class="left">
      <el-upload
        class="avatar-uploader"
        :action="actionUrl"
        :show-file-list="false"
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
        <span class="myspan">用户组：</span> {{ group }}
      </div>
      <div class="profileItem">
        <span class="myspan">注册时间：</span> {{ reg_time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actionUrl: this.$store.state.baseUrl + "/user/avatar_change",
      imageUrl: "",
      username: "",
      group: "",
      reg_time: ""
    };
  },
  mounted() {
    this.userProfileGet();
  },
  methods: {
    userProfileGet() {
      var profileGetUrl = this.$store.state.baseUrl + "/user/profile/";
      var self = this;

      this.axios
        .get(profileGetUrl)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.imageUrl = response.data.data.avatar;
            self.username = response.data.data.username;

            if (response.data.data.groupid == 2) {
              self.group = "普通用户";
            } else if (response.data.data.groupid == 1) {
              self.group = "管理员";
            }

            self.reg_time = response.data.data.reg_time;
          }
          // 用户未登录
          else if (response.data.error_code == 13) {
            self.$message.error(self.$store.state.errorText13);
          } else {
            self.$message.error(self.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      } else if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      } else {
        var avatarParams = new FormData();
        avatarParams.append("avatar", file);

        //缓存this指针
        var ThisMessage = this.$message;
        var self = this;

        var config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };

        this.axios
          .post(this.actionUrl, avatarParams, config)
          .then(function(response) {
            if (response.data.error_code == 0) {
              self.imageUrl = response.data.data.avatar;
              self.$store.commit("avatarSet", response.data.data.avatar);
              ThisMessage.success(self.$store.state.errorText0);
            } else if (response.data.error_code == 13) {
              ThisMessage.error(self.$store.state.errorText13);
            } else {
              ThisMessage.error(self.$store.state.errorTextUnknown);
            }
          })
          .catch(function(error) {
            ThisMessage.error(error);
          });
      }

      // 不使用upload自带的上传方式，而是使用axios，所以阻止upload自带的上传
      return false;
    }
  },
  computed: {}
};
</script>

<style lang="scss">
#admin_userbaseinfo {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
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
}
</style>
