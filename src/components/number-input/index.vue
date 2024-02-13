<template>
  <div class="NumberInput">
    <span @click="minus" :class="['minus', { ban: num <= min }]">-</span
    ><input v-model="num" type="number" :min="min" :max="max" /><span
      @click="add"
      :class="['add', { ban: num >= max }]"
      >+</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 1
  },
  initNum: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['input', 'changeHandle', 'update:modelValue'])
const num = ref(props.initNum || props.min)
const minus = () => {
  if (num.value <= props.min) {
    return 1
  }
  num.value = Number(num.value) - 1
}
const add = () => {
  if (num.value >= props.max) {
    return
  }
  num.value = Number(num.value) + 1
}
watch(
  () => num.value,
  (newNum) => {
    emit('input', Number(newNum))
    emit('update:modelValue', Number(newNum))
    emit('changeHandle')
  }
)
watch(
  () => props.initNum,
  (newVal: '' | number) => {
    if (newVal !== '') {
      num.value = newVal
    }
  }
)
</script>

<style scoped lang="less">
@import '../../assets/css/var.less';
.NumberInput {
  border: 1px solid @borderColor;
  width: 135px;
  height: 35px;
  user-select: none;
  span {
    display: inline-block;
    vertical-align: top;
    width: 34px;
    height: 35px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    color: @fontDeepColor;
    font-size: 26px;
  }
  input {
    border: none;
    display: inline-block;
    vertical-align: top;
    width: 65px;
    height: 33px;
    text-align: center;
    border-left: 1px solid @borderColor;
    border-right: 1px solid @borderColor;
  }
  .ban {
    cursor: not-allowed;
  }
}
</style>
