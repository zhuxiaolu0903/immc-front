import popup from './popup/index.vue'

// 注册自定义组件
export default {
    install(app){
        app.component('m-popup', popup)
    }
}