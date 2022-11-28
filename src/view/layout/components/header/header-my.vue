<template>
  <m-popover>
    <template #reference>
      <div class="relative cursor-pointer">
        <img class="w-3 h-3 rounded-sm" :src="imgSrc" alt="头像" />
      </div>
    </template>
    <!-- 气泡 -->
    <template #content v-if="true">
      <div class="w-[140px] overflow-hidden">
        <div
          v-for="item in menuArr"
          :key="item.id"
          class="flex p-1 items-center text-sm hover:bg-zinc-100 rounded-sm cursor-pointer"
        >
          <m-svg-icon :name="item.icon" class="mr-1 w-1.5 h-1.5"></m-svg-icon>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </template>
  </m-popover>
</template>

<script>
const AVATAR_IMG_ARR = [
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14843341462%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671447655&t=61cde831168ee9799579c1c3d283c229",
  "https://img0.baidu.com/it/u=2191219545,561663719&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=3598329287,3711798286&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img1.baidu.com/it/u=2676934872,4213479597&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500",
  "https://img0.baidu.com/it/u=1321661447,246569515&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500",
  "https://img1.baidu.com/it/u=1246317851,1631229184&fm=253&fmt=auto&app=120&f=JPEG?w=563&h=600",
  "https://img2.baidu.com/it/u=3502445362,4039362312&fm=253&fmt=auto&app=120&f=JPEG?w=461&h=1000",
  "https://img0.baidu.com/it/u=576230990,3481097856&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=676",
];
</script>

<script setup>
const imgSrc =
  AVATAR_IMG_ARR[Math.floor(Math.random() * AVATAR_IMG_ARR.length)];

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    name: "个人资料",
    icon: "profile",
    path: "/profile",
  },
  {
    id: 1,
    name: "升级 VIP",
    icon: "vip-profile",
    path: "/member",
  },
  {
    id: 2,
    name: "退出登录",
    icon: "logout",
    path: "",
  },
];
</script>

<style scoped></style>
