<template>
  <transition name="mine-backtop-transition">
    <a
      href="#"
      class="mine-backtop"
      v-show="visible"
      @click="backtoTop"
    >
      <i class="iconfont icon-backtop"></i>
    </a>
  </transition>
</template>

<script>
  export default {
    name: 'MeBacktoTop',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backtoTop() {
        this.$emit('backtoTop');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';

  .mine-backtop {
    overflow: hidden;
    @include flex-center();
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
  }

  .iconfont {
    color: #fff;
    font-size: 38px;
  }

  .mine-backtop-transition {
    &-leave-active,
    &-enter-active {
      transition: 0.6s opacity;
    }

    &-enter, &-leave-to {
      opacity: 0;
    }
  }
</style>
