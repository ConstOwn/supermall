<template>
  <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <a href="https://www.juanertu.com">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 15px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 68px;
    height: 68px;
    margin-bottom: 10px;

  }
</style>