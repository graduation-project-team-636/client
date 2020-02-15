<template>
  <div id="course">
    <el-container style="height: 100%;">
      <el-header style="padding: 0px;"><Headbar></Headbar></el-header>
      <el-main style="padding: 0px;"
        ><div class="course_head">
          <div class="course_main">
            <el-container style="padding-top: 20px;">
              <el-aside width="200px"
                ><el-image :src="course_cover"></el-image
              ></el-aside>
              <el-main style="padding:0px;">
                <el-container style="padding: 10px 20px 10px 20px;">
                  <el-aside width="750px"
                    ><div class="course_title">课程标题</div>
                    <div class="course_info">课程简介</div>
                    <div class="course_attendence">
                      参加人数 <i class="el-icon-user"></i>15354
                    </div>
                  </el-aside>
                  <el-main style="padding: 0px;">
                    <div class="course_button_div1">
                      <el-button
                        class="course_button"
                        icon="el-icon-delete"
                        round
                        >删除</el-button
                      >
                    </div>
                    <div class="course_button_div1">
                      <el-button
                        class="course_button"
                        icon="el-icon-setting"
                        round
                        >编辑</el-button
                      >
                    </div>

                    <div class="course_button_div2">
                      <el-button
                        class="course_button"
                        icon="el-icon-caret-right"
                        round
                        >退出课程</el-button
                      >
                    </div>
                  </el-main>
                </el-container>
              </el-main>
            </el-container>
          </div>
        </div>

        <div class="course_table">
          <div class="course_table_upload">
            <el-button type="danger">上传视频</el-button>
          </div>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="时长" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="视频标题" width="800">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";

export default {
  data() {
    return {
      course_cover:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        }
      ]
    };
  },
  components: {
    Headbar
  },
  methods: {
    handleEdit(index, row) {
      alert(index, row);
    },
    handleDelete(index, row) {
      alert(index, row);
    }
  }
};
</script>

<style lang="scss">
#course {
  height: 100%;

  .course_head {
    background-color: #2f3f60;
    height: 200px;
  }

  .course_main {
    width: 1200px;
    height: 100%;
    color: white;
    margin: auto;
    background-color: #2f3f60;
  }

  .course_table {
    width: 1200px;
    color: white;
    margin: auto;
  }

  .course_table_upload {
    float: right;
    margin-top: 20px;
  }

  .course_title {
    font-size: 20px;
    font-weight: bold;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .course_info {
    font-size: 15px;
    color: white;
    margin-top: 14px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .course_attendence {
    color: #cfd3d9;
    margin-top: 13px;
  }

  .course_button {
    background-color: transparent;
    color: #cfd3d9;
  }

  .course_button_div1 {
    display: inline-block;
    margin-left: 10px;
  }

  .course_button_div2 {
    margin-top: 30px;
    margin-left: 87px;
  }
}
</style>
