<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽 -->
      <slot name="reference"></slot>
    </div>
    <transition name="slide" v-if="$slots.content">
      <div
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white shadow-box rounded-md"
        :style="contentStyle"
        ref="contentTarget"
      >
        <!-- 匿名插槽 -->
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// 定义常量
const PROP_TOP_LEFT = "top-left";
const PROP_TOP_RIGHT = "top-right";
const PROP_BOTTOM_LEFT = "bottom-left";
const PROP_BOTTOM_RIGHT = "bottom-right";
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT,
];
// 延时关闭时长
const DELAY_TIME = 200
</script>

<script setup>
/**
 * 1. 指定所有可选位置的常量，并生成enum
 * 2. 通过prop控制指定位置
 * 3. 获取元素的DOM，创建读取尺寸的方法
 * 4. 生成气泡的样式对象，用来控制每个位置对应的样式
 * 5. 根据prop，计算样式对象
 */
import { nextTick, ref, watch } from "vue";

const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator: (value) => {
      if (!placementEnum.includes(value)) {
        throw new Error(
          `你的placement必须是${placementEnum.join("、")}中的一个`
        );
      }
      return true;
    },
  },
});

const isVisable = ref(false);
let timer
/**
 * 鼠标移入
 */
const onMouseenter = () => {
  isVisable.value = true;
  if (timer) {
    // 如果上次触发了mouse leave,则取消定时器，不执行关闭
    clearTimeout(timer)
    timer = null
  }
};
/**
 * 鼠标移出
 */
const onMouseleave = () => {
  // 延时关闭，避免鼠标移到缝隙处，气泡消失
  timer = setTimeout(() => {
    isVisable.value = false;
  }, DELAY_TIME)
};

const referenceTarget = ref(null);
const contentTarget = ref(null);
/**
 * 获取指定元素的宽高
 * @param element
 * @returns {{width: number, height: number}|{}}
 */
const useElementSize = (element) => {
  if (!element) return {};
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
};

const contentStyle = ref({
  top: "0",
  left: "0",
});
watch(isVisable, (value) => {
  if (value) {
    nextTick(() => {
      let top = "";
      let left = "";
      switch (props.placement) {
        case PROP_TOP_LEFT:
          top = 0;
          left = -1 * useElementSize(contentTarget.value).width;
          break;
        case PROP_TOP_RIGHT:
          top = 0;
          left = useElementSize(referenceTarget.value).width;
          break;
        case PROP_BOTTOM_LEFT:
          top = useElementSize(referenceTarget.value).height;
          left = -1 * useElementSize(contentTarget.value).width;
          break;
        case PROP_BOTTOM_RIGHT:
          top = useElementSize(referenceTarget.value).height;
          left = useElementSize(referenceTarget.value).width;
          break;
      }
      contentStyle.value.top = top + "px";
      contentStyle.value.left = left + "px";
    });
  }
});
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
