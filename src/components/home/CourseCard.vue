<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span class="courseTitle">课程标题</span>
            <div class="bottom clearfix">
              <div class="intro">
                参加人数 <i class="el-icon-user"></i>15354
              </div>
              <div class="intro">
                课程简介课程简介课程简介课程简介课程简介课程简介课程简介
              </div>
              <el-button type="text" class="button">参加课程</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "courseCard",
  data() {
    return {};
  }
};
</script>

<style>
.courseTitle {
  color: black;
}

.intro {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 160px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
