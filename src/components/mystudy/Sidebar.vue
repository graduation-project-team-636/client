<template>
  <div id="mystudy_sidebar">
    <div class="sidebar_head_bg"><div class="sidebar_head">我的学习</div></div>

    <div class="block">
      <el-avatar
        :size="200"
        :src="avatar"
        style="border: #c0c4cc solid 1px; "
      ></el-avatar>
    </div>

    <div class="mystudy_info_block">
      <div class="info">
        <div class="profileItem">
          <i class="el-icon-user"></i>
          <span class="myspan"> 昵称：</span>{{ name }}
        </div>
        <div class="profileItem">
          <i class="el-icon-time"></i>
          <span class="myspan"> 注册时间：</span>{{ reg_time }}
        </div>
        <div class="profileItem">
          <i class="el-icon-s-custom"></i>
          <span class="myspan"> 性别：</span>{{ sex }}
        </div>
        <div class="profileItem">
          <i class="el-icon-location"></i>
          <span class="myspan"> 城市：</span>{{ city }}
        </div>
        <div class="profileItem">
          <i class="el-icon-edit-outline"></i>
          <span class="myspan"> 职业：</span>{{ occupation }}
        </div>
        <div class="profileItem">
          <i class="el-icon-headset"></i>
          <span class="myspan"> 爱好：</span>{{ hobby }}
        </div>
        <div class="profileItem">
          <i class="el-icon-edit"></i>
          <span class="myspan"> 个性签名：</span>{{ signature }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: "",
      name: "",
      reg_time: "",
      sex: "",
      city: "",
      occupation: "",
      hobby: "",
      signature: ""
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      var profileGetUrl = this.$store.state.baseUrl + "/user/profile/";
      var self = this;

      this.axios
        .get(profileGetUrl)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.avatar = response.data.data.avatar;
            self.name = response.data.data.name;
            self.reg_time = response.data.data.reg_time.split(" ")[0];

            if (response.data.data.sex == "1") {
              // 男
              self.sex = "男";
            } else {
              self.sex = "女";
            }

            self.city =
              response.data.data.city == "" ? "未知" : response.data.data.city;

            self.occupation =
              response.data.data.occupation == ""
                ? "未知"
                : response.data.data.occupation;

            self.hobby =
              response.data.data.hobby == "" ? "无" : response.data.data.hobby;

            self.signature =
              response.data.data.signature == ""
                ? "无"
                : response.data.data.signature;
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
    }
  }
};
</script>

<style lang="scss">
#mystudy_sidebar {
  padding-bottom: 20px;
  background-color: white;

  .info {
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
    font-size: 14px;
    color: #898989;
  }

  .profileItem {
    margin-top: 15px;
    line-height: 25px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .myspan {
    color: #2c3e50;
  }

  .sidebar_head_bg {
    line-height: 90px;
  }

  .sidebar_head {
    color: white;
    background-color: #2f3f60;
    font-size: 30px;
    margin: auto;
    text-align: center;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .block {
    margin-top: 25px;
    margin-left: 25px;
    overflow: hidden;
  }

  .mystudy_info_block {
    background-color: white;
  }
}
</style>
