<template>
  <div id="video_player">
    <el-container>
      <el-header style="padding: 0px;">
        <el-card>
          <el-page-header @back="goBack" :content="video_name"></el-page-header>
        </el-card>
      </el-header>
      <el-container>
        <el-main style="padding: 0px;">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @timeupdate="onPlayerTimeupdate($event)"
            @ready="playerReadied"
          ></video-player>
        </el-main>
        <el-aside width="300px">
          <VideoCategorySideBar
            :course_id="course_id"
            :video_id="video_id"
          ></VideoCategorySideBar>
        </el-aside>
      </el-container>
    </el-container>

    <div class="ppt_bar">
      <el-scrollbar
        style="height: 100%; overflow-y: hidden; white-space: nowrap;"
        ><el-image
          v-for="ppt in ppts"
          :key="ppt.ppt_image"
          :src="ppt.ppt_image"
          v-on:click="ppt_image_click_handle(ppt.ppt_positon)"
          class="ppt_image"
          lazy
        ></el-image
      ></el-scrollbar>
    </div>
  </div>
</template>

<script>
import VideoCategorySideBar from "@/components/video/VideoCategorySideBar.vue";

export default {
  data() {
    return {
      video_name: "",
      player_position: 0,
      myPlayer: "", // 获取播放器对象
      ppts: [],
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            //type: "video/mp4",
            //url地址
            src: ""
          }
        ],
        //你的封面地址
        poster: "",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      }
    };
  },
  props: { course_id: Number, video_id: Number },
  components: {
    VideoCategorySideBar
  },
  mounted() {
    this.getVideoInfo();
    this.getPPT();
  },
  methods: {
    getVideoInfo() {
      var myParams = {
        video_id: this.video_id
      };

      var url = this.$store.state.baseUrl + "/video/query";
      var self = this;

      this.axios
        .get(url, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.video_name = response.data.data.video_name;
            self.playerOptions.sources[0].src = response.data.data.video_data;
          } else {
            self.$message.error(self.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    getPPT() {
      var myParams = {
        video_id: this.video_id
      };

      var url = this.$store.state.baseUrl + "/video/getppt";
      var self = this;

      this.axios
        .get(url, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.ppts = response.data.data.ppt;
          } else {
            self.$message.error(this.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    goBack() {
      this.$router.push({
        path: "/course",
        query: { course_id: this.course_id }
      });
    },
    //当前播放位置发生变化时触发。
    onPlayerTimeupdate(player) {
      this.player_position = player.cache_.currentTime;
    },
    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      // seek to 10s
      this.myPlayer = player;
    },
    ppt_image_click_handle(ppt_positon) {
      this.myPlayer.currentTime(ppt_positon);
    }
  }
};
</script>

<style lang="scss">
#video_player {
  .ppt_bar {
    margin-top: 10px;
    height: 160px;
    border-top: solid lightgray 1px;
    border-bottom: solid lightgray 1px;
    background-color: #fffcf7;
    padding-top: 10px;

    .ppt_image {
      padding: 0px;
      margin: 0px;
      border: 0px;
      width: 200px;
      height: 134px;
    }
  }
}
</style>
