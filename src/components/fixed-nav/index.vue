<template>
  <div class="FixedNav" :style="{ width: width }">
    <slot name="navContent"></slot>
  </div>
</template>

<script lang="ts" setup>
import { getClientSize } from '@/libs/utils'
const width = ref('')
onMounted(() => {
  width.value = getClientSize().width + 'px'
})
</script>

<style scoped lang="less">
@import '../../assets/css/var.less';
.FixedNav {
  position: fixed;
  top: 0;
  left: 0;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid @borderColor;
  animation: slideIn 0.3s;
  z-index: 10000;
}
@keyframes slideIn {
  from {
    top: -64px;
  }
  to {
    top: 0px;
  }
}
</style>
