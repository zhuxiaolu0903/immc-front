<template>
  <button
    class="relative flex justify-center items-center text-sm text-center rounded-full duration-150"
    @click.stop="onBtnClick"
    :class="[
      TYPE_ENUM[type],
      SIZE_ENUM[sizeKey].button,
      {
        'active:scale-110': isActiveAnim,
      },
    ]"
  >
    <!-- loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h- 2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="SIZE_ENUM[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字 -->
    <slot></slot>
  </button>
</template>

<script>
// 定义常量
// type 可选项，表示按钮风格
const TYPE_ENUM = {
  primary: "text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800",
  main: "text-white bg-main hover:bg-hover-main active:bg-main",
  info: "text-zinc-80 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200",
};

// size 可选项，表示按钮大小，区分文字按钮和icon按钮
const SIZE_ENUM = {
  default: {
    button: "w-8  h-4 text-base",
    icon: "",
  },
  "icon-default": {
    button: "w-4 h-4",
    icon: "w-1.5 h-1.5",
  },
  small: {
    button: "w-7 h-3 text-base",
    icon: "",
  },
  "icon-small": {
    button: "w-3 h-3",
    icon: "w-1.5 h-1.5",
  },
};

// 事件
const EMITS_CLICK = "click";
</script>
<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: "main",
    validator(value) {
      // 校验
      const keys = Object.keys(TYPE_ENUM);
      const result = keys.includes(value);
      if (!result) {
        throw new Error(`你的type必须是${keys.join("、")}必须是其中一个`);
      }
      return result;
    },
  },
  // 按钮大小
  size: {
    type: String,
    default: "default",
    validator(value) {
      const keys = Object.keys(SIZE_ENUM).filter(
        (item) => !item.includes("icon")
      );
      const result = keys.includes(value);
      if (!result) {
        throw new Error(`你的size必须是${keys.join("、")}中的一个`);
      }
      return result;
    },
  },
  // 按钮在点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true,
  },
  // 按钮loading
  loading: {
    type: Boolean,
  },
});

const emit = defineEmits([EMITS_CLICK]);

// 处理大小的key值
const sizeKey = computed(() => {
  return props.icon ? "icon-" + props.size : props.size;
});

/**
 * 按钮点击事件处理
 */
const onBtnClick = () => {
  if (props.loading) {
    return;
  }
  emit(EMITS_CLICK);
};
</script>

<style scoped></style>
