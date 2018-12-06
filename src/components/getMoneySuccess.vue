<template>
  <div class="get_success">
    <mt-header title="提现成功" fixed style="height:1.8rem">
      <mt-button icon="back" size="small" slot="left"></mt-button>
    </mt-header>
    <!--支付成功-->
    <div class="paySuccess">
      <p class="pay_ture">提现成功</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "pay_success",
  data() {
    return {};
  },
  methods: {
    //点击跳转商品详情
    goBack() {},
    goShare() {}
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
.get_success {
  height: 100%;
}
</style>




