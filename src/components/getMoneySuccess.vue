<template>
  <div class="get_success">
    <mt-header title="提现成功" fixed style="height:1.8rem">
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <div class="paySuccess">
      <img src="../assets/imgs/zhifuchenggong.png" alt class="success">
      <p class="pay_ture publiColor">提现成功</p>
      <p class="pay_price">12342</p>
      <p class="pay_info">我们会在两个工作日审核您的提现申请,请您耐心等待</p>
    </div>
    <div class="details" @click="goMingXi">
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
    goBack() {
      this.$router.go(-1);
    },
    goMingXi() {
      this.$router.push("/invitedDetails");
    }
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
.get_success {
  height: 100%;
  font-size: 14px;
  padding-top: 1.9rem;
  background-color: #f0f0f0;
  .paySuccess {
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 2rem;
    background-color: #fff;
    img {
      width: 2rem;
    }
    .pay_ture {
      line-height: 1.2rem;
      font-size: 16px;
    }
    .pay_info {
      width: 90%;
      margin: 0 auto;
      font-size: 12px;
      margin-top: 1rem;
    }
    .pay_price {
      color: #ff7f01;
      font-size: 14px;
    }
  }
  .details {
    margin-top: 1rem;
    text-align: center;
    p {
      width: 4.5rem;
      line-height: 1.6rem;
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




