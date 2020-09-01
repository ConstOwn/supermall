import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const";

// 监听图片的加载，刷新可滚动高度
export const itemListenerMixin = {
  data() {
    return{
      itemImgListener: null
    }
  },
  mounted() {
    // 图片加载完成事件监听，刷新scroll的可滚动高度，优化用户体验(防抖)
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    
    // 监听事件总线发送来的事件并保存
    this.itemImgListener = this.$bus.$on('itemImageLoad', () => {
    // 调用scroll的refresh刷新可滚动高度
    refresh()
    })
  }
}

// 返回顶部按钮
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      topIsShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
		}
	}
}