<template>
  <ul class="Tag">
    <li
      :class="{ selected: curIndex === index }"
      @click="chooseTag(index)"
      v-for="(item, index) in tagList"
      :key="'tag' + index"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps({
  tagList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['indexChange'])
const curIndex = ref(0)

const chooseTag = (index: number) => {
  curIndex.value = index
  emit('indexChange', index)
}
</script>

<style scoped lang="less">
@import '../assets/css/var.less';
.Tag {
  li {
    display: inline-block;
    text-align: center;
    width: 88px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    margin-right: 8px;
    cursor: pointer;
  }
  .selected {
    background-color: white;
    border-top: 2px solid @mainColor;
    color: @mainColor;
  }
}
</style>
