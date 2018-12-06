<template>
  <div class="get_success">
    <mt-header title="提现成功" fixed style="height:1.8rem">
      <mt-button icon="back" size="small" slot="left"></mt-button>
    </mt-header>
    <div class="paySuccess">
      <p class="pay_ture">您已成功申请提现</p>
      <p class="pay_info">我们会在两个工作日审核您的提现申请,请您耐心等待</p>
      <p class="pay_price">12342</p>
    </div>
    <div class="details">
      <p>查看明细</p>
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
  font-size: 14px;
  background-color: #f1f1f1;
  .paySuccess {
    text-align: center;
    margin: 2rem auto;
    .pay_ture {
      padding-top: 1rem;
      line-height: 2rem;
      font-size: 16px;
    }
    .pay_info {
      line-height: 1rem;
      width: 90%;
      margin: 0 auto;
      background-color: rgb(223, 222, 222);
      font-size: 12px;
    }
    .pay_price {
      color: #ff7f01;
      font-size: 20px;
      line-height: 2rem;
      margin-top: 1rem;
    }
  }
  .details {
    text-align: center;
    p {
      width: 4.5rem;
      line-height: 2rem;
      border-radius: 1rem;
      background-color: #ff7f01;
      color: #fff;
      font-size: 16px;
      margin: 0 auto;
      border: 1px solid #ff7f01;
    }
  }
}
</style>




