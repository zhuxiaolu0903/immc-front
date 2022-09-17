<template>
  <mobile-navigation-vue v-if="isMobileTerminal" :data="categoryData"/>
</template>

<script setup>
import {isMobileTerminal} from "@/utils/flexible.js";
import mobileNavigationVue from "./mobile/index.vue";
import {getCategory} from "@/api/category.js";
import {ref} from "vue";

// 声明响应式数据，并赋初始值
const categoryData = ref([])
const getCategoryDate = async () => {
  const {categorys} = await getCategory()
  categoryData.value = categorys
}
getCategoryDate()
</script>

<style scoped>

</style>