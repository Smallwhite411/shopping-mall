<template>
  <div class="ErrorPage">
    <h3>404</h3>
    <p>抱歉，您访问的页面跑丢了~</p>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
@import '../../../assets/css/var.less';
.ErrorPage {
  text-align: center;
  background-color: @mainColor;
  color: white;
  padding-top: 200px;
  h3 {
    font-size: 100px;
  }
  p {
    font-size: 30px;
  }
}
</style>
