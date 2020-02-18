<template>
  <div id="classification">
    <el-container style="height: 100%;">
      <el-header style="padding:0px;"
        ><Headbar activeIndex="2"></Headbar
      ></el-header>
      <el-main style="background-color: #f3f5f7; padding: 0px;">
        <div class="background">
          <div class="main">
            <div class="divide"></div>

            <el-container>
              <el-aside width="50px"
                ><div class="frontText">方向：</div></el-aside
              >
              <el-main class="buttonGroup">
                <div
                  class="labelButton"
                  v-for="(category_data, index) in category_datas"
                  :key="category_data.code"
                  v-bind:class="{
                    activeStyle: index == current_category_index
                  }"
                  v-on:click.prevent="category_click(index, category_data.code)"
                >
                  <label :for="category_data.code"
                    ><span>{{ category_data.text }}</span
                    ><input
                      type="radio"
                      :id="category_data.code"
                      name="category"
                      :value="category_data.code"
                      style="display: none;"
                  /></label></div
              ></el-main>
            </el-container>

            <div class="divide"></div>

            <el-container>
              <el-aside width="50px"
                ><div class="frontText">标签：</div></el-aside
              >
              <el-main class="buttonGroup">
                <div
                  class="labelButton"
                  v-for="(tag_data, index) in tag_datas"
                  :key="tag_data.code"
                  v-on:click.prevent="tag_click(index, tag_data.code)"
                  v-bind:class="{ activeStyle: index == current_tag_index }"
                >
                  <label :for="tag_data.code"
                    ><span>{{ tag_data.text }}</span
                    ><input
                      type="radio"
                      :id="tag_data.code"
                      name="tag"
                      :value="tag_data.code"
                      style="display: none;"
                  /></label></div
              ></el-main>
            </el-container>

            <div class="divide"></div>
          </div>
        </div>

        <div class="tail">
          <el-container>
            <el-header style="padding: 0px;"
              ><el-radio-group
                @change="order_change_handle"
                v-model="order"
                size="small"
              >
                <el-radio-button label="1">最新</el-radio-button>
                <el-radio-button label="2">最热</el-radio-button>
              </el-radio-group></el-header
            >
            <el-main style="padding: 0px;">
              <div
                v-for="(course, index) in course_data"
                :key="index"
                v-bind:class="{
                  classification_coursecard: (index + 1) % 5 != 0,
                  classification_coursecard_last: (index + 1) % 5 == 0
                }"
              >
                <CourseCard
                  :course_id="course.course_id"
                  :course_name="course.course_name"
                  :course_introduction="course.course_introduction"
                  :course_category="course.course_category"
                  :course_tag="course.course_tag"
                  :course_cover="course.course_cover"
                  :course_attendance="course.course_attendance"
                ></CourseCard>
              </div>
            </el-main>

            <el-pagination
              :current-page="page"
              style="margin: auto;margin-top: 20px;"
              background
              layout="prev, pager, next"
              :total="1000"
            >
            </el-pagination>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headbar from "@/components/home/Headbar.vue";
import CourseCard from "@/components/home/CourseCard.vue";

export default {
  name: "classification",
  data() {
    return {
      order: 1,
      category_select: "category_all",
      current_category_index: 0,
      category_datas: [],
      tag_select: "tag_all",
      current_tag_index: 0,
      tag_datas: [],
      tag_origin_datas: [],
      page: 1,
      course_data: []
    };
  },
  components: {
    Headbar,
    CourseCard
  },
  mounted() {
    this.category_datas = this.$store.state.category_origin_datas;
    this.tag_origin_datas = this.$store.state.tag_origin_datas;
    this.tag_datas = this.tag_origin_datas;

    this.get_course_data();
  },
  methods: {
    // click执行了两遍，有冒泡存在，使用click.prevent
    category_click(index, value) {
      this.current_category_index = index;
      this.category_select = value;
      this.current_tag_index = 0;
      this.tag_select = "tag_all";
      this.tag_datas_compute();

      this.get_course_data();
    },
    tag_click(index, value) {
      this.current_tag_index = index;
      this.tag_select = value;

      this.get_course_data();
    },
    tag_datas_compute() {
      if (this.category_select == "category_all") {
        this.tag_datas = this.tag_origin_datas;
      } else if (this.category_select == "fe") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 1, 13);
      } else if (this.category_select == "be") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 13, 26);
      } else if (this.category_select == "mobile") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 26, 30);
      } else if (this.category_select == "bdata") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 30, 38);
      } else if (this.category_select == "db") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 38, 45);
      } else if (this.category_select == "3d") {
        this.tag_datas = this.myslice(this.tag_origin_datas, 45, 51);
      }
    },
    myslice(array, start, end) {
      var all_object = { text: "全部", code: "tag_all" };
      var result = [];
      result.push(all_object);
      for (var i = start; i < end; i++) {
        result.push(array[i]);
      }
      return result;
    },
    order_change_handle() {
      this.get_course_data();
    },
    get_course_data() {
      var myParams = {
        // 选择全部时，把tag_all变为all，category_all变为all，其它值则不变
        course_category:
          this.category_select == "category_all" ? "all" : this.category_select,
        course_tag: this.tag_select == "tag_all" ? "all" : this.tag_select,
        order: this.order,
        page: this.page
      };

      var courseDataUrl = this.$store.state.baseUrl + "/course/access";
      var self = this;

      this.axios
        .get(courseDataUrl, { params: myParams })
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.course_data = response.data.data.course;
          } else {
            self.$message.error(this.$store.state.errorTextUnknown);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss">
#classification {
  height: 100%;

  .main {
    margin: auto;
    width: 1400px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;
  }

  .tail {
    margin: auto;
    width: 1400px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .divide {
    height: 1px;
    background-color: grey;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .background {
    background-color: white;
  }

  .frontText {
    color: black;
    font-size: 14px;
    font-weight: bold;
    padding-top: 10px;
  }

  .labelButton {
    display: inline-block;
    padding: 12px 20px 12px 20px;
    cursor: pointer;
  }

  .labelButton:hover {
    color: #008080;
  }

  label {
    font-size: 14px;
  }

  .buttonGroup {
    padding: 0;
  }

  .activeStyle {
    background-color: #008080;
    color: white;
  }

  .activeStyle:hover {
    color: white;
  }

  .classification_coursecard {
    width: 250px;
    display: inline-block;
    margin-right: 37px;
    margin-bottom: 20px;
  }

  .classification_coursecard_last {
    width: 250px;
    display: inline-block;
    margin-right: 0px;
    margin-bottom: 20px;
  }
}
</style>
