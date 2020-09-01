<template>
    <div class="bottom-menu">
    <CheckButton 
    id="check-button"
    class="select-all" 
    :value= isSelectAll
    @click.native="checkClick"
    ></CheckButton>
    <span @click="checkClick">全选</span>
    <span class="total-price">合计:¥{{totalPrice}}</span>
    <span class="buy-product" @click="buyClick">付款({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
    CheckButton,
    },
    data() {
      return {
        
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapGetters([
        'cartList'
      ]),
      // 合计
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) =>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      // 付款
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      // 全选按钮的状态
      isSelectAll() {
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    //方法集合
    methods: {
      // 全选按钮
      checkClick() {
        if(this.isSelectAll) { 
          this.cartList.forEach(item => {
            //全部选中的时候，变成全部不选中
            item.checked = false
          });
        } else {
            this.cartList.forEach(item => { 
            //只要一个没选中，变成全部选中
            item.checked = true
          });
        }
      },
      // 付款按钮
      buyClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择要购买的商品', 1500)
        }
      }
    },
  }
</script>
<style scoped>
    .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>