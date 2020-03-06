<template>
  <div id="video_category_sideBar">
    <el-table
      border
      :data="tableData"
      style="width: 100%;"
      :header-cell-style="{
        background: '#fff0ed',
        color: 'black',
        height: '60px'
      }"
      :cell-style="{
        background: '#fffcf7',
        color: 'gray'
      }"
    >
      <el-table-column label="目录"
        ><template slot-scope="scope">
          <div
            @click.prevent="table_row_click_handle(scope.row)"
            v-bind:class="{
              table_row: scope.row.video_id != video_id,
              table_row_active: scope.row.video_id == video_id
            }"
          >
            <i class="el-icon-video-play"></i>
            <span style="margin-left: 8px"
              >{{ scope.row.video_name }} ({{
                scope.row.video_duration | secondsFormat
              }})</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入App里的reload方法
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getAllVideo();
  },
  props: { course_id: Number, video_id: Number },
  methods: {
    getAllVideo() {
      var myParams = {
        course_id: this.course_id
      };

      var url = this.$store.state.baseUrl + "/video/access";
      var self = this;

      this.axios
        .get(url, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.tableData = response.data.data.video;
          } else {
            self.$message.error(self.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    },
    table_row_click_handle(row) {
      if (row.video_id != this.video_id) {
        this.$router.push({
          path: "/video",
          query: { course_id: this.course_id, video_id: row.video_id }
        });
        this.reload();
      }
    }
  },
  filters: {
    secondsFormat: function(time) {
      var formatBit = function(val) {
        val = +val;
        return val > 9 ? val : "0" + val;
      };

      let min = Math.floor(time % 3600);
      let val =
        formatBit(Math.floor(time / 3600)) +
        ":" +
        formatBit(Math.floor(min / 60)) +
        ":" +
        formatBit(time % 60);
      return val;
    }
  }
};
</script>

<style lang="scss">
#video_category_sideBar {
  height: 100%;
  background-color: #fffcf7;

  .table_row:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .table_row_active {
    cursor: pointer;
    color: #b5544f;
    font-weight: bold;
  }
}
</style>
