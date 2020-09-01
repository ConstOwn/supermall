<template>
    <swiper>
      <swiper-item v-for = "item in banners">
        <a href="https://www.juanertu.com">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      // 检查轮播图加载完成
      imageLoad() {
        if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
        }
      }
    }
  }
</script>

<style>

</style>