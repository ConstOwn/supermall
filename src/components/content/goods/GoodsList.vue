<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item = 'item'></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  },
} 
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>