<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="昵称">
        <el-input v-model="form.name"></el-input>
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
          v-model="form.selectedOptions"
          @change="handleChange"
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
import { regionData, CodeToText } from "element-china-area-data";

export default {
  data() {
    return {
      form: {
        name: "",
        sex: "1",
        options: regionData,
        selectedOptions: [],
        occupation: "",
        hobby: "",
        signature: ""
      }
    };
  },
  methods: {
    onSubmit() {
      alert("submit!");
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.form.selectedOptions.length; i++) {
        loc += CodeToText[this.form.selectedOptions[i]];
        if (i < this.form.selectedOptions.length - 1) {
          loc += " ";
        }
      }
      alert(loc);
    }
  }
};
</script>

<style></style>
