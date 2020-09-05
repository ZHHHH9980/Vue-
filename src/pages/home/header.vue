<template>
    <me-navbar class="header" v-show="visible">
      <i class="iconfont icon-scan" slot="left"></i>
      <me-searchbox
        slot="center"
        placeholder="开学季有礼，好货五折起"
        @query="getQuery"
        @click.native="goToSearch"
        fake
      >搜索框</me-searchbox>
      <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchbox from 'base/search-box';

  export default {
    name: 'HomeHeader',
    components: {
      MeNavbar,
      MeSearchbox
    },
    data() {
      return {
        visible: false
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      getQuery(query) {
        console.log(query);
      },
      goToSearch() {
        this.$router.push('/search');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';

  .mine-navbar.header {
    background-color: transparent;
    transition: background-color 0.6s;
    .iconfont {
      font-size: $icon-font-size;
      color: #fff;
    }

    &.header-transition {
      background-color: $header-bgc-translucent;
    }
  }

</style>
