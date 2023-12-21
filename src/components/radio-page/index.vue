<template>
  <label class="Radio">
    <input
      ref="radio"
      @change="changeRadio(radioVal)"
      :name="radioName"
      :value="radioVal"
      type="radio"
    />
    <span class="tipsBox"><slot name="tips"></slot></span>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  radioName: String,
  radioVal: {
    type: String,
    default: ''
  },
  initVal: String
})
const emit = defineEmits(['input'])
const radio = ref<any>(null)
const changeRadio = (radioVal: string) => {
  emit('input', radioVal)
}

watch(
  () => props.initVal,
  () => {
    if (props.initVal !== '' && props.radioVal === props.initVal) {
      radio.value!.setAttribute('checked', 'checked')
    }
  }
)

onMounted(() => {
  if (props.initVal !== '' && props.radioVal === props.initVal) {
    radio.value!.setAttribute('checked', 'checked')
  }
})

// export default {

//   mounted(){
//     if(this.initVal!=='' && this.radioVal===this.initVal){
//       this.$refs.radio.setAttribute("checked","checked");
//     }
//   },
//   watch:{
//     initVal(newVal,oldVal){
//       if(this.initVal!=='' && this.radioVal===this.initVal){
//         this.$refs.radio.setAttribute("checked","checked");
//       }
//     }
//   }
// }
</script>

<style scoped lang="less">
@import '../../assets/css/var.less';
.Radio {
  display: inline-block;
  border: 1px solid @borderColor;
  border-radius: 3px;
  width: auto;
  margin-right: 10px;
  padding: 8px;
  padding-left: 20px;
  cursor: pointer;
  input {
    display: none;
  }
  .tipsBox {
    display: inline-block;
    position: relative;
    &:after {
      background-color: white;
      border: 1px solid @borderColor;
      border-radius: 100%;
      content: '';
      display: inline-block;
      height: 12px;
      width: 12px;
      margin: 1px;
      position: absolute;
      top: 0;
      left: -14px;
    }
  }
  input:checked + .tipsBox {
    &:after {
      background-color: @thirdColor;
    }
  }
}
</style>
