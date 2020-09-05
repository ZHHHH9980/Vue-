<template>
  <!-- 轮播图 -->
  <me-slider
    class="product-slider"
    direction="horizontal"
    :interval="0"
    loop
    pagination
    ref="slider"
  >
    <me-loading v-if="data.slider == undefined"></me-loading>
    <swiper-slide v-else class="product-slider-item" v-for="(item, index) in data.slider" :key="index">
      <img :src="item" alt="">
    </swiper-slide>
  </me-slider>
</template>

<script>
  import MeLoading from 'base/loading';
  import MeSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';

  export default {
    name: 'productSlider',
    props: {
      data: {
        type: [Array, Object],
        default: function () {
          return {};
        }
      }
    },
    components: {
      MeSlider,
      MeLoading,
      swiperSlide
    },
    watch: {
      data() {
        // 更新滚动条-loop
        this.$refs.slider.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .product {
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
</style>
