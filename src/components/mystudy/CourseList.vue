<template>
  <div id="mystudy_courselist">
    <el-card>
      <el-container>
        <el-aside width="200px"
          ><el-image :src="course_cover"></el-image
        ></el-aside>
        <el-main style="padding: 10px 20px 10px 20px;">
          <div class="mystudy_title">课程标题</div>
          <div class="mystudy_info">课程简介</div>
          <div class="mystudy_info">
            <div class="mystudy_attendence">
              参加人数 <i class="el-icon-user"></i>15354
            </div>
            <div class="mystudy_float">
              <el-button type="primary" round>继续学习</el-button
              ><el-button type="danger" round>退出课程</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course_cover:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  }
};
</script>

<style lang="scss">
#mystudy_courselist {
  .mystudy_title {
    font-size: 20px;
    font-weight: bold;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .mystudy_info {
    font-size: 15px;
    color: #999;
    margin-top: 15px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .mystudy_attendence {
    display: inline-block;
    margin-top: 13px;
  }

  .mystudy_float {
    display: block;
    float: right;
    margin-top: px;
  }
}
</style>
