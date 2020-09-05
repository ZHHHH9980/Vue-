<template>
    <me-navbar gray class="cart-header" title="购物车">
      <i class="iconfont icon-setting" slot="right"></i>
    </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'cartHeader',
    components: {
      MeNavbar
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';
  .iconfont {
    font-size: $icon-font-size-sm;
  }
</style>
