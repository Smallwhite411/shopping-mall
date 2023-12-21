<template>
  <div class="NoticeListBox">
    <ul class="noticeList" :style="{ top: top + 'px', transition: `top ${animateTime}s` }">
      <li v-for="(item, index) in notices" :key="index">
        <a href="#">{{ item }}</a>
      </li>
      <li>
        <a href="#">{{ notices[0] }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  notices: {
    type: Array,
    default: () => []
  }
})

const top = ref(0)
const height = ref(40)
const animateTime = ref(1)
let animateID = null

const topAnimate = () => {
  if (top.value <= -props.notices.length * height.value) {
    top.value = 0
    animateTime.value = 0
    return
  }
  animateTime.value = 1
  top.value -= height.value
}

onMounted(() => {
  animateID = setInterval(topAnimate, 3000)
})

onDeactivated(() => {
  clearInterval(animateID!)
})
</script>

<style scoped lang="less">
@import '../assets/css/var.less';
.NoticeListBox {
  height: 40px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  width: 240px;
  .noticeList {
    width: 100%;
    position: absolute;
    left: 0;
    li {
      width: 100%;
      height: 40px;
      line-height: 36px;
      a {
        color: @thirdColor;
        text-decoration: underline;
        font-size: 12px;
        &:hover {
          color: white;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
