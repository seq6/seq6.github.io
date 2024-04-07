<script setup lang="ts">

import {useRouter} from "vue-router";

function to(url: string) {
  const router = useRouter()
  router.push({path: url})
  router.go(1)
}
</script>

<template>
  <br>
  <van-space direction="vertical" fill>

    <van-cell-group inset>
      <van-cell title="自选春联" size="large" @click="to('/chunlian')"/>
    </van-cell-group>

    <van-cell-group inset>
      <van-cell title="锄大地计分" size="large" @click="to('/chudadi')"/>
    </van-cell-group>

  </van-space>
</template>

<style scoped>
</style>