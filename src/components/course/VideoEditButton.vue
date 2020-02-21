<template>
  <div id="video_edit_button">
    <el-button
      size="mini"
      @click="handleEdit(tableScope.$index, tableScope.row)"
      >编辑</el-button
    >
  </div>
</template>

<script>
export default {
  props: { tableScope: Object },
  methods: {
    handleEdit(index, row) {
      alert(index, row);
    }
  }
};
</script>

<style lang="scss">
#video_edit_button {
}
</style>
