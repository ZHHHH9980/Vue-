<template>
    <div class="footer">
      <ul class="footer-list">
        <li class="footer-item"><i class="iconfont icon-shop"></i><span>店铺</span></li>
        <li class="footer-item"><i class="iconfont icon-service"></i><span>客服</span></li>
        <li class="footer-item"><i class="iconfont icon-collect"></i><span>收藏</span></li>
      </ul>
        <p class="footer-cart">加入购物车</p>
        <p class="footer-buy">马上抢</p>
    </div>
</template>

<script>
  export default {
    name: 'productFooter'
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';
  .footer {
    height: 45px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #fff;
    z-index: $tabbar-z-index;
    display: flex;
    box-shadow: 0 -2px 0.2rem 0 rgba(154, 141, 141, 0.6);

    &-list {
      width: 40%;
      display: flex;
    }
    &-item {
      flex: 1;
      @include flex-center(column);
      .iconfont {
        margin-bottom: 7px;
      }
    }

    &-cart, &-buy {
      width: 30%;
      line-height: 45px;
      text-align: center;
      color: #fff;
    }
    &-cart {
      background-color: #ff9500;
    }
    &-buy {
      background-color: #ff0036;
    }
  }
</style>
