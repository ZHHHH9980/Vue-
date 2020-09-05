<template>
    <div class="home">
      <header class="g-header-container">
        <home-header :class="{'header-transition': isHeaderTransition}" ref="header"></home-header>
      </header>
      <me-scroll
      scrollbar
      :data="recommends"
      pulldown
      pullup
      @pullUpEnd = "pullUpToLoadMore"
      @pullDownEnd = "pullDownToRefresh"
      @scroll = "scroll"
      @scrollEnd = "scrollEnd"
      @pullDownTransitionEnd = "pullDownTransitionEnd"
      ref="scroll"
      >
        <home-slider ref="slider"></home-slider>
        <home-nav></home-nav>
        <home-recommends
          @loaded="getRecommends"
          @getProductId="getProductId"
          ref="recommend"
        >
        </home-recommends>
      </me-scroll>

      <div class="g-backtop-container">
        <me-backtoTop
          :visible="BTPisVisible"
          @backtoTop="backtoTop"
        ></me-backtoTop>
      </div>
        <keep-alive>
          <router-view
            :productId="productId"
            @mounted="showProduct"
            ref="product"
          ></router-view>
        </keep-alive>
    </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import HomeNav from './nav';
  import HomeRecommends from './recommends';
  import MeScroll from 'base/scroll';
  import MeBacktoTop from 'base/backtoTop';

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeNav,
      HomeSlider,
      HomeRecommends,
      MeScroll,
      MeBacktoTop
    },
    data() {
      return {
        recommends: [],
        BTPisVisible: false,
        isHeaderTransition: false,
        productId: ''
      };
    },
    methods: {
      getProductId(id) {
        this.productId = id;
      },
      showProduct() {
        this.$refs.product.show();
      },
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullUpToLoadMore(pullUpEnd) {
        this.$refs.recommend.update().then(pullUpEnd).catch(err => {
          if (err) {
            console.log('没有更多数据');
            this.$refs.scroll.noMoreInfomation('没有更多数据');
          }
        });
      },
      pullDownToRefresh(pullDownEnd) {
        this.$refs.slider.update().then(pullDownEnd);
      },
      backtoTop() {
        this.$refs.scroll.scrollToTop();
      },
      scroll(translate, swiper) {
        if (Math.abs(translate) < swiper.height) {
          this.BTPisVisible = false;
        } else {
          this.BTPisVisible = true;
        }

        this.changeHeaderStatus(translate);
      },
      scrollEnd(translate, swiper, isPulling) {
        this.BTPisVisible = Math.abs(translate) > swiper.height && translate < 0;
        if (!isPulling) {
          // 拉动过程阻止显示
          this.changeHeaderStatus(translate);
        }
      },
      pullDownTransitionEnd() {
        this.$refs.header.show();
        this.isHeaderTransition = true;
      },
      changeHeaderStatus(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }

        this.$refs.header.show();
        this.isHeaderTransition = -translate > 100;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
