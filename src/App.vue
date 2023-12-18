<script setup lang="ts">
import {ref} from 'vue'
import {ChunLianSet} from "./models/ChunLian";
import {showFailToast, showSuccessToast, showToast} from "vant";

// 主题
const topic = ref('新年通用');
const topicSheet = ref(getTopic());
const topicSwitchShow = ref(false);

// 简体\繁体
const langChecked = ref(false);

// 内容
const content = ref(getContent());

// 已选内容
const pickContent = ref([] as string[]);
const pickNum = ref(0);
const pickDialogShow = ref(false);

// 获取主题列表
function getTopic() {
  let topics = [];
  for (const cl of ChunLianSet) {
    topics.push({name: cl.topic});
  }
  return topics;
}

// 获取春联内容列表
function getContent() {
  let content: Array<string> = [];
  for (const cl of ChunLianSet) {
    if (cl.topic !== topic.value) {
      continue;
    }
    if (langChecked.value) {
      for (const c of cl.content) {
        content.push(c.zhTc);
      }
    } else {
      for (const c of cl.content) {
        content.push(c.zhCn);
      }
    }
  }
  return content;
}

// 切换主题
const topicSwitch = (item: { name: string }) => {
  topic.value = item.name;
  content.value = getContent();
  topicSwitchShow.value = false;
  showToast(item.name);
}

// 切换简繁体
const changeLang = (newValue: boolean) => {
  langChecked.value = newValue;
  content.value = getContent();
  showToast({
    message: langChecked.value ? '繁体' : '简体',
    duration: 500
  });
}

// 选定春联
const pickOne = (i: number) => {
  if (pickNum.value >= 5) {
    showFailToast({message: '最多5副', duration: 500});
    return;
  }
  for (const cl of ChunLianSet) {
    if (cl.topic !== topic.value) {
      continue;
    }
    if (langChecked.value) {
      pickContent.value.push(cl.content[i].zhTc);
    } else {
      pickContent.value.push(cl.content[i].zhCn);
    }
  }
  pickNum.value++;
  showSuccessToast({message: '添加成功', duration: 500});
}

// 复制已选内容至剪贴板
const copyPickContent = () => {
  pickDialogShow.value = false;
  navigator.clipboard.writeText(pickContent.value.join("\n")).then(() => {
    showSuccessToast({message: '复制成功', duration: 2000});
  }).catch(err => {
    showFailToast({message: '复制失败: ' + err, duration: 2000});
  })
}

// 清空已选内容
const clearPickContent = () => {
  pickNum.value = 0;
  pickContent.value = [];
  pickDialogShow.value = false;
  showSuccessToast({message: '已清空', duration: 2000});
}

// 删除指定内容
const deletePickedOne = (i: number) => {
  pickNum.value--;
  pickContent.value.splice(i, 1);
}
</script>

<template>
  <div>
    <van-nav-bar>
      <template #left>
        <div @click="topicSwitchShow=true">切换主题</div>
      </template>
      <template #title>
        <van-switch v-model="langChecked" @change="changeLang">
          <template #node>
            <div style="font-size: 15px">{{ langChecked ? '繁' : '简' }}</div>
          </template>
        </van-switch>
      </template>
      <template #right>
        <van-badge :content="pickNum">
          <van-icon name="cart-o" size="25px" @click="pickDialogShow=true"/>
        </van-badge>
      </template>
    </van-nav-bar>

    <van-divider>主题：{{ topic }}</van-divider>

    <van-space direction="vertical" fill>
      <van-cell-group inset v-for="(item,i) in content">
        <van-cell center size="large">
          <template #title>
            <div v-html="(i+1) + '&nbsp;&nbsp;&nbsp;' + item.replace(',', '&nbsp;&nbsp;&nbsp;')"></div>
          </template>
          <template #right-icon>
            <!--            <van-icon name="add-o" size="20px" @click="pickOne(i)"/>-->
            <van-button plain type="success" size="mini" @click="pickOne(i)">添加</van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </van-space>
  </div>

  <van-action-sheet v-model:show="topicSwitchShow" :actions="topicSheet" @select="topicSwitch"/>

  <van-toast/>

  <van-dialog
      v-model:show="pickDialogShow"
      title="已选"
      show-confirm-button
      confirm-button-text="复制到剪贴板"
      :confirm-button-disabled="pickNum==0"
      @confirm="copyPickContent"
      show-cancel-button
      cancel-button-text="清空"
      :cancel-button-disabled="pickNum==0"
      @cancel="clearPickContent"
      :closeOnClickOverlay="true">
    <template #default>
      <van-empty v-if="pickNum===0" description="尚未选择"/>
      <van-list v-if="pickNum>0">
        <van-cell v-for="(item,i) in pickContent" :title="item">
          <template #right-icon>
            <van-button plain type="danger" size="mini" @click="deletePickedOne(i)">删除</van-button>
          </template>
        </van-cell>
      </van-list>
    </template>
  </van-dialog>
</template>

<style scoped>
</style>
