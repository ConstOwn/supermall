import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // 添加到购物车
  addCart(context,payload) {
    return new Promise((resolve, reject) => {
      // 判断是否有已经这个商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 如果已经有了这个商品，数量+1
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('该商品已在购物车中，数量+1')
      } else {  // 没有就push进去,添加为新商品
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加购物车成功')
      }
    })
  },

  // 购买按钮
  buyNow(context,payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('该商品已在购物车中，数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加购物车成功')
      }
    })
  }
}