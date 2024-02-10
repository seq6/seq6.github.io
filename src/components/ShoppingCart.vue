<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import {showFailToast, showSuccessToast} from "vant";
import {Couplet} from "../models/couplet";

const couplets = defineModel<Couplet[]>('couplets', {required: true});
const show = defineModel<boolean>('show', {required: true});

const {toClipboard} = useClipboard();
const copyPickContent = async () => {
  try {
    show.value = false;
    let text = [];
    for (const c of couplets.value) {
      text.push(`【${c.first}，${c.second}】`);
    }
    await toClipboard(text.join("\n"));
    showSuccessToast({message: '复制成功', duration: 2000});
  } catch (err) {
    showFailToast({message: '复制失败: ' + err, duration: 2000});
  }
}

// 清空已选内容
const clearPickContent = () => {
  show.value = false;
  couplets.value = [];
  showSuccessToast({message: '已清空', duration: 2000});
}

// 删除指定内容
const deletePickedOne = (i: number) => {
  couplets.value.splice(i, 1);
}

</script>

<template>
  <van-dialog
      v-model:show="show"
      title="已选"
      show-confirm-button
      confirm-button-text="复制到剪贴板"
      :confirm-button-disabled="couplets.length==0"
      @confirm="copyPickContent"
      show-cancel-button
      cancel-button-text="清空"
      :cancel-button-disabled="couplets.length==0"
      @cancel="clearPickContent"
      :closeOnClickOverlay="true">
    <template #default>
      <van-empty v-if="couplets.length===0" description="尚未选择"/>
      <van-list v-if="couplets.length>0">
        <van-cell v-for="(item,i) in couplets">
          <template #title>
            <div>{{ item.first }}&nbsp;&nbsp;{{ item.second }}</div>
          </template>
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
