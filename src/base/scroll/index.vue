<template>
    <swiper :options="swiperOption" ref="swiper">
      <div class="mine-scroll-pull-down" v-if="pulldown">
        <me-loading
          :text="pullDownText"
          inline
          ref="pullDownLoading">
        </me-loading>
      </div>
      <swiper-slide>
        <slot></slot>
      </swiper-slide>
      <div class="mine-scroll-pull-up" v-if="pullup">
        <me-loading
          :text="pullUpText"
          inline
          ref="pullUpLoading"
        ></me-loading>
      </div>
      <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import {PULL_DOWN_HEIHGT,
          PULL_DOWN_TEXT_INIT,
          PULL_DOWN_TEXT_START,
          PULL_DOWN_TEXT_ING,
          PULL_DOWN_TEXT_END,
          PULL_UP_HEIGHT,
          PULL_UP_TEXT_INIT,
          PULL_UP_TEXT_START,
          PULL_UP_TEXT_ING,
          PULL_UP_TEXT_END } from './config';

  export default {
    name: 'Mescroll',
    components: {
      swiper,
      swiperSlide,
      MeLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      data() {
        this.update();
      }
    },
    created() {
      this.init();
    },
    methods: {
      update() {
        this.$nextTick(() => {
          this.$refs.swiper && this.$refs.swiper.swiper.update();
        });
      },
      init() {
        this.isPulling = false;
        this.pullDownText = PULL_DOWN_TEXT_INIT;
        this.pullUpText = PULL_UP_TEXT_INIT;
        this.swiperOption = {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd,
            transitionEnd: this.scrollEnd
          }
        };
      },

      scrollToTop(speed = this.$refs.swiper.swiper.params.speed) {
        this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed);
      },
      scroll() {
        const swiper = this.$refs.swiper.swiper;
        const isPullingUp = swiper.height + Math.abs(swiper.translate) > parseInt(swiper.$wrapperEl.css('height'));

        // 监听滚动事件
        this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper);
        if (this.isPulling) {
          return;
        }

        if (swiper.translate > 0) { // translate > 0 下拉
          if (!this.pulldown) {
            return;
          }

          if (swiper.translate > PULL_DOWN_HEIHGT) {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        } else if (isPullingUp) { // 上拉
          if (!this.pullup) {
            return;
          }

          if (Math.abs(swiper.translate) > parseInt(swiper.$wrapperEl.css('height')) - swiper.height + PULL_UP_HEIGHT) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      scrollEnd() {
        // transitionend
        this.$emit('scrollEnd', this.$refs.swiper.swiper.translate, this.$refs.swiper.swiper, this.isPulling);
      },
      touchEnd() {
        const swiper = this.$refs.swiper.swiper;
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'));

        if (!this.pulldown || this.isPulling) {
          return;
        }

        if (swiper.translate > PULL_DOWN_HEIHGT) {
          this.isPulling = true;
          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed); // 设置速度
          swiper.setTranslate(PULL_DOWN_HEIHGT); // 停止高度
          swiper.params.virtualTranslate = true; // 不能移动
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          // 交给父组件处理，比如增加定时器之类的处理
          this.$emit('pullDownEnd', this.pullDownEnd);
        } else if (Math.abs(swiper.translate) > totalHeight - swiper.height + PULL_UP_HEIGHT) {
          this.isPulling = true;
          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed); // 设置速度
          swiper.setTranslate(-(totalHeight - swiper.height + PULL_UP_HEIGHT)); // 停止高度
          swiper.params.virtualTranslate = true; // 不能移动
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
          // 交给父组件处理，比如增加定时器之类的处理
          this.$emit('pullUpEnd', this.pullUpEnd);
        }
      },
      pullDownEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.isPulling = false;
        swiper.allowTouchMove = true; // 禁止触摸
        swiper.params.virtualTranslate = false; // 移动
        swiper.setTransition(swiper.params.speed); // 设置速度
        swiper.setTranslate(0); // 停止高度
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        // 监听下拉结束恢复原位的事件
        setTimeout(() => {
          this.$emit('pullDownTransitionEnd');
        }, swiper.params.speed);
      },
      pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.isPulling = false;
        swiper.allowTouchMove = true; // 禁止触摸
        swiper.params.virtualTranslate = false; // 移动
        swiper.setTransition(swiper.params.speed); // 设置速度
        swiper.setTranslate(swiper.translate); // 停止高度
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
      },
      noMoreInfomation(text) {
        this.$refs.pullUpLoading.setText(text);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    height: auto;
  }

  .mine-scroll-pull-down {
    position: absolute;
    bottom: 100%;
    width: 100%;
    height: 80px;
  }

  .mine-scroll-pull-up {
    padding-top: 20px;
    height: 60px;
  }
</style>
