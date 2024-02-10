<script setup lang="ts">
import {ref} from "vue";
import {showToast} from "vant";

const lang = defineModel('lang', {required: true});
const emit = defineEmits(['changeLang']);

// 切换简体/繁体中文
const switchChecked = ref(false);
const change = (checked: boolean) => {
  lang.value = checked ? 'zh-TW' : 'zh-CN';
  switchChecked.value = checked;
  showToast({
    message: lang.value == 'zh-TW' ? '繁体' : '简体',
    duration: 500
  });
  emit('changeLang');
}
</script>

<template>
  <van-switch v-model="switchChecked" @change="change">
    <template #node>
      <div style="font-size: 15px">{{ switchChecked ? '繁' : '简' }}</div>
    </template>
  </van-switch>
</template>

<style scoped>
</style>
