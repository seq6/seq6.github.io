<script setup lang="ts">
import {useRoute} from "vue-router"
import {computed} from "vue"

const title = computed(() => {
  console.log(useRoute()?.name)
  switch (useRoute()?.name) {
    case 'chunlian':
      return '自选春联'
    default:
      return '首页'
  }
})

const isHome = computed(() => {
  console.log(useRoute()?.name)
  return useRoute()?.name == 'home'
})

</script>

<template>
  <van-nav-bar :title="title"
               :left-text="isHome ? '' : '返回'"
               :left-arrow="!isHome">
    <template #right>
      <van-icon v-if="!isHome" name="info-o"/>
    </template>
  </van-nav-bar>
</template>

<style scoped>

</style>