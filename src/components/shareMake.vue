<template>
  <div class="shareMake">
    <mt-header title="分享赚">
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>

    <div class="makeCoupon">
      <div class="makeItem"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.shareMake {
  .mint-header {
    background: #cc3e36;
  }
}
</style>

