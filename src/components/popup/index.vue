<template>
  <!-- 蒙层 -->
  <div class="fixed left-0 top-0 w-screen  h-screen bg-zinc-900 bg-opacity-70 z-40 animate-fade-in" @click="setHidePopup"></div>
  <!-- 内容 -->
  <div class="fixed bottom-0 w-screen bg-white z-50 rounded-md animate-slide-in-up">
    <div class="flex flex-col h-[80vh]">
      <h4 class="px-4 py-2">所有分类</h4>
      <ul class="overflow-y-scroll">
        <li class="px-4 py-2 text-sm text-zinc-900" v-for="item in data">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    require: true
  }
})

// 点击蒙层，关闭popup
const setHidePopup = () => {
  // 通知父级组件关闭

}
</script>

<style scoped>

</style>