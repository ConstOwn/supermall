<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick = 'titleClick' ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type = '3' @scroll="contentScroll" >
      <detail-swiper :top-images = 'topImages'></detail-swiper>
      <detail-base-info :goods = 'goods'></detail-base-info>
      <detail-shop-info :shop = 'shop'></detail-shop-info>
      <detail-goods-info :detail-info = 'detailInfo' @imgLoad = 'imgLoad' class="goods-info" ref="goodsInfo"></detail-goods-info>
      <detail-param-info :param-info = 'paramInfo' ref="params"></detail-param-info>
      <detail-comment-info :comment-info = 'commentInfo' ref="comment"></detail-comment-info>
      <goods-list :goods= 'recommends' ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart = 'addCart' @buyNow = 'buyNow' ></detail-bottom-bar>
    <back-top  @click.native = "backClick" v-show = 'topIsShow'></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'
  
  import {debounce} from 'common/utils'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
      }
    },
    //方法集合
    methods: {
      // 点击navbar滚动到对应的位置
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },

      // 判断图片加载完成，刷新可滚动区域
      imgLoad() {
        this.$refs.scroll.refresh()
        // 给navbar中的item定位到对应的位置
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
      },

      // 监听scroll的滚动
      contentScroll(position) {
        // 获取Y值
        const positionY = -position.y
        // 与themeTopY进行比对，滚动时让navbar中标题和内容对应
        let length = this.themeTopYs.length;
        for(let i =0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >=  this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        };
        // 判断backtop是否显示
        this.topIsShow = (- position.y) > this.$refs.goodsInfo.$el.offsetTop;
      },
      // 加入购物车
      addCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 放入到购物车中
        if(product.iid){
        this.$store.dispatch('addCart',product).then(res => {
          this.$toast.show(res, 1500)
        })}else {
          this.$toast.show('添加失败请刷新重试', 1500)
        }
      },

      buyNow() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 放入到购物车中
        if(product.iid){
        this.$store.dispatch('buyNow',product).then(res => {
          this.$toast.show(res, 1500)
          this.$router.push('/cart')
        })}else {
          this.$toast.show('添加失败请刷新重试', 1500)
        }
      }
    },

    created() {
      // 保存传入的ID
      this.iid = this.$route.params.iid

      // 根据ID请求详情数据
      getDetail(this.iid).then(res => {
        // 获取顶部的轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详情信息
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      });

      // 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      });
    },
    destroyed() {
      // 离开页面时取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
  }
</script>
<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 100px);
    overflow: hidden;
    position: absolute;
    top:44px;

  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .goods-info{
    position: relative;
  }

</style>