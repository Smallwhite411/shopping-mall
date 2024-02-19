<template>
  <div class="MallShow">
    <FixedNav v-show="navShouldFixed">
      <template #navContent>
        <div class="container fixedNavContainer">
          <h3 class="fixedLeft" @click="navTo('/mall-index/show/index')">MoreMall</h3>
          <ul class="fixedRight">
            <li
              v-for="item in typeList"
              :key="'type' + item.id"
              :class="{ selected: judgeCurPath(item.id) }"
              @click="selectType(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </template>
    </FixedNav>
    <div class="logo">
      <img src="../../../assets/img/index1.gif" />
      <div class="searchBox">
        <TipsInput
          placeholder="请输入商品关键字"
          :tips="tips"
          @tipsChosen="searchTip"
          ref="TipsInput"
          v-model="searchText"
        />
        <i class="iconfont icon-search" @click="searchConfirm" />
      </div>
    </div>
    <ul ref="typeListRef" class="typeList">
      <li
        v-for="item in typeList"
        :key="'type' + item.id"
        :class="{ selected: judgeCurPath(item.id) }"
        @click="selectType(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { getTypes, getGoodsList } from '@/api/client'
import TipsInput from '@/components/tips-input/index.vue'
import FixedNav from '@/components/fixed-nav/index.vue'
const typeList = ref<any>([
  {
    id: -1,
    name: '首页'
  },
  {
    id: 0,
    name: '时尚服饰'
  },
  {
    id: 1,
    name: '数码产品'
  },
  {
    id: 2,
    name: '食品饮料'
  },
  {
    id: 3,
    name: '日常用品'
  },
  {
    id: 4,
    name: '小说书刊'
  },
  {
    id: 5,
    name: '家用电器'
  }
])
const typeListRef = ref<any>()
const searchText = ref('')
// 这个是历史记录
const tips = ref(['aa', 'bb', 'cc'])
const navShouldFixed = ref(false)
const router = useRouter()
const route = useRoute()

const curPath = computed(() => {
  return route.path
})

const navTo = (route: string) => {
  router.push(route)
}
const judgeCurPath = (typeId: number) => {
  if (typeId === -1) {
    if (curPath.value.indexOf('/show/index') > -1) {
      return true
    } else {
      return false
    }
  } else {
    if (curPath.value.indexOf(`/show/goodsList/${typeId}`) > -1) {
      return true
    } else {
      return false
    }
  }
}
const selectType = (typeId: number) => {
  //首页
  if (typeId === -1) {
    navTo('/mall-index/show/index')
  } else {
    navTo('/mall-index/show/goodsList/' + typeId + '/all')
  }
}
const searchTip = (tip: string) => {
  alert(tip)
}
const searchTextChange = (text: string) => {
  console.log(text)
}
const searchConfirm = () => {
  if (searchText.value.trim().length <= 0) {
    console.log(searchText.value);
    
    alert('输入不能为空！')
    return
  }
  navTo(`/mall-index/show/goodsList/0/${searchText.value}`)
}
const scrollHandle = () => {
  const top = typeListRef.value.getBoundingClientRect().top
  //还未到顶
  if (top > 0) {
    navShouldFixed.value = false
  }
  //已经到顶
  else {
    navShouldFixed.value = true
  }
}

watch(
  () => searchText.value,
  (newVal) => {
    searchTextChange(newVal)
  }
)

onMounted(() => {
  //获取数据
  // const res = getTypes()
  // res
  //   .then((data) => {
  //     data.unshift({
  //       id: -1,
  //       name: '首页'
  //     })
  //     typeList.value = data
  //   })
  //   .catch((e) => {
  //     alert(e)
  //   })

  // //监听滚动事件
  document.addEventListener('scroll', scrollHandle, false)
})
onDeactivated(() => {
  document.removeEventListener('scroll', scrollHandle, false)
})
</script>

<style scoped lang="less">
@import '../../../assets/css/var.less';
.MallShow {
  width: 100%;
  .logo {
    display: block;
    margin: -10px auto 30px;
    text-align: right;
    user-select: none;
    img {
      display: inline-block;
      width: 33.3%;
      vertical-align: middle;
    }
    .searchBox {
      display: inline-block;
      width: 33.3%;
      vertical-align: middle;
      text-align: left;
      .TipsInput {
        margin-left: 30px;
      }
      .icon-search {
        font-size: 24px;
        font-weight: bold;
        color: @thirdColor;
        cursor: pointer;
        position: relative;
        top: 4px;
      }
    }
  }
  .typeList {
    width: 100%;
    text-align: center;
    li {
      display: inline-block;
      width: 60px;
      margin: 0 50px;
      text-align: center;
      height: 30px;
      line-height: 20px;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
    }
    .selected {
      color: @thirdColor;
      border-bottom: 3px solid @thirdColor;
    }
  }
  .fixedNavContainer {
    text-align: left;
    .fixedLeft {
      display: inline-block;
      vertical-align: middle;
      width: 15%;
      height: 100%;
      font-size: 30px;
      color: @thirdColor;
      user-select: none;
      line-height: 64px;
      text-align: center;
      cursor: pointer;
    }
    .fixedRight {
      width: 70%;
      height: 100%;
      display: inline-block;
      vertical-align: middle;
      li {
        display: inline-block;
        width: 60px;
        margin: 0 30px;
        text-align: center;
        height: 30px;
        line-height: 20px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        position: relative;
        top: 4px;
      }
      .selected {
        color: @thirdColor;
        border-bottom: 3px solid @thirdColor;
      }
    }
  }
}
</style>
