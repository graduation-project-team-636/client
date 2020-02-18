<template>
  <div id="home_coursecard">
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="course_cover" class="image" />
          <div style="padding: 14px;">
            <span class="courseTitle">{{ course_name }}</span>
            <div class="bottom clearfix">
              <div class="intro">
                参加人数 <i class="el-icon-user"></i>{{ course_attendance }}
              </div>
              <div class="intro">
                {{ course_introduction }}
              </div>
              <el-button type="text" class="button">管理</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home_coursecard",
  data() {
    return {};
  },
  props: {
    course_id: Number,
    course_name: String,
    course_introduction: String,
    course_category: String,
    course_tag: String,
    course_cover: String,
    course_attendance: Number
  }
};
</script>

<style lang="scss">
#home_coursecard {
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
}
</style>
