<template>
  <div ref="wrapperRef">
    <slot></slot>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import BScroll from 'better-scroll'

const wrapperRef = ref(null)
let scroll = null

const props = defineProps({
  /**
   * 1 滚动的时候会派发scroll事件，会截流。
   * 2 滚动的时候实时派发scroll事件，不会截流。
   * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
   */
  probeType: {
    type: Number,
    default: 1
  },
  /**
   * 点击列表是否派发click事件
   */
  click: {
    type: Boolean,
    default: true
  },
  /**
   * 是否开启分析滚动
   */
  scrollX: {
    type: Boolean,
    default: true
  },
  /**
   * 是否派发滚动事件
   */
  listenScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 列表的数据
   */
  data: {
    type: Array,
    default: null,
    require: true
  },
  /**
   * 是否派发滚动到底部的事件，用于上拉加载
   */
  pullup: {
    type: Boolean,
    default: false
  },
  /**
   * 是否派发顶部下拉的事件，用于下拉刷新
   */
  pulldown: {
    type: Boolean,
    default: false
  },
  /**
   * 是否派发到列表滚动开始的事件
   */
  beforeScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 当数据更新时，刷新scroll的延时
   */
  refreshDelay: {
    type: Number,
    default: 20
  }
})
const emit = defineEmits(['scroll', 'scrollToEnd', 'pulldown', 'beforeScroll'])

onMounted(() => {
  setTimeout(() => {
    _initScroll()
  }, 20)
})

const _initScroll = () => {
  if (!wrapperRef.value) {
    return
  }
  // better-scroll的初始化
  scroll = new BScroll(wrapperRef.value, {
    probeType: props.probeType,
    click: props.click,
    scrollX: props.scrollX
  })

  // 是否派发滚动事件
  if (props.listenScroll) {
    scroll.on('scroll', (pos) => {
      emit('scroll', pos)
    })
  }

  // 是否派发滚动到底部事件，用于上拉加载
  if (props.pullup) {
    scroll.on('scrollEnd', () => {
      emit('scrollToEnd')
    })
  }

  // 是否派发顶部下拉事件，用于下拉刷新
  if (props.pulldown) {
    scroll.on('touchend', (pos) => {
      if (pos.y > 50) {
        emit('pulldown')
      }
    })
  }

  // 是否派发列表滚动开始的事件
  if (props.beforeScroll) {
    scroll.on('beforeScroll', (pos) => {
      if (pos.y > 50) {
        emit('beforeScroll')
      }
    })
  }
}

const disable = () => {
  // 代理better-scroll的disable方法
  scroll && scroll.disable()
}

const enable = () => {
  // 代理better-scroll的enabled方法
  scroll && scroll.enabled()
}

const refresh = () => {
  // 代理better-scroll的refresh方法
  scroll && scroll.refresh()
}

const scrollTo = function () {
  // 注意：不能使用箭头函数，否则arguments的值就不对
  // 代理better-scroll的scrollTo方法
  scroll && scroll.scrollTo.apply(scroll, arguments)
}

const scrollToElement = function() {
  // 代理better-scroll的scrollToElement方法
  scroll && scroll.scrollToElement.apply(scroll, arguments)
}

/**
 * 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
 */
watch(() => props.data, () => {
  setTimeout(() => {
    refresh()
  }, props.refreshDelay)
})

defineExpose({
  disable,
  enable,
  refresh,
  scrollTo,
  scrollToElement
})
</script>

<style scoped>

</style>