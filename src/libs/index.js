import svgIcon from './svg-icon/index.vue'

// 注册自定义组件
export default {
    install(app){
        app.component('m-svg-icon', svgIcon)
    }
}