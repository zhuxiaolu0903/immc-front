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
