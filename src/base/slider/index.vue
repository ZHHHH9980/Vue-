<template>
  <swiper :options="swiperOption" :key="keyId">
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper } from 'vue-awesome-swiper';
  export default {
    name: 'MeSlider',
    components: {
      swiper
    },
    props: {
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return [
            'horizontal',
            'vertical'
          ].indexOf(value) > -1;
        }
      },
      interval: {
        type: Number,
        default: 3000,
        validator(value) {
          return value >= 0;
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        keyId: Math.random(),
        swiperOption: {
          watchOverflow: true, // 仅有一张幻灯片，swiper会失效
          direction: this.direction,
          autoplay: this.interval ? {
            delay: this.interval,
            disableOnInteraction: false // 有交互不会停止自动轮播
          } : false,
          slidersPerView: 1,
          loop: this.data.length === 1 ? false : this.loop,
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        }
      };
    },
    watch: {
      data(newData) {
        if (!newData.length) {
          return;
        }
        // 通过key触发生命周期钩子
        this.keyId = Math.random();

        this.swiperOption.loop = newData.length === 1 ? false : this.loop;
      }
    },
    methods: {
      update() {
        this.keyId = Math.random();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
