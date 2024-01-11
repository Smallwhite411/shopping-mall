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
import Register from '@/views/client/register-page/index.vue'
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
      component: Mall,
      redirect: '/mall-index/show',
      children: [
        {
          path: 'show',
          name: 'MallShow',
          component: MallShow,
          redirect: '/mall-index/show/index',
          children: [
            {
              path: 'index',
              name: 'MallIndex',
              component: MallIndex
            }, {
              path: 'goodsList/:typeId/:keyword',
              name: 'GoodsList',
              component: GoodsList
            },
          ]
        }, {
          path: 'goods/:id',
          name: 'GoodsDetail',
          component: GoodsDetail
        }, {
          path: 'personal-page',
          name: 'PersonalPage',
          component: PersonalPage,
          redirect: '/mall-index/personal-page/shopping-car',
          children: [
            {
              path: 'shopping-car',
              name: 'ShoppingCar',
              component: ShoppingCar,
              meta: {
                requireLogin: true,
              },
            }, {
              path: 'myData',
              name: 'MyData',
              component: MyData,
              meta: {
                requireLogin: true,
              },
            }, {
              path: 'myOrder',
              name: 'MyOrder',
              component: MyOrder,
              meta: {
                requireLogin: true,
              },
            }
          ]
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册',
      },
    },
  ]
})

export default router
