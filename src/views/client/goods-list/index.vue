<template>
  <div class="GoodsList">
    <div class="sortBox">
      <span class="title">排序：</span>
      <span :class="['normal', { selected: sortMode === 0 }]" @click="changeSortMode(0)">默认</span>
      <span :class="['normal', { selected: sortMode !== 0 }]" @click="changeSortMode(3)">
        价格
        <i :class="['iconfont', 'icon-arrows-4-7', { selected: sortMode === 1 }]" /><i
          :class="['iconfont', 'icon-arrows-4-7', { selected: sortMode === 2 }]"
        />
      </span>
    </div>
    <ul class="result">
      <GoodsItem
        v-for="(item, index) in sortedList"
        :style="{ marginRight: (index + 1) % 4 === 0 ? '0px' : '25px' }"
        :key="+item.id"
        :id="item.id"
        :img="item.img"
        :name="item.name"
        :price="item.price"
      />
      <p class="noGoods" v-if="goodsList.length <= 0">抱歉，没有找到相关商品~</p>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getGoodsList, searchGoods } from '@/api/client'
import GoodsItem from '@/components/goods-item/index.vue'
const route = useRoute()
const goodsList = ref<any>([{
  id: 1,
  name: '大衣3',
  price: 100,
  img: 'https://cbu01.alicdn.com/img/ibank/2019/278/615/12078516872_1032655337.jpg'
},
{
  id: 2,
  name: '大衣4',
  price: 100,
  img: 'https://cbu01.alicdn.com/img/ibank/2019/278/615/12078516872_1032655337.jpg'
},
{
  id: 3,
  name: '大衣5',
  price: 100,
  img: 'https://cbu01.alicdn.com/img/ibank/2019/278/615/12078516872_1032655337.jpg'
}])
const sortMode = ref(0)
const isSearchPage = computed(() => {
  return Number(typeId.value) === 0 ? true : false
})
const typeId = computed(() => {
  return route.params.typeId || 0
})
const keyword = computed(() => {
  return route.params.keyword || ''
})
const sortedList = computed(() => {
  let temList = goodsList.value.slice()
  if (sortMode.value === 0) {
    return temList
  } else if (sortMode.value === 1) {
    return temList.sort((a: { price: number }, b: { price: number }) => {
      return a.price - b.price
    })
  } else if (sortMode.value === 2) {
    return temList.sort((a: { price: number }, b: { price: number }) => {
      return b.price - a.price
    })
  }
})

const getGoodsListFnc = (typeId: string) => {
  const res = getGoodsList(typeId)
  res
    .then((data) => {
      goodsList.value = data
    })
    .catch((e) => {
      alert(e)
    })
}
const searchGoodsFnc = (keyword: string) => {
  const res = searchGoods(keyword)
  res
    .then((data) => {
      goodsList.value = data
    })
    .catch((e) => {
      alert(e)
    })
}
const changeSortMode = (mode: number) => {
  if (mode === 3) {
    sortMode.value = sortMode.value === 1 ? 2 : 1
  } else {
    sortMode.value = 0
  }
}

watch(
  () => route,
  (to) => {
    sortMode.value = 0
    if (!isSearchPage.value) {
      getGoodsList(typeId)
    } else {
      searchGoods(to.params.keyword)
    }
  }
)

onMounted(() => {
  //类别页
  if (!isSearchPage.value) {
    getGoodsList(typeId.value)
  }
  //搜索结果页
  else {
    searchGoods(keyword.value)
  }
})
</script>

<style scoped lang="less">
@import '../../../assets/css/var.less';
.GoodsList {
  .sortBox {
    width: 90%;
    border-top: 1px dotted @borderColor;
    border-bottom: 1px dotted @borderColor;
    margin: 30px auto;
    padding-bottom: 30px;
    padding-top: 30px;
    span {
      font-size: 13px;
    }
    .title {
      color: @fontDefaultColor;
      display: inline-block;
      margin-right: 10px;
    }
    .normal {
      cursor: pointer;
      color: @fontDefaultColor;
      display: inline-block;
      margin-right: 10px;
    }
    .iconfont {
      color: @fontDefaultColor;
      display: inline-block;
      position: relative;
      left: -3px;
      &:last-of-type {
        transform: rotate(180deg);
        left: -6px;
      }
    }
    .selected {
      color: @thirdColor;
    }
  }
  .noGoods {
    margin: 38px auto;
    text-align: center;
    color: @thirdColor;
    font-size: 18px;
  }
}
</style>
