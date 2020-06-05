<template>
  <div class="row home">
    <div class="col-lg-12">
      <HeaderCmp />
    </div>
    <div class="col-lg-12">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderCmp from "../common/HeaderCmp";
export default {
  components: {
    HeaderCmp
  }
};
</script>

<style scoped>
</style>