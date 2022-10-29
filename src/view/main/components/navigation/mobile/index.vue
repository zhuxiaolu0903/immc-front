<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <m-scroll class="relative overflow-hidden whitespace-nowrap" :data="data" :listenScroll="true" :probeType="3" @scroll="onScroll" ref="scrollRef">
      <ul class="inline-block text-xs text-zinc-600 p-2">
        <!-- 滑块 -->
        <li ref="barTarget" :style="barStyle" class="absolute px-4 py-1 h-[22px] text-zinc-100 bg-zinc-900 rounded-xl duration-200">{{data[currentActiveIndex].name}}</li>
        <!-- 分类 -->
        <li v-for="(item, index) in data" class="inline-block px-4 py-1 last:mr-6" :ref="el => {
          itemDOMList[index] = el
        }"
            @click="onSelectItem(index)">{{ item.name }}
        </li>
      </ul>
    </m-scroll>
    <!-- 下拉图标 -->
    <div class="fixed top-0 right-[-1px] bg-white px-1 shadow-l-white h-9 flex items-center z-20">
      <m-svg-icon class="w-3.5 h-3.5" name="hamburger" @click="setShowPopup"></m-svg-icon>
    </div>
  </div>
  <m-popup v-model="isShowPopup">
    <!-- 弹窗内容 -->
    <menu-vue :data="data" @onSelectItem="onSelectItem"></menu-vue>
  </m-popup>
</template>

<script setup>
// 接收prop   在script setup中可以直接使用defineProps
import {onBeforeUpdate, ref, watch} from "vue";
import MenuVue from "@/view/main/components/menu/index.vue";

defineProps({
  data: {
    type: Array,
    require: true
  }
})

// 定义滑块的style
const barStyle = ref({
  transform: 'translateX(0px)',
  width: '66px'
})

// 获取所有分类的li DOM，定义ref array
let itemDOMList = []

// 定义当前激活的item index
let currentActiveIndex = ref(0)

const scrollRef = ref(null)

// 用户选中某一项
const onSelectItem = (index) => {
  // 将滚动条设置到指定位置
  scrollRef.value.scrollToElement(itemDOMList[index], 300, true)
  currentActiveIndex.value = index
  // 如果此时popup打开了，需要关闭
  if (isShowPopup.value) isShowPopup.value = false
}

// 定义滚动距离
let scrollLeft = ref(0)
// 获取滚动距离
const onScroll = (pos) => {
  scrollLeft = Math.abs(Math.round(pos.x))
}

// 监听当前激活的item index，实时修改滑块的style
watch(currentActiveIndex, (activeIndex) => {
  // 获取当前激活的item的位置和宽度
  const {left, width} = itemDOMList[activeIndex].getBoundingClientRect()
  // 设置滚动条的样式，移动距离 = ul横向滚动距离 + 当前激活item距离屏幕左侧的距离 - ul的padding
  barStyle.value = {
    transform: `translateX(${scrollLeft + left - 8}px)`,
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