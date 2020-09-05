<template>
  <me-navbar class="product-header" title="商品详情">
    <i class="iconfont icon-back" slot="left" @click="goBackToHome"></i>
    <i class="iconfont icon-cart" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'productHeader',
    components: {
      MeNavbar
    },
    methods: {
      goBackToHome() { // 点击返回首页
        this.$router.back();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';

  .product {
    .iconfont {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      display: block;
    }
    &-header {
      position: absolute;
      top: 0;
      left: 0;
      z-index: $navbar-z-index;
      background-color: $header-bgc-translucent;
    }
  }
</style>
