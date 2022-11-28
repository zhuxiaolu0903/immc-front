<template>
  <div class="w-full">
    <m-search v-model="searchValue">
      <template #dropdown>
        下拉框
      </template>
    </m-search>
  </div>
</template>

<script setup>
import {ref} from "vue";

const searchValue = ref('测试')
</script>

<style scoped>

</style>