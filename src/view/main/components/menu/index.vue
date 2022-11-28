<template>
  <div class="flex flex-col h-[80vh]">
    <h4 class="px-2 py-2 text-base">所有分类</h4>
    <m-scroll :data="data" class="overflow-hidden" ref="scrollRef">
      <ul>
        <li class="px-2 py-1 text-sm text-zinc-900" :class="{'active-item-box': index === activeIndex}" v-for="(item, index) in data" :key="item.id" @click="onItemClick(index)" :ref="e => {
          itemDOMList[index] = e
        }">
          <div v-if="index !== activeIndex">{{ item.name }}</div>
          <div class="active-item" v-else>
            <span>{{ item.name }}</span>
            <i></i>
          </div>
        </li>
      </ul>
    </m-scroll>
  </div>
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from "vue";

  const props = defineProps({
    data: {
      type: Object,
      require: true
    },
    activeIndex: {
      type: Number,
      require: true
    }
  })

  // 注册emit事件
  const emit = defineEmits(['onSelectItem'])
  // li dom list
  const itemDOMList = []
  // scroll ref
  const scrollRef = ref(null)
  // 点击某一项
  const onItemClick = (index) => {
    emit('onSelectItem', index)
  }

  watch(scrollRef, () => {
    if (scrollRef.value) {
      setTimeout(() => {
        // 将滚动条设置到指定位置
        scrollRef.value.scrollToElement(itemDOMList[props.activeIndex], 300, true)
      }, 20)
    }
  }, {
    immediate: true
  })
</script>

<style scoped>
.active-item-box {
  background-color: #f1f1f1;
}
.active-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.active-item span {
  color: #000000;
}
.active-item i {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #000000;
}
.active-item i:before,
.active-item i:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  animation: warn 1.2s ease-out 0s infinite;
}
@keyframes warn {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  25% {
    transform: scale(1);
    opacity: 0.75;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  75% {
    transform: scale(2);
    opacity: 0.25;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>