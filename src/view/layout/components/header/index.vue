<template>
  <div class="w-full shadow-bottom">
    <div class="flex items-center py-1.5 px-3">
      <img src="https://st0.dancf.com/static/02/202201151128-a455.svg" alt="logo">
      <header-search-vue class="mx-2"></header-search-vue>
      <header-theme-vue class="mr-2"></header-theme-vue>
      <header-my-vue></header-my-vue>
    </div>
  </div>
</template>

<script setup>
import HeaderSearchVue from "./header-search/index.vue";
import HeaderMyVue from "./header-my.vue";
import HeaderThemeVue from "./header-theme.vue";
</script>

<style scoped>
</style>