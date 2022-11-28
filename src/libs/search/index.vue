<template>
  <div
    class="relative group h-[56px] duration-500 rounded-full border-4 border-white hover:border-hover-l-main"
    ref="containerTarget"
  >
    <div
      class="flex items-center px-2 h-full rounded-full bg-zinc-100 group-hover:bg-white duration-500"
    >
      <m-svg-icon name="search" class="w-2 h-2" color="#999999"></m-svg-icon>
      <input
        v-model="inputValue"
        type="text"
        class="flex-1 px-1 h-full bg-transparent outline-0 text-base text-zinc-900"
        placeholder="搜索"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
        @keyup.enter="onSearchHandler"
      />
      <div class="flex items-center">
        <!-- 清空按钮 -->
        <m-svg-icon
          v-show="inputValue"
          name="input-delete"
          class="pr-2 mr-2 w-4 h-2 border-r border-zinc-200 cursor-pointer duration-500"
          :class="{
            'opacity-0 group-hover:opacity-100': !isFocus,
          }"
          color="#999999"
          @click="onClearClick"
        ></m-svg-icon>
        <!-- 搜索按钮 -->
        <m-button
          icon="search"
          size="small"
          iconColor="#ffffff"
          iconClass="w-2"
          class="duration-500"
          :class="{
            'opacity-0 group-hover:opacity-100': !isFocus,
          }"
          @click="onSearchHandler"
        ></m-button>
      </div>
    </div>
    <!-- 下拉框插槽 -->
    <transition name="slide" v-if="$slots.dropdown">
      <div
        v-show="isFocus"
        class="absolute top-[58px] left-0 p-2 w-full text-base bg-white rounded-xl shadow-box z-10"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// 定义常量

// 更新事件
const EMIT_UPDATE_MODEL_VALUE = "update:modelValue";
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = "search";
// 删除所有文本事件
const EMIT_CLEAR = "clear";
// 输入事件
const EMIT_INPUT = "input";
// 获取焦点事件
const EMIT_FOCUS = "focus";
// 失去焦点事件
const EMIT_BLUR = "blur";
</script>

<script setup>
/**
 * 1. 输入内容实现双向数据绑定
 * 2. 搜索按钮在hover时展示
 * 3. 一键清空文本功能
 * 4. 触发搜索
 * 5. 控制下拉展示区的展示
 * 6. 事件处理
 */
import { onClickOutside, useVModel } from "@vueuse/core";
import {ref, watch} from "vue";

// 支持从外部传入搜索词
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

// 注册事件
const emit = defineEmits([
  EMIT_UPDATE_MODEL_VALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR,
]);

// 搜索词
const inputValue = useVModel(props);

/**
 * 清空搜索框
 */
const onClearClick = () => {
  inputValue.value = "";
};

/**
 * 搜索
 */
const onSearchHandler = () => {
  emit(EMIT_SEARCH, inputValue.value);
};

// 是否获取了焦点
const isFocus = ref(false);
/**
 * 获取焦点
 */
const onFocusHandler = () => {
  // 设置获取了焦点
  isFocus.value = true;
  emit(EMIT_FOCUS);
};

/**
 * 失去焦点
 */
const onBlurHandler = () => {
  emit(EMIT_BLUR);
};

/**
 * 点击当前元素之外的其他区域，需要隐藏下拉框
 */
// 当前元素的DOM
const containerTarget = ref(null);
// 监听是否触发了其他区域的点击
onClickOutside(containerTarget, () => {
  isFocus.value = false;
});

/**
 * 监听input事件
 */
watch(inputValue, (value) => {
  emit(EMIT_INPUT, value)
})
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
