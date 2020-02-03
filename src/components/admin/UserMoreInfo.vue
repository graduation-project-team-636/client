<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="infoRules"
      auto-complete="off"
    >
      <el-form-item prop="name" label="昵称">
        <el-input ref="name" v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="城市">
        <el-cascader
          size="large"
          :options="form.options"
          v-model="form.selecteCitys"
        >
        </el-cascader>
      </el-form-item>

      <el-form-item label="职业">
        <el-select v-model="form.occupation" placeholder="请选择职业">
          <el-option label="Python工程师" value="Python工程师"></el-option>
          <el-option label="Web前端工程师" value="Web前端工程师"></el-option>
          <el-option label="JS工程师" value="JS工程师"></el-option>
          <el-option label="PHP开发工程师" value="PHP开发工程师"></el-option>
          <el-option label="JAVA开发工程师" value="JAVA开发工程师"></el-option>
          <el-option label="移动开发工程师" value="移动开发工程师"></el-option>
          <el-option label="软件测试工程师" value="软件测试工程师"></el-option>
          <el-option label="产品经理" value="产品经理"></el-option>
          <el-option label="UI设计师" value="UI设计师"></el-option>
          <el-option label="算法工程师" value="算法工程师"></el-option>
          <el-option label="学生" value="学生"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="爱好">
        <el-input type="textarea" v-model="form.hobby"></el-input>
      </el-form-item>

      <el-form-item label="个性签名">
        <el-input type="textarea" v-model="form.signature"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";

export default {
  data() {
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
      form: {
        name: "",
        sex: "1",
        options: regionData,
        selecteCitys: [],
        occupation: "",
        hobby: "",
        signature: ""
      },
      infoRules: {
        name: [{ required: true, trigger: "blur", validator: validateName }]
      }
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
            self.form.name = response.data.data.name;
            self.form.sex = response.data.data.sex;

            // 城市数据需处理一下，数据库存的是城市名，需转化为代号
            self.form.selecteCitys = self.getCityCode(response.data.data.city);

            self.form.occupation = response.data.data.occupation;
            self.form.hobby = response.data.data.hobby;
            self.form.signature = response.data.data.signature;
          }
          // 用户未登录
          else if (response.data.error_code == 13) {
            self.$message.error("用户未登录");
          } else {
            self.$message.error("发生了未知错误");
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var profileUpdateParams = new FormData();
          profileUpdateParams.append("name", this.form.name);
          profileUpdateParams.append("sex", this.form.sex);

          var cityText = this.getCityText();
          profileUpdateParams.append("city", cityText);

          profileUpdateParams.append("occupation", this.form.occupation);
          profileUpdateParams.append("hobby", this.form.hobby);
          profileUpdateParams.append("signature", this.form.signature);

          var config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          var profileUpdateUrl =
            this.$store.state.baseUrl + "/user/profile/update";

          var self = this;

          this.axios
            .post(profileUpdateUrl, profileUpdateParams, config)
            .then(function(response) {
              // 成功
              if (response.data.error_code == 0) {
                self.form.name = response.data.data.name;
                self.form.sex = response.data.data.sex;

                // 城市数据需处理一下，数据库存的是城市名，需转化为代号
                self.form.selecteCitys = self.getCityCode(
                  response.data.data.city
                );

                self.form.occupation = response.data.data.occupation;
                self.form.hobby = response.data.data.hobby;
                self.form.signature = response.data.data.signature;

                self.$message.success("修改成功");
              }
              // 用户未登录
              else if (response.data.error_code == 13) {
                self.$message.error("用户未登录");
              } else {
                self.$message.error("发生了未知错误");
              }
            })
            .catch(function(error) {
              self.$message.error(error);
            });
        } else {
          this.$message.error("输入不符合规范!!");
        }
      });
    },
    getCityText() {
      var loc = "";
      for (let i = 0; i < this.form.selecteCitys.length; i++) {
        loc += CodeToText[this.form.selecteCitys[i]];
        if (i < this.form.selecteCitys.length - 1) {
          loc += " ";
        }
      }
      return loc;
    },
    getCityCode(cityText) {
      var codeArray = [];
      if (cityText != "") {
        var cityArray = cityText.trim().split(" ");

        if (cityArray.length == 1) {
          codeArray.push(TextToCode[cityArray[0]].code);
        } else if (cityArray.length == 2) {
          codeArray.push(TextToCode[cityArray[0]].code);
          codeArray.push(TextToCode[cityArray[0]][cityArray[1]].code);
        } else if (cityArray.length == 3) {
          codeArray.push(TextToCode[cityArray[0]].code);
          codeArray.push(TextToCode[cityArray[0]][cityArray[1]].code);
          codeArray.push(
            TextToCode[cityArray[0]][cityArray[1]][cityArray[2]].code
          );
        }
      }

      return codeArray;
    }
  }
};
</script>

<style></style>
