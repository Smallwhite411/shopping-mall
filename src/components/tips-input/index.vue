<template>
  <div class="TipsInput tipsEle">
    <input ref="input" type="text" :placeholder="placeholder" v-model="inputText" class="tipsEle" />
    <ul class="tipsBox tipsEle" v-show="tipsShow">
      <li v-for="(item, index) in tips" :key="index" @click="tipsClickHandle(item)" class="tipsEle">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  tips: {
    type: Array,
    default: () => []
  }
})
const inputText = ref('')
const inputBoxFocus = ref<boolean>(false)
const emit = defineEmits(['tipsChosen', 'input'])

const tipsShow = computed(() => {
  if (inputText.value.trim().length > 0 && inputBoxFocus.value) {
    return true
  } else {
    return false
  }
})

const documentClickHandle = (e: any) => {
  if (e.target.className.includes('tipsEle')) {
    inputBoxFocus.value = true
  } else {
    inputBoxFocus.value = false
  }
}
const tipsClickHandle = (tip: any) => {
  emit('tipsChosen', tip)
}

onDeactivated(() => {
  document.removeEventListener('click', documentClickHandle, false)
})
onMounted(() => {
  document.addEventListener('click', documentClickHandle, false)
})
watch(
  () => inputText.value,
  (newVal) => {
    emit('input', newVal)
  }
)
</script>

<style scoped lang="less">
@import '../../assets/css/var.less';

.TipsInput {
  position: relative;
  width: 254px;
  display: inline-block;

  input {
    border: none;
    border-bottom: 1px solid @thirdColor;
    padding-left: 4px;
    width: 100%;
    height: 24px;
  }

  .tipsBox {
    position: absolute;
    top: 24px;
    left: 0;
    width: 100%;
    border: 1px solid @borderColor;
    border-top: none;

    li {
      text-align: left;
      width: 100%;
      height: 25px;
      line-height: 25px;
      padding: 0 6px;
      font-size: 14px;
      cursor: pointer;
      background-color: white;

      &:hover {
        background-color: #f8f5f0;
        color: @thirdColor;
      }
    }
  }
}
</style>
