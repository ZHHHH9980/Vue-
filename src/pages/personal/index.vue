<template>
    <div class="personal">
      <personal-header></personal-header>
      <me-scroll scrollbar>
        <img class="personal-pic" :src="personalItems.picUrl" alt="">
        <img class="personal-pic" :src="personalItems.picUrl" alt="">
      </me-scroll>
    </div>
</template>

<script>
  import personalHeader from './header';
  import {personalItems} from './config';
  import MeScroll from 'base/scroll';
  export default {
    name: 'Personal',
    components: {
      personalHeader,
      MeScroll
    },
    data() {
      return {
        personalItems: {}
      };
    },
    created() {
      this.personalItems = personalItems;
    }
  };
</script>

<style lang="scss" scoped>
  .personal {
    height: 100%;
  }
  .personal-pic {
    width: 100%;
  }
</style>
