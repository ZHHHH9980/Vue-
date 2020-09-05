<template>
    <div class="cart">
      <cart-header class="cart-header"></cart-header>
      <me-scroll ref="scroll" scrollbar>
        <img class="cart-content" :src="cartItem[0].picUrl" alt="">
        <img class="cart-content" :src="cartItem[1].picUrl" alt="">
      </me-scroll>
    </div>
</template>

<script>
  import cartHeader from './header';
  import MeScroll from 'base/scroll';
  import {cartItem} from './config';
  export default {
    name: 'Cart',
    components: {
      cartHeader,
      MeScroll
    },
    data() {
      return {
        cartItem: {}
      };
    },
    created() {
      this.cartItem = cartItem;
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';
  .cart {
    height: 100%;
  }
  .cart-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $navbar-z-index;
  }
  .cart-content {
    width: 100%;
  }
</style>
