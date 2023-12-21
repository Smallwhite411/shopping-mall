import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Mall from '@/views/client/mall-home/index.vue'
import MallIndex from '@/views/client/mall-index/index.vue'
import MallShow from '@/views/client/mall-show/index.vue'
import ShoppingCar from '@/views/client/shopping-cart/index.vue'
import PersonalPage from '@/views/client/personal-page/index.vue'
import MyOrder from '@/views/client/my-order/index.vue'
import MyData from '@/views/client/my-data/index.vue'
import GoodsList from '@/views/client/goods-list/index.vue'
import GoodsDetail from '@/views/client/goods-detail/index.vue'
import MallLogin from '@/views/client/mall-login/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/mall-index',
    },
    {
      path: '/mall-index',
      name: 'MallIndex',
      component: MallIndex
    }
  ]
})

export default router
