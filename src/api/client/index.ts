import { post, get } from '@/libs/http/index'
/**
 * @function login 用户登录
 * @function register 用户注册
 * @function getTypes 得到类目
 * @function getGoodsList 获得不同类目的商品
 * @function getGoodsInfo 获得商品详情页信息
 * @function getGoodsMsg 获得商品详情页问答区数据
 * @function askGoodsMsg 发送商品msg
 * @function addOrder 加入购物车
 * @function getOrderByState 获得用户订单列表
 * @function deleteOrder 删除订单
 * @function confirmReceive 确认收货
 * @function pay 确认付款
 * @function getUserData 获得用户资料
 * @function updateUserData 更改用户资料
 * @function updatePwd 更改用户密码
 * @function settleAccounts 结算购物车
 * @function sendComment 发送评价
 * @function getComment 获得商品评论
 * @function searchGoods 关键词搜索商品
 */

export const login: AxiosResponseI<any, any> = (data) => { }
export const register: AxiosResponseI<any, any> = (data) => { }
export const getTypes: AxiosResponseI<any, any> = (data) => { }
export const getGoodsList: AxiosResponseI<any, any> = (data) => { }
export const getGoodsInfo: AxiosResponseI<any, any> = (data) => { }
export const getGoodsMsg: AxiosResponseI<any, any> = (data) => { }
export const askGoodsMsg: AxiosResponseI<any, any> = (data) => { }
export const addOrder: AxiosResponseI<any, any> = (data) => { }
export const getOrderByState: AxiosResponseI<any, any> = (data) => { }
export const deleteOrder: AxiosResponseI<any, any> = (data) => { }
export const confirmReceive: AxiosResponseI<any, any> = (data) => { }
export const pay: AxiosResponseI<any, any> = (data) => { }
export const getUserData: AxiosResponseI<any, any> = (data) => { }
export const updateUserData: AxiosResponseI<any, any> = (data) => { }
export const updatePwd: AxiosResponseI<any, any> = (data) => { }
export const settleAccounts: AxiosResponseI<any, any> = (data) => { }
export const sendComment: AxiosResponseI<any, any> = (data) => { }
export const getComment: AxiosResponseI<any, any> = (data) => { }
export const searchGoods: AxiosResponseI<any, any> = (data) => { }