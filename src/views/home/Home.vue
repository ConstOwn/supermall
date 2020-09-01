<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
              @tabClick = 'tabClick'
              ref="tabControl1"
              class="tab-control"
              v-show="isTabFixed"
    ></tab-control>
    <scroll class="content"
            ref='scroll'
            :probe-type = '3' 
            @scroll="contentScroll" 
            :pull-up-load = 'true'
            @pullingUp="loadMore">
      <home-swiper :banners = 'banners' @swiperImageLoad = 'swiperImageLoad'></home-swiper>
      <recommend-view :recommends = 'recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick = 'tabClick'
                    ref="tabControl"
></tab-control>
      <goods-list :goods = 'showGoods'></goods-list>
    </scroll>
    <back-top  @click.native="backClick" v-show='topIsShow'></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    methods: {
  　  _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    },
      /********* 事件监听********/
      tabClick(index) {
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 让tabcontrol保持一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
        // 点击tabcontrol滚动到相应的位置
        this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop))
      },

      refresh() {
        this.scroll.refresh()
      },
      
      contentScroll(position) {
        // 判断backtop是否显示
        this.topIsShow = (- position.y) > this.tabOffsetTop - 1;
        // 决定tabcontrol是否吸顶
        this.isTabFixed = (- position.y) > this.tabOffsetTop

      },

      loadMore(){
        this.getHomeGoods(this.currentType)
        
      },

      swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 通过$el属性获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },
      // 网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1 
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1 
        })
      },
    },

    created() {
      // 1.请求首页的多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mounted() {
      if(this._isMobile()) {
        this.$toast.show('如果数据不显示，请尝试刷新或者稍后再试。', 1500)
        setTimeout(() => {
          this.$toast.show('我的GitHub：ConstOwn', 2500)
        }, 1500);
      } else {
        this.$toast.show('建议使用手机浏览器获得更好体验', 9000)
      };

    },
    activated() {
      // 返回页面时滚动到离开时记录的位置并刷新
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },

    deactivated(){
    // 离开页面时记录页面离开时的滚动位置
      this.saveY = this.$refs.scroll.getCurrentY()
    // 离开页面时取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  #home{
    padding-bottom: 49px;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #FFF;
  }
  
  .content {
    height: calc(100% - 49px);
    overflow: hidden;
    position: absolute;
    top:44px;
  } 

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
