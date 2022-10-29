<template>
  <div class="flex flex-col h-[80vh]">
    <h4 class="px-4 py-2">所有分类</h4>
    <m-scroll :data="data" class="overflow-hidden">
      <ul>
        <li class="px-4 py-2 text-sm text-zinc-900" v-for="(item, index) in data" :key="item.id" @click="onItemClick(index)">{{ item.name }}</li>
      </ul>
    </m-scroll>
  </div>
</template>

<script setup>
  defineProps({
    data: {
      type: Object,
      require: true
    }
  })

  // 注册emit事件
  const emit = defineEmits(['onSelectItem'])
  // 点击某一项
  const onItemClick = (index) => {
    emit('onSelectItem', index)
  }
</script>

<style scoped>

</style>