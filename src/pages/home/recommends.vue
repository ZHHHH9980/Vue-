<template>
    <div class="recommends">
      <h3 class="recommends-title">热卖推荐</h3>
      <me-loading v-if="!recommends.length" class="recommends-loading"></me-loading>
      <ul v-else class="recommends-list">
        <li class="recommends-item" v-for="(item, index) in recommends" :key="index">
          <router-link class="recommends-link"
          :to="{name: 'home-product', params: {id: item.baseinfo.itemId}}"
          @click.native="getProductId"
          >
            <p class="recommends-pic"><img v-lazy="item.baseinfo.picUrl" class="recommends-img" alt=""></p>
            <p class="recommends-name">{{item.name.shortName}}</p>
            <p class="recommends-origPrice"><del>{{item.price.origPrice}}</del></p>
            <p class="recommends-info">
              <span class="recommends-price">￥<strong class="recommends-price-num">{{item.price.actPrice}}</strong></span>
              <span class="recommends-count">{{item.remind.soldCount}}件已售</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  import { getHomeRecommend } from 'api/home';
  import MeLoading from 'base/loading';
  export default {
    name: 'HomeRecommends',
    components: {
      MeLoading
    },
    data() {
      return {
        recommends: [],
        curPage: 1,
        totalPage: 1
      };
    },
    created() {
      this.getRecommends();
    },
    methods: {
      update() {
        return this.getRecommends();
      },

      getProductId() { // 获取产品id
        this.$emit('getProductId', this.$route.params.id);
      },
      getRecommends() {
        if (this.curPage > this.totalPage) {
          return Promise.reject(new Error('没有更多推荐'));
        }
        return getHomeRecommend(this.curPage).then(data => {
          return new Promise(resolve => {
            if (data) {
              this.curPage++;
              this.totalPage = data.totalPage;
              this.recommends = this.recommends.concat(data.itemList);
              this.$emit('loaded', this.recommends);
            }
            resolve();
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';

  .recommends {

    &-title {
      font-size: $font-size-l;
      text-align: center;
      height: 30px;
      line-height: 30px;
      position: relative;
      &::before, &::after {
        content: ' ';
        display: block;
        height:1px;
        width: 35%;
        position: absolute;
        top: 50%;
        background-color: #ddd;
      }
      &::before {
        left: 0px;
      }
      &::after {
        right: 0px;
      }
    }
    &-list {
      @include flex-between();
      flex-wrap: wrap;
    }
    &-link {
      display: block;
    }
    &-item {
      width: 48%;
      background-color: #fff;
      box-shadow:0 1px 1px 0 rgba(0, 0, 0, 0.12);
      margin-bottom: 8px;
    }

    &-pic{
      position: relative;
      width: 100%;
      padding-top: 100%;
    }

    &-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    &-name {
      height: 36px;
      padding: 0 5px;
      margin-bottom: 8px;
      line-height: 1.5;
      @include multiline-ellipsis();
    }

    &-origPrice {
      padding: 0 5px;
      margin-bottom: 8px;
    }

    &-info {
      @include flex-between();
      padding: 0 5px;
      margin-bottom: 8px;
    }

    &-price {
      color: #e61414;
    }

    &-price-num {
      font-size: 20px;
    }

  }

  .recommends-loading {
    margin: 100px 0;
  }

</style>
