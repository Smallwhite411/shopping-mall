<template>
  <div class="Cart">
    <div v-if="orderList.length > 0">
      <div class="cartTableHeader">
        <span>商品信息</span>
        <span>单价</span>
        <span>数量</span>
        <span>小计</span>
        <span>交易操作</span>
      </div>
      <ul class="orderList">
        <li v-for="item in orderList" :key="'order' + item.id">
          <div class="orderDetail">
            <img :src="item.goods.img" alt="商品图片" />
            <div class="goodsName">
              <p @click="navTo('/mall-index/goods/' + item.goods.id)">{{ item.goods.name }}</p>
              <span>{{ item.goods.spec }}</span>
            </div>
            <span class="unitPrice">{{ '￥' + item.goods.unitPrice }}</span>
            <span class="num">
              <NumberInput
                @changeHandle="numberChange(item.id)"
                :initNum="item.temGoodsNum"
                v-model="item.temGoodsNum"
                :min="1"
                :max="999"
              />
            </span>
            <!-- <input @change="numberChange(item.id)" type="text" v-model="item.temGoodsNum" min="1" class="numInput" /> -->
            <span class="amount">{{ '￥' + item.amount }}</span>
            <button @click="deleteOrder(item.id)">删除</button>
          </div>
        </li>
      </ul>
      <div class="cartFooter">
        <span>应付金额：</span>
        <span class="total">{{ '￥' + totalAmount }}</span>
        <button @click="settleAccounts">下单</button>
      </div>
    </div>
    <p class="emptyTips" v-else>购物车还是空滴~</p>
  </div>
</template>

<script setup lang="ts">
import { getOrderByState, deleteOrder, settleAccounts } from '@/api/client'
import NumberInput from '@/components/number-input/index.vue'

const orderList = ref<Array<any>>([
  {
    id: '122',
    goods: {
      name: '秋裤', //物品名称
      id: '2',
      img: '/assets/img/code.png', //图片地址
      spec: '这是一件秋裤', //描述
      unitPrice: 888, //单价
    },
    temGoodsNum: 1,
    amount: 888 //总价
  },
  {
    id: '123',
    goods: {
      name: '秋裤', //物品名称
      id: '3',
      img: '/assets/img/code.png', //图片地址
      spec: '这是一件秋裤', //描述
      unitPrice: 888, //单价
    },
    temGoodsNum: 1,
    amount: 888 //总价
  }
])
const router = useRouter()
const totalAmount = computed(() => {
  let amount = 0

  orderList.value.map((item) => {
    amount += item.amount
  })
  return amount
})

const getOrderByStateFnc = (state: any) => {
  // const res = getOrderByState(state, clientToken.value)
  // res
  //   .then((data) => {
  //     orderList.value = data
  //     orderList.value.map((item, index) => {
  //       item.temGoodsNum = item.goodsNum
  //     })
  //   })
  //   .catch((e) => {
  //     alert(e)
  //   })
}
const numberChange = (orderId: any) => {
  orderList.value.map((item) => {
    console.log(
      orderId,
      item.temGoodsNum * item.goods.unitPrice,
      item.temGoodsNum,
      item.goods.unitPrice,
      orderId === item.id
    )
    if (orderId === item.id) {
      item.amount = item.temGoodsNum * item.goods.unitPrice
      console.log(item.temGoodsNum, item, item.goods.unitPrice)
    }
  })
}
const deleteOrderFnc = (orderId: any) => {
  const res = deleteOrder(orderId)
  res
    .then(() => {
      alert('删除订单成功！')
      orderList.value.map((item, index) => {
        if (item.id === orderId) {
          orderList.value.splice(index, 1)
        }
      })
    })
    .catch((e: any) => {
      alert(e)
    })
}
const navTo = (route: string) => {
  router.push(route)
}
const settleAccountsFnc = () => {
  let cartList: any = []
  orderList.value.map((item) => {
    cartList.push({
      id: item.id,
      goodsNum: item.temGoodsNum,
      amount: item.amount
    })
  })
  const res = settleAccounts({
    cartList: cartList
  })
  res
    .then(() => {
      alert('下单成功！')
      orderList.value = []
    })
    .catch((e) => {
      alert(e)
    })
}

onMounted(() => {
  getOrderByState(0)
})

// export default {
//   name: 'Cart',
//   components: {
//     NumberInput
//   },
//   computed: {
//     ...mapState(['clientToken'])
//   },
//   methods: {},

//   mounted() {
//     this.
//   }
// }
</script>

<style scoped lang="less">
@import '../../../assets/css/var.less';
.Cart {
  width: 100%;
  .emptyTips {
    width: 200px;
    text-align: center;
    display: block;
    margin: 30px auto;
    color: @thirdColor;
    font-size: 20px;
  }
  .cartTableHeader {
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    border: 1px solid @borderColor;
    color: @fontDefaultColor;
    font-size: 14px;
    line-height: 40px;
    span {
      display: inline-block;
      width: 14%;
      &:first-child {
        width: 40%;
        text-align: center;
      }
    }
  }
  .orderList {
    width: 100%;
    li {
      border: 1px solid @borderColor;
      border-top: none;
      font-size: 13px;
      .orderHeader {
        background-color: #f1f1f1;
        height: 40px;
        line-height: 40px;
        padding: 0 5px;
        .orderTime {
          font-weight: 600;
        }
        .orderId,
        .state {
          margin-left: 10px;
        }
      }
      .orderDetail {
        width: 100%;
        padding: 10px;
        position: relative;
        overflow: hidden;
        img {
          width: 84px;
          height: 84px;
          display: inline-block;
        }
        .goodsName {
          display: inline-block;
          margin-left: 5px;
          width: 230px;
          vertical-align: top;
          p {
            cursor: pointer;
            line-height: 20px;
            &:hover {
              text-decoration: underline;
            }
          }
          span {
            color: @fontDefaultColor;
            display: block;
            margin-top: 10px;
          }
        }
        .unitPrice,
        .num,
        .amount {
          display: inline-block;
          vertical-align: top;
          width: 15%;
          height: 85px;
          line-height: 85px;
          text-align: center;
        }
        .NumberInput {
          position: relative;
          top: 25px;
        }
        button {
          position: absolute;
          right: 90px;
          bottom: 40px;
          width: 70px;
          height: 30px;
          border-radius: 3px;
          background-color: @falseColor;
          color: white;
          border: none;
        }
      }
    }
  }
  .cartFooter {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    border: 1px solid @borderColor;
    border-top: none;
    background-color: #f5f5f5;
    position: relative;
    span {
      color: @fontDefaultColor;
      display: inline-block;
      vertical-align: top;
    }
    .total {
      color: @falseColor;
      font-size: 25px;
      font-weight: 600;
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
      width: 100px;
      height: 100%;
      background-color: @thirdColor;
      border: none;
      color: white;
      font-size: 20px;
    }
  }
}
</style>
