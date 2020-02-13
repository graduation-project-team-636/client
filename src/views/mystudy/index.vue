<template>
  <div id="mystudy">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"
        ><Headbar activeIndex="6"></Headbar
      ></el-header>
      <el-main style="padding: 0px;">
        <div class="main">
          <el-container style="background-color: white; padding-top: 20px;">
            <el-aside width="250px"
              ><div class="block">
                <el-avatar
                  :size="200"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
              </div>

              <div class="mystudy_info_block">
                <div class="info">
                  <div class="profileItem">
                    <i class="el-icon-user"></i>
                    <span class="myspan"> 昵称：</span>{{ name }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-time"></i>
                    <span class="myspan"> 注册时间：</span> {{ reg_time }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-s-custom"></i>
                    <span class="myspan"> 性别：</span> {{ sex }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-location"></i>
                    <span class="myspan"> 城市：</span> {{ city }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-edit-outline"></i>
                    <span class="myspan"> 职业：</span>{{ occupation }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-headset"></i>
                    <span class="myspan"> 爱好：</span> {{ hobby }}
                  </div>
                  <div class="profileItem">
                    <i class="el-icon-edit"></i>
                    <span class="myspan"> 个性签名：</span> {{ signature }}
                  </div>
                </div>
              </div>
            </el-aside>

            <el-main><CourseList></CourseList></el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import CourseList from "@/components/mystudy/CourseList.vue";

export default {
  name: "mystudy",
  data() {
    return {
      reg_time: "",
      name: "",
      sex: "",
      city: "",
      occupation: "",
      hobby: "",
      signature: ""
    };
  },
  components: {
    Headbar,
    CourseList
  }
};
</script>

<style lang="scss">
#mystudy {
  height: 100%;
  background-color: #f3f5f7;

  .block {
    margin-left: 25px;
    overflow: hidden;
  }

  .mystudy_info_block {
    margin-left: 10px;
  }

  .main {
    width: 1200px;
    height: 100%;
    margin: auto;
    background-color: white;
  }

  .info {
    margin-top: 25px;
    margin-left: 10px;
    font-size: 16px;
    color: #898989;
  }

  .profileItem {
    margin-top: 20px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  .myspan {
    color: #2c3e50;
  }
}
</style>
