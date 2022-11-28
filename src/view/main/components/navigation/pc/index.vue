<template>
  <div class="sticky top-0 left-0 my-1 w-full z-10 duration-500">
    <ul
      class="relative flex flex-wrap justify-center mx-auto w-[700px] duration-300 overflow-hidden"
      :class="isOpenCategoty ? 'h-[192px]' : 'h-[48px]'"
    >
      <!-- 展开按钮 -->
      <li
        class="absolute right-0 bottom-1.5 rounded p-1 rounded-sm hover:bg-hover-l-main cursor-pointer duration-200"
        @click="triggerState"
      >
        <m-svg-icon
          :name="isOpenCategoty ? 'fold' : 'unfold'"
          class="w-1 h-1"
        ></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1 py-1 mr-1 mb-1 rounded text-sm font-bold hover:bg-hover-l-main cursor-pointer duration-200"
        :class="{
          'bg-hover-l-main': currentIndex === index
        }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const data = computed(() => store.getters.categorys);

// 展开状态
const isOpenCategoty = ref(false);
/**
 *状态切换处理
 */
const triggerState = () => {
  isOpenCategoty.value = !isOpenCategoty.value;
};

// 选中索引
const currentIndex = ref(0);
/**
 * 选中索引切换
 * @param index 当前选中的索引
 */
const onItemClick = (index) => {
  currentIndex.value = index;
};
</script>

<style scoped></style>
