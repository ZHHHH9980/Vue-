<template>
  <me-navbar redHeader class="personal-header" title="我的慕淘">
    <i class="iconfont icon-msg" slot="right"></i>
    <i class="iconfont icon-setting" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'personalHeader',
    components: {
      MeNavbar
    }
  };
</script>

<style lang="scss" scoped>
  @import '~assets/scss/mixins';
  .iconfont {
    color: #ffffff;
    font-size: $icon-font-size-sm;
  }
  .icon-msg {
    margin-right: 10px;
  }
</style>
