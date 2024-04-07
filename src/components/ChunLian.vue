<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {showFailToast, showSuccessToast, showToast} from "vant"
import CoupletConfig from '../configs/couplet.json'
import LangSwitch from "./LangSwitch.vue"
import {Couplet} from "../models/couplet"
import CoupletCell from "./CoupletCell.vue"
import ShoppingCart from "./ShoppingCart.vue"

// 简体 繁体
const lang = ref('zh-CN')

// 主题
const topic = ref('')
const topicSwitchShow = ref(false)

// 春联内容
const couplets = ref([] as Couplet[])

// 已选内容
const pickCouplets = ref([] as Couplet[])
const pickDialogShow = ref(false)

// 初始化
onMounted(() => {

  // 默认展示第一主题
  for (const content of CoupletConfig.content) {
    if (typeof content['topic'] === 'string') {
      topic.value = content['topic']
      break
    }
  }

  // 初始化春联内容
  couplets.value = getCouplets()
})

// 获取春联主题
function getTopicSheet() {
  let sheet = []
  for (const content of CoupletConfig.content) {
    if (typeof content['topic'] === 'string') {
      sheet.push({name: content['topic']})
    }
  }
  return sheet
}

// 获取春联内容
function getCouplets(): Couplet[] {
  let couplets: Couplet[] = []
  for (const c of CoupletConfig.content) {
    if (c['topic'] != topic.value) {
      continue
    }
    for (const couplet of c['couplets']) {
      if (couplet.first.length == 0 || couplet.second.length == 0) {
        continue
      }
      let first = lang.value == 'zh-TW' && couplet.first.length >= 2 ? couplet.first[1] : couplet.first[0]
      let second = lang.value == 'zh-TW' && couplet.second.length >= 2 ? couplet.second[1] : couplet.second[0]
      let streamer = []
      for (const i of couplet.streamer) {
        if (i >= CoupletConfig.streamers.length) {
          continue
        }
        let tmp = CoupletConfig.streamers[i]
        streamer.push(lang.value == 'zh-TW' && tmp.length >= 2 ? tmp[1] : tmp[0])
      }
      couplets.push({first: first, second: second, streamer: streamer})
    }
  }
  return couplets
}

// 切换主题
const switchTopic = (item: { name: string }) => {
  if (topic.value != item.name) {
    topic.value = item.name
    couplets.value = getCouplets()
    showToast(item.name)
  }
  topicSwitchShow.value = false
}

// 切换简繁体
const updateTopicCouplets = () => {
  couplets.value = getCouplets()
}

// 选定春联
const pickOne = (c: Couplet) => {
  if (pickCouplets.value.length >= 6) {
    showFailToast({message: '最多6副', duration: 500})
    return
  }
  pickCouplets.value.push(c)
  showSuccessToast({message: '添加成功', duration: 500})
}
</script>

<template>
  <div>
    <van-nav-bar>
      <template #left>
        <div @click="topicSwitchShow=true">切换主题</div>
      </template>
      <template #title>
        <LangSwitch v-model:lang="lang" @change-lang="updateTopicCouplets"/>
      </template>
      <template #right>
        <van-badge :content="pickCouplets.length">
          <van-icon name="cart-o" size="25px" @click="pickDialogShow=true"/>
        </van-badge>
      </template>
    </van-nav-bar>

    <van-divider>主题：{{ topic }}</van-divider>

    <van-space direction="vertical" fill>
      <van-cell-group inset v-for="item in couplets">
        <CoupletCell :couplet="item" @pick="pickOne"/>
      </van-cell-group>
    </van-space>
  </div>

  <van-action-sheet v-model:show="topicSwitchShow" :actions="getTopicSheet()" @select="switchTopic"/>

  <ShoppingCart v-model:couplets="pickCouplets" v-model:show="pickDialogShow"/>

  <van-toast/>
</template>

<style scoped>
</style>