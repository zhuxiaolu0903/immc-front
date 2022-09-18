// import svgIcon from './svg-icon/index.vue'
// import popup from '../libs/popup/index.vue'
//
// // 注册自定义组件
// export default {
//     install(app){
//         app.component('m-svg-icon', svgIcon)
//         app.component('m-popup', popup)
//     }
// }
// 启用vit提供的自动注册
import {defineAsyncComponent} from "vue";

export default {
    install(app) {
        // 1. 获取当前路径下任意文件夹下的index.vue文件
        const components = import.meta.glob('./*/index.vue')
        // 2. 遍历获取到的组件模块
        for(const [src, fn] of Object.entries(components)) {
            // 3. 拼接组件注册的name
            const name = src.replace('./', '').split('/')[0]
            // 4. 通过 defineAsyncComponent 异步导入指定路径下的组件
            app.component(`m-${name}`, defineAsyncComponent(fn))
        }
    }
}