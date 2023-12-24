<template>
  <div class="Personal">
    <ul class="titleList">
      <li
        :class="{ selected: curPath === '/mall-index/personal-page/cart' }"
        @click="navTo('/mall-index/personal-page/cart')"
      >
        购物车
      </li>
      <li
        :class="{ selected: curPath === '/mall-index/personal-page/myOrder' }"
        @click="navTo('/mall-index/personal-page/myOrder')"
      >
        我的订单
      </li>
      <li
        :class="{ selected: curPath === '/mall-index/personal-page/myData' }"
        @click="navTo('/mall-index/personal-page/myData')"
      >
        修改资料
      </li>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const navTo = (route: string) => {
  router.push(route)
}

watch(
  () => route,
  (to) => {
    curPath.value = to.path
  }
)
const curPath = ref(route.path)

// ...mapState(['clientToken', 'clientName'])
</script>

<style scoped lang="less">
@import '../../../assets/css/var.less';
.Personal {
  padding-top: 20px;
  .titleList {
    width: 180px;
    border: 1px solid @borderColor;
    padding: 20px 0;
    display: inline-block;
    overflow: hidden;
    li {
      width: 100%;
      margin: 20px 0;
      padding-left: 30px;
      color: @fontDefaultColor;
      font-size: 15px;
      cursor: pointer;
      border-left: 2px solid transparent;
    }
    .selected {
      border-left: 2px solid @thirdColor;
      color: @thirdColor;
    }
  }
  .content {
    width: 980px;
    margin-left: 30px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
