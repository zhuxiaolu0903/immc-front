<template>
  <div class="h-screen">
    <!--  顶部搜索区域  -->
    <header-vue class="h-header"></header-vue>
    <!--  中间区域  -->
    <div class="h-main">
      <main-vue></main-vue>
    </div>
  </div>
</template>

<script setup>
  import HeaderVue from './components/header/index.vue'
  import mainVue from './components/main.vue'
</script>

<style scoped>
</style>