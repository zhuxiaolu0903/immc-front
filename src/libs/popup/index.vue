<template>
  <!-- 将弹窗的DOM插入到body下 -->
  <teleport to="body">
    <transition name="fade">
      <!-- 蒙层 -->
      <div class="fixed left-0 top-0 w-screen  h-screen bg-zinc-900 bg-opacity-70 z-40"
           @click="setHidePopup" v-if="isShowPopup"></div>
    </transition>
    <transition name="slide">
      <!-- 容器 -->
      <div class="fixed bottom-0 w-screen bg-white z-50 rounded-t-lg" v-bind="$attrs"
           v-if="isShowPopup">
        <!-- 内容 -->
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import {watch} from "vue";
import {useScrollLock, useVModel} from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 主动触发更新
const emits = defineEmits(['update:modelValue'])
// 使用useVModel来简化
const isShowPopup = useVModel(props, 'modelValue', emits)

// 点击蒙层，关闭popup
const setHidePopup = () => {
  // 通知父级组件关闭
  // emits('update:modelValue', false)
  // 直接设置属性值，会触发对应的emit
  isShowPopup.value = false
}

// 定义是否锁屏属性
const isLocked = useScrollLock(document.body)
// 监听modelValue，判断是否需要锁屏
// 这里监听的是prop下的某一个属性，需要使用函数
watch(() => props.modelValue, val => {
      isLocked.value = val
    },
    {
      immediate: true
    })
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all .2s;
}
</style>