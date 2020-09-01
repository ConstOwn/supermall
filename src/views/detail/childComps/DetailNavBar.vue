<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="detailBackClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" class="title-item" :class="{active: index === currentIndex}" @click="detailTitleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data () {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      detailTitleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      detailBackClick() {
        this.$router.back()
      }
    }
}
</script>
<style scoped>
  .title {
    display: flex;
    font-size: 15px;
  }
  .title-item {
    flex: 1;

  }
  .active {
    color: var(--color-high-text);
  }
.back img{
    margin-top: 11PX;
  }
</style>