import {computed} from "vue"
import {PC_DEVICE_WIDTH} from "@/constants"
import {useWindowSize} from "@vueuse/core"

const width = useWindowSize().width
/**
 * 判断当前是否为移动设备，判断一句为屏幕抗毒是否大于指定值（1280）
 * @type {ComputedRef<boolean>}
 */
export const isMobileTerminal = computed(() => {
    return width.value < PC_DEVICE_WIDTH
})

/**
 * 动态指定rem基准值，最大为40px
 * 根据用户的屏幕宽度，进行一些计算，把计算出来的值赋值给html根标签作为fontsize的大小
 */
export const useREM = () => {
    // 定义最大的fontSize
    const MAX_FONT_SIZE = 40
    // 监听html文档被解析完成的事件
    document.addEventListener('DOMContentLoaded', () => {
        // 拿到html标签
        const htmlDOM = document.querySelector('html')
        // 计算fontSize，根据屏幕宽度 / 10
        let fontSize = window.innerWidth / 10
        fontSize = Math.min(MAX_FONT_SIZE, fontSize)
        // 赋值给html
        htmlDOM.style.fontSize = fontSize + 'px'
    })
}