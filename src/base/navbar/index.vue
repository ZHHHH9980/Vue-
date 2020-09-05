<template>
    <div class="mine-navbar" :class="{'mine-navbar-red': redHeader}">
      <div class="mine-navbar-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="mine-navbar-center" v-if="$slots.center">
        <slot name="center"></slot>
      </div>
      <div class="mine-navbar-right" v-if="$slots.right">
        <slot name="right"></slot>
      </div>
      <h1 class="mine-navbar-title" v-if="title">
        <span class="mine-navbar-text" :class="colorObject" v-text="title"></span>
      </h1>
    </div>
</template>

<script>
  export default {
    name: 'MeNavbar',
    props: {
      title: {
        type: String,
        default: ''
      },
      gray: {
        type: Boolean,
        default: false
      },
      red: {
        type: Boolean,
        default: false
      },
      redHeader: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        colorObject: {
          'mine-navbar-text-gray': this.gray,
          'mine-navbar-text-red': this.red
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-navbar {
    position: relative;
    @include flex-between();
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    &-red {
      background-color: $header-bgc-translucent;
    }
    &-left {
      margin-left: 10px;
    }
    &-left ~ &-right {
      margin-right: 10px;
      position: static;
    }

    &-center{
      flex: 1;
      margin: 0 10px;
    }
    &-center ~ &-right {
      margin-right: 10px;
      position: static;
    }

    &-right {
      position: absolute;
      right: 10px;
    }
    &-title {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      right: 20%;
      @include flex-center();

      .mine-navbar-text {
        font-size: 18px;
        @include ellipsis();
        width: 100%;
        text-align: center;
        line-height: 1.5;
        color: #fff;
        &-gray {
          color: #999999;
        }
        &-red {
          color: $header-bgc-translucent;
        }
      }
    }
  }

</style>
