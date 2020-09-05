<template>
  <ul class="nav">
    <li class="nav-item"
        v-for="(item, index) in navItems"
        :key="index"
    >
      <a :href="item.linkUrl" class="nav-link">
        <img :src="item.picUrl" alt="" class="nav-img">
        <span class="nav-text">{{item.text}}</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import {navItems} from './config';

  export default {
    name: 'HomeNav',
    created() {
      this.navItems = navItems;
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';

  .nav {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding-top: 10px;
    &-item {
      width: 20%;
      padding-bottom: 10px;
    }
    &-link {
      @include flex-center(column);
    }
    &-img {
      width: 60%;
    }
    &-text {
      margin-top: 8px;
    }
  }
</style>
