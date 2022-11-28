<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
          name="theme-light"
          class="p-1 w-4 h-4 rounded-md hover:bg-zinc-100 cursor-pointer duration-200"
          fillClass="fill-zinc-900"
      ></m-svg-icon>
    </template>
    <template #content>
      <div class="w-[140px] overflow-hidden">
        <div
            class="flex p-1 items-center text-sm hover:bg-zinc-100 rounded-sm cursor-pointer"
            v-for="item in themeArr"
            :key="item.id"
        >
          <m-svg-icon :name="item.icon" class="mr-1 w-1.5 h-1.5"></m-svg-icon>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </template>
  </m-popover>
</template>

<script setup>
// 构建渲染数据源
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from "@/constants";

const themeArr = [
  {
    id: "0",
    type: THEME_LIGHT,
    icon: "theme-light",
    name: "极简白",
  },
  {
    id: "1",
    type: THEME_DARK,
    icon: "theme-dark",
    name: "极夜黑",
  },
  {
    id: "2",
    type: THEME_SYSTEM,
    icon: "theme-system",
    name: "跟随系统",
  },
];
</script>

<style scoped></style>
