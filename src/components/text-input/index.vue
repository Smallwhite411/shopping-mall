<template>
  <input :type="type" class="TextInput" v-model.trim="text" :placeholder="placeholder" />
</template>

<script lang="ts" setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  initText: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})
const emit = defineEmits(['input'])
const text = ref('')

watch(
  () => text.value,
  (newVal) => {
    emit('input', newVal)
  }
)
watch(
  () => props.initText,
  (newVal) => {
    text.value = newVal
  }
)
</script>

<style scoped lang="less">
@import '../../assets/css/var.less';
.TextInput {
  border: 1px solid @borderColor;
  padding: 6px 10px;
  border-radius: 5px;
  display: inline-block;
  vertical-align: middle;
}
</style>
