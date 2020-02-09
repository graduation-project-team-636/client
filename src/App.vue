<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    // 整个应用创建之初，先获取登录状态以保持登录
    this.keepLoginState();
  },
  methods: {
    keepLoginState() {
      // 获取用户基本信息以实现保持登录
      var profileGetUrl = this.$store.state.baseUrl + "/user/profile/";
      var self = this;

      this.axios
        .get(profileGetUrl)
        .then(function(response) {
          if (response.data.error_code == 0) {
            self.$store.commit("loginSet", response.data.data);
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0px;
  margin: 0px;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden;
  position: absolute;
}
</style>
