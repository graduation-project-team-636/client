<template>
  <div id="video_delete_button">
    <el-button
      size="mini"
      type="danger"
      @click="handleDelete(tableScope.$index, tableScope.row)"
      >删除</el-button
    >
  </div>
</template>

<script>
export default {
  props: { tableScope: Object },
  methods: {
    handleDelete(index, row) {
      alert(index, row);
    }
  }
};
</script>

<style lang="scss">
#video_delete_button {
}
</style>
