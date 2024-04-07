<script setup lang="ts">
import Header from "./components/Header.vue"
import ChunLian from "./components/ChunLian.vue"
import ChuDaDi from "./components/ChuDaDi.vue"
import {onMounted} from "vue"
import {useRoute, useRouter} from "vue-router"

onMounted(() => {
  useRouter().addRoute({
    path: '/chunlian',
    component: ChunLian,
    name: 'chunlian'
  })
  useRouter().addRoute({
    path: '/chudadi',
    component: ChuDaDi,
    name: 'chudadi'
  })
})

</script>

<template>
  <Header/>

  <!--  <router-link to="/">首页</router-link>-->
  <!--  <router-link to="/chunlian">选项一</router-link>-->
  <!--  <router-link to="/chudadi">选项二</router-link>-->

  <div v-if="useRoute().name == 'home'">
    <van-button type="primary" size="large" block>选项一</van-button>
    <van-button type="success" size="large" block>选项二</van-button>
  </div>

  <router-view></router-view>

  <van-toast/>
</template>

<style scoped>
</style>
