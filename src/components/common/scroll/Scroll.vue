<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',

  props: {
    probeType: {
      type: Number,
      default: 0 //默认不实时监听，节省性能
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      scroll: null
    }
  },

  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //BScroll对象内的点击事件是否可点击
      probeType: this.probeType, //实时监听滚动位置模式
      pullUpLoad: this.pullUpLoad //上拉加载
    })
    // 监听滚动的位置
    if (this.probeType == 2 || this.probeType == 3){
      this.scroll.on('scroll', position => {
        // 发送滚动事件
        this.$emit('scroll',position)
      })
    }

    // 监听上拉事件,滚动到底部
    if (this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        // 2秒后再次上拉加载,设置延迟避免重复加载
        setTimeout(() => {
          this.scroll && this.scroll.finishPullUp()
        }, 2000);
      })
    }
  },

  methods: {
    // 返回顶部方法封装，不传time会默认时长为500ms
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    // 刷新可滚动高度
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    
    getCurrentY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>