<script setup lang="ts">
import {Couplet} from "../models/couplet";

defineProps<{
  couplet: Couplet,
}>();
</script>

<template>
  <van-cell center size="large">
    <template #title>
      <div>{{ couplet.first }}&nbsp;&nbsp;{{ couplet.second }}</div>
    </template>
    <template #right-icon>
      <van-button plain type="success" size="mini" @click="$emit('pick', couplet)">添加</van-button>
    </template>
    <template #label>
      <template v-for="(streamer, i) in couplet.streamer">
        <template v-if="i>0">&nbsp;</template>
        <van-tag type="danger">{{ streamer }}</van-tag>
      </template>
    </template>
  </van-cell>
</template>

<style scoped>
</style>
