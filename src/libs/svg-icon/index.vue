<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color"></use>
  </svg>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  // svg 名称
  name: {
    type: String,
    required: true
  },
  // svg 颜色
  color: {
    type: String
  },
  // svg 类名
  fillClass: {
    type: String
  }
})
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style scoped>

</style>