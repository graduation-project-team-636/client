<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>

      <el-form-item prop="checkPassword">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="checkPassword"
          v-model="registerForm.checkPassword"
          :type="passwordType"
          placeholder="重复密码"
          name="checkPassword"
          tabindex="3"
          auto-complete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>

      <el-form-item prop="name">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="name"
          v-model="registerForm.name"
          placeholder="昵称"
          name="name"
          type="text"
          tabindex="4"
          auto-complete="off"
          @keyup.enter.native="handleRegister"
        />
      </el-form-item>

      <div>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleRegister"
          >注册</el-button
        >
      </div>

      <div>
        <el-button
          type="success"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
          >前往登录页面
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length > 30) {
        callback(new Error("用户名不能超过30位"));
      } else if (value.length == 0) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于六位数"));
      } else {
        callback();
      }
    };
    const validateCheckPassword = (rule, value, callback) => {
      if (value != this.registerForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      if (value.length > 30) {
        callback(new Error("昵称不能超过30位"));
      } else if (value.length == 0) {
        callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        checkPassword: "",
        name: ""
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        checkPassword: [
          { required: true, trigger: "blur", validator: validateCheckPassword }
        ],
        name: [{ required: true, trigger: "blur", validator: validateName }]
      },
      passwordType: "password"
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          var registerParams = new FormData();
          registerParams.append("username", this.registerForm.username);
          registerParams.append("password", this.registerForm.password);
          registerParams.append("name", this.registerForm.name);

          var loginParams = new FormData();
          loginParams.append("username", this.registerForm.username);
          loginParams.append("password", this.registerForm.password);

          var config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          var registerUrl = this.$store.state.baseUrl + "/register/";
          var loginUrl = this.$store.state.baseUrl + "/login/";

          //缓存this指针
          var ThisMessage = this.$message;
          var ThisRouter = this.$router;
          var ThisAxios = this.axios;
          var ThisStore = this.$store;

          this.axios
            .post(registerUrl, registerParams, config)
            .then(function(response) {
              //用户名已存在
              if (response.data.error_code == 21) {
                ThisMessage.error(response.data.message);
              }
              // 成功
              else if (response.data.error_code == 0) {
                // 注册成功就直接登录
                ThisAxios.post(loginUrl, loginParams, config)
                  .then(function(response) {
                    // 登录成功
                    if (response.data.error_code == 0) {
                      ThisStore.commit("loginSet", response.data.data);
                      ThisRouter.push({ path: "/" });
                    } else {
                      ThisMessage.error(response.data.message);
                    }
                  })
                  .catch(function(error) {
                    ThisMessage.error(error);
                  });
              } else {
                ThisMessage.error("发生了未知错误");
              }
            })
            .catch(function(error) {
              ThisMessage.error(error);
            });
        } else {
          this.$message.error("输入不符合规范");
          return false;
        }
      });
    },
    handleLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 440px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 10px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  i {
    font-size: 17px;
  }

  .register_button {
    text-decoration: none;
    color: white;
  }
}
</style>
