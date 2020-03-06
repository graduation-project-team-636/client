<template>
  <div id="video">
    <el-container style="height: 100%;">
      <el-header style="padding: 0px;"><Headbar></Headbar></el-header>
      <el-main style=" padding: 0px;"
        ><div class="video_main">
          <el-main style=" padding: 0px;"
            ><VideoPlayer
              :course_id="course_id"
              :video_id="video_id"
            ></VideoPlayer
          ></el-main>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import VideoPlayer from "@/components/video/VideoPlayer.vue";

export default {
  data() {
    return {
      course_id: 0,
      video_id: 0
    };
  },
  components: {
    Headbar,
    VideoPlayer
  },
  created() {
    // 获取参数时，应用created，不用mounted，否则无法及时将id传给子组件，子组件收到id始终为0
    this.course_id = parseInt(this.$route.query.course_id);
    this.video_id = parseInt(this.$route.query.video_id);
  }
};
</script>

<style lang="scss">
#video {
  height: 100%;
  background-color: #f3f5f7;

  .video_main {
    width: 1400px;
    margin: auto;
    height: 100%;
  }
}
</style>
