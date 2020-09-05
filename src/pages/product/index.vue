<template>
    <transition name="product-transition">
      <div class="product">
        <product-header></product-header>
        <me-scroll  ref="scroll">
          <!-- 轮播图 -->
          <product-slider :data="data"></product-slider>
          <!-- 详情 -->
          <product-detail @detailLoaded="updateScroll" :data="data" ></product-detail>
        </me-scroll>
        <product-footer></product-footer>
      </div>
    </transition>
</template>

<script>
  import {getProductDetail} from 'api/product';
  import MeScroll from 'base/scroll';
  import productSlider from './slider';
  import productHeader from './header';
  import productFooter from './footerbar';
  import productDetail from './detail';

  export default {
    name: 'home-product',
    components: {
      productSlider,
      MeScroll,
      productDetail,
      productHeader,
      productFooter
    },
    data() {
      return {
        data: {}
      };
    },
    props: {
      productId: ''
    },
    methods: {
      updateScroll() {
        this.$refs.scroll.update();
      },
      getProduct() {
        getProductDetail(this.$route.params.id).then(res => {
          return new Promise(resolve => {
            if (res) {
              this.data = res;
              resolve();
            }
          });
        });
      }
    },
    created() {
      this.getProduct();
    },
    deactivated() { // 清除keep-alive的缓存
      this.$destroy(true);
    }
  };
</script>

<style lang="scss" scoped>
    @import '~assets/scss/mixins';

  .product {
    overflow: hidden;
    position: absolute;
    z-index: $product-z-index;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #f5f5f5;
    padding-bottom: 45px;

    &-slider {
      height: 286px;
      overflow: hidden;
    }

    &-slider-item {
      img {
        width: 100%;
      }
    }
  }

  /* 动画效果 */
  .product-transition {
    &-enter-active, &-leave-active {
      transition: all 0.3s;
    }

    &-leave-to, &-enter {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
