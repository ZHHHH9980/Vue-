<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length">
    </me-loading>
    <me-slider
      :direction="direction"
      :interval="interval"
      :loop="loop"
      :pagination="pagination"
      :data="sliders"
      v-else
    >
      <swiper-slide
        v-for="(item, index) in sliders"
        :key="index"
      >
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt="" class="slider-img">
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
  import MeSlider from 'base/slider';
  import MeLoading from 'base/loading';
  import { swiperSlide } from 'vue-awesome-swiper';
  import { sliderOptions } from './config';
  import { getHomeSlider } from 'api/home';
  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      MeLoading,
      swiperSlide
    },
    data() {
      return {
        direction: sliderOptions.direction,
        interval: sliderOptions.interval,
        loop: sliderOptions.loop,
        pagination: sliderOptions.pagination,
        sliders: []
      };
    },
    created() {
      this.getSliders();
    },
    methods: {
      update() {
        return this.getSliders();
      },

      getSliders() {
        return getHomeSlider().then(data => {
          this.sliders = data;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .slider-wrapper {
    height: 183px;
    width: 100%;
  }
  .slider-link {
    width: 100%;
    height: 183px;
  }
  .slider-img {
    width: 100%;
  }
</style>
