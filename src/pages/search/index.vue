<template>
  <transition name="search">
    <div class="search">
    <header class="g-header-container">
        <search-header @query="getQuery"/>
    </header>
    <div class="g-content-container">
      <me-scroll ref="scroll" v-if="!query.length">
        <search-hot @loaded="updateScroll" ></search-hot>
        <search-history
          @show-confirm="showConfirm"
          ref="history"
          @remove-item="updateScroll"
        ></search-history>
      </me-scroll>
      <search-result :query="query" v-else></search-result>
    </div>
    <me-confirm
      msg="确认清空吗？"
      ref="confirm"
      @confirm="clearAllHistorys"
    ></me-confirm>
  </div>
  </transition>
</template>

<script>
  import MeScroll from 'base/scroll';
  import MeConfirm from 'base/confirm';
  import searchHeader from './header';
  import SearchHot from './hot';
  import SearchHistory from './history';
  import SearchResult from './result';

  export default {
    name: 'Search',
    components: {
      MeScroll,
      MeConfirm,
      searchHeader,
      SearchHot,
      SearchHistory,
      SearchResult
    },
    data() {
      return {
        query: ''
      };
    },
    methods: {
      getQuery(query) {
        this.query = query;
      },
      showConfirm() {
        this.$refs.confirm.show();
      },
      clearAllHistorys() {
        this.$refs.history.clearHistory();
        this.$refs.history.update();
      },
      updateScroll() {
        this.$refs.scroll.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .g-content-container {
    height: 100%;
    padding-top: 50px;
  }
  .search {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-z-index;
    background-color: $bgc-theme;
  }
  .search-enter-active,
  .search-leave-active {
      transition: all 0.3s;
  }

  .search-enter,
  .search-leave-to {
     transform: translate3d(100%, 0, 0);
  }
</style>
