<template>
  <div class="product-total">
    <me-loading class="product-loading" v-if="data.content == undefined"></me-loading>
    <div v-else>
      <!-- 商品销售信息 -->
      <p class="product-seller" >
        <span class="price">￥<strong class="price-strong">{{data.content.priceText}}</strong></span>
        <span class="count">{{data.content.sellCount}}件已售</span>
      </p>
      <p class="product-title">{{data.content.title}}</p>
      <p class="product-info">
        <span class="postage">{{data.content.postage}}</span>
        <span class="count">月销量{{data.content.soldCount}}件</span>
        <span class="address">{{data.content.from}}</span>
      </p>
      <!-- 商品评价区域 -->
      <div class="product-remark-wrapper">
        <p class="remark-count">商品评价({{data.content.totalCount}})</p>
        <ul class="keywords">
          <li class="keywords-item" v-for="(item, index) in data.content.keywords" :key="index">{{item.word}}({{item.count}})</li>
        </ul>
        <p class="product-customer">
          <img :src="data.content.headPic" alt="" class="avatar">
          <span class="name">{{data.content.userName}}</span>
        </p>
        <p class="product-description">{{data.content.content}}</p>
        <p class="product-detail">{{data.content.dateTime}}</p>
      </div>
      <!-- 商家描述 -->
      <div class="product-store">
        <div class="product-store-info">
          <img class="icon" :src="data.content.shopIcon" alt="">
          <div>
            <p class="name">{{data.content.shopName}}</p>
            <p class="creditIcon"><img :src="data.content.creditIcon" alt=""></p>
          </div>
        </div>
        <div class="product-store-score">
          <p class="text">
            <span v-for="(evaluate) in data.content.evaluates" :key="evaluate.id">{{evaluate.title}}{{evaluate.score}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';

  export default {
    name: 'productDetail',
    components: {
      MeLoading
    },
    props: {
      data: {
        type: [Array, Object],
        default: () => {
          return {};
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';
  .product {
    &-loading {
      padding-top: 200px;
    }
    &-seller {
      height: 44px;
      width: 100%;
      padding: 0 8px;
      background-image: linear-gradient(to right, #ef3390 , #ef3648);
      color: #fff;
      @include flex-between();
      .price {
        &-strong {
          font-size: $font-size-l;
        }
      }
      .count {
        height: 28px;
        line-height: 28px;
        padding: 0 8px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &-title {
      height: 35px;
      line-height: 35px;
      padding-left: 9px;
      color: #051b28;
      font-size: $font-size-base;
      background-color: #fff;
      border-bottom: 1px solid #fcfcfc;
      @include ellipsis();
    }

    &-info{
      height: 35px;
      padding: 0 9px;
      @include flex-between;
      background-color: #fff;
      color: #999999;
    }

    &-remark-wrapper {
      margin-top: 10px;
      padding: 0 9px 9px;
      background-color: #fff;
      color: #666666;
      .remark-count {
        height: 38px;
        line-height: 38px;
      }
      .keywords {
        display: flex;
        flex-wrap: wrap;
        &-item {
          height: 30px;
          line-height: 30px;
          background-color: #ffeeee;
          border-radius: 8px;
          margin: 0 9px 9px 0;
          padding: 0 9px;
        }
      }

      .product-customer {
        margin-bottom: 10px;
        .avatar {
          height: 24px;
          border-radius: 50%;
        }
        .name {
          color: #666666;
          margin-left: 3px;
          line-height: 24px;
        }
      }

      .product-description {
        color: #051b28;
        line-height: 17px;
      }

      .product-detail {
        color: #999999;
        line-height: 15px;
      }
    }

    &-store {
      padding: 9px;
      margin-top: 10px;
      background-color: #fff;
      &-info {
        display: flex;
        .icon {
          width: 47px;
          height: 47px;
        }
        div {
          margin-left: 5px;
          .name {
            margin: 10px 0 5px;
            font-size: $font-size-l;
            color: #333;
          }
          .creditIcon {
            img {
              height: 14px;
            }
          }
        }

      }
      &-score {
        margin-top: 20px;
        .text {
          color: #999999;
          @include flex-center();
          justify-content: space-around;
        }
      }
    }
  }
</style>
