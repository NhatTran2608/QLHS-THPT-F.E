<!-- <script>
import AppHeader from "@/components/Header.vue";
export default {
  components: {
    AppHeader,
  },
};
</script> -->
<template>
  <div id="app">
    <!-- <AppHeader class="Header" /> -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style  scoped>
.page {
  max-width: 400px;
  margin: auto;
}

.Header{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
 
}

.mt-6{
  margin-top: 7rem!important;
}

</style>