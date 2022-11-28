<template>
  <mobile-navigation-vue v-if="isMobileTerminal"/>
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import {isMobileTerminal} from "@/utils/flexible.js";
import {useStore} from 'vuex'

const store = useStore()
store.dispatch('useCategoryData')
</script>

<style scoped>

</style>