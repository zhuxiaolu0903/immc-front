<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul class="relative overflow-x-auto flex text-xs text-zinc-600 p-2" ref="ulTarget">
      <!-- 下拉图标 -->
      <li class="fixed top-0 right-[-1px] bg-white px-1 shadow-l-white h-9 flex items-center z-20">
        <m-svg-icon class="w-3.5 h-3.5" name="hamburger" @click="setShowPopup"></m-svg-icon>
      </li>
      <!-- 滑块 -->
      <li ref="barTarget" :style="barStyle" class="absolute h-[22px] bg-zinc-900 rounded-xl duration-200 z-10"></li>
      <!-- 分类 -->
      <li v-for="(item, index) in data" class="flex-shrink-0 px-2 py-1 last:mr-4 z-10" :ref="getCategoryItem"
          :class="{
            'text-zinc-100': currentActiveIndex === index
          }"
          @click="onSelectItem(index)">{{ item.name }}
      </li>
    </ul>
  </div>
  <m-popup :data="data" v-if="isShowPopup"></m-popup>
</template>

<script setup>
// 接收prop   在script setup中可以直接使用defineProps
import {onBeforeUpdate, ref, watch} from "vue";
import {useScroll} from "@vueuse/core";

defineProps({
  data: {
    type: Array,
    require: true
  }
})

// 定义滑块的style
const barStyle = ref({
  transform: 'translateX(0px)',
  width: '50px'
})

// 获取所有分类的li DOM，定义ref array
let itemDOMList = []
const getCategoryItem = item => {
  if (item) {
    itemDOMList.push(item)
  }
}
// 需要在每次DOM更新之前清空数组
onBeforeUpdate(() => {
  itemDOMList = []
})

// 定义当前激活的item index
let currentActiveIndex = ref(0)

// 用户选中某一项
const onSelectItem = (index) => {
  currentActiveIndex.value = index
}

// 定义ul的ref
const ulTarget = ref(null)
// 获取当前ul容器的横向滚动距离
const {x: ulScrollLeft} = useScroll(ulTarget)

// 监听当前激活的item index，实时修改滑块的style
watch(currentActiveIndex, (activeIndex) => {
  // 获取当前激活的item的位置和宽度
  const {left, width} = itemDOMList[activeIndex].getBoundingClientRect()
  // 设置滚动条的样式，移动距离 = ul横向滚动距离 + 当前激活item距离屏幕左侧的距离 - ul的padding
  barStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 8}px)`,
    width: width + 'px'
  }
})

// 定义popup控制显隐的变量
let isShowPopup = ref(false)
// 点击显示popup
const setShowPopup = () => {
  isShowPopup.value = true
}
</script>

<style scoped>

</style>