<template>
  <div id="pay_success">
    <mt-header title="支付成功" style="height:1.8rem">
      <mt-button icon="back" size="small" slot="left">回首页</mt-button>
    </mt-header>
    <!--支付成功-->
    <div class="paySuccess">
      <img src="../assets/imgs/zhifuchenggong.png" alt class="success">
      <p class="pay_ture">支付成功</p>
      <div class="mealDetail">
        <p class="detail">套餐详情</p>
        <img src="../assets/imgs/right.png" alt>
      </div>
    </div>
    <!--分享好友提醒按钮-->
    <div class="shareFriend">
      <span class="goBack" @click="goBack">回首页</span>
      <span class="goshare" @click="goShare">分享好友赚</span>
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
#pay_success {
  height: 100%;
  background-color: #f1f1f1;

  .mint-header {
    background: #fff;
    color: #ff7f01;
    font-size: 16px;
  }
  /*支付成功*/
  .paySuccess {
    width: 100%;
    font-size: 16px;
    margin-top: 0.1rem;
    padding-top: 2rem;
    background-color: #fff;
    .success {
      width: 2rem;
      height: 2rem;
      display: block;
      margin: 1rem auto;
    }
    .pay_ture {
      text-align: center;
      color: #ff7f01;
      font-weight: normal;
    }
    .mealDetail {
      width: 100%;
      height: 2rem;
      margin: 1rem auto;
      font-size: 14px;
      display: flex;
      align-items: center;
      .detail {
        width: 85%;
        padding-left: 1rem;
        color: #c1c5c8;
      }
      img {
        width: 1rem;
        color: #ff7f01;
      }
    }
  }

  .shareFriend {
    width: 100%;
    display: flex;
    font-size: 14px;
    text-align: center;
    align-items: center;
    color: #fff;
    justify-content: center;
    .goBack {
      width: 30%;
      line-height: 1.5rem;
      border-radius: 0.8rem;
      background-color: grey;
    }
    .goshare {
      width: 30%;
      margin-left: 5%;
      line-height: 1.5rem;
      border-radius: 0.8rem;
      background-color: #ff7f01;
    }
  }
}
</style>
