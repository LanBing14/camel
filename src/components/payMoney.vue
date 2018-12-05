<template>
  <div class="payMoney">
    <mt-header title="订单支付">
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>

    <div class="moneyContent">
      <p class="title">支付金额</p>
      <p class="price">￥99</p>
    </div>
    <div class="wayPay">
      <p>请选择支付方式</p>
    </div>
    <div class="zhifu">
      <div class="zhifuItem" @click="getType(1)">
        <img src="../assets/imgs/weixin.png" alt class="imgPay">
        <span>微信支付</span>
        <div class="xuanze fr">
          <img src="../assets/imgs/gouxuan.png" alt v-show="weiShow">
        </div>
      </div>
    </div>

    <div class="confirm">
      <p>确认支付</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weiShow: true
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getType(index) {}
  },
  created() {
    document.title = "订单支付";
  }
};
</script>
<style lang="scss" scoped>
.payMoney {
  height: 100%;

  .mint-header {
    background: #cc3e36;
  }
  .moneyContent {
    text-align: center;
    font-size: 14px;
    .title {
      height: 2rem;
      padding-top: 0.5rem;
      line-height: 2rem;
    }
    .price {
      line-height: 4rem;
      font-size: 24px;
      font-weight: 700;
    }
  }

  .wayPay {
    font-size: 14px;
    height: 2rem;
    background-color: #f1f1f1;
    line-height: 2rem;
    padding-left: 1rem;
  }
  .zhifu {
    font-size: 16px;
    .zhifuItem {
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
      .imgPay {
        width: 1rem;
        height: 1rem;
      }
      .xuanze {
        width: 0.9rem;
        height: 0.9rem;
        border: 1px solid #aaaaaa;
        margin: 0.3rem 0.8rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }

  .confirm {
    width: 100%;
    font-size: 16px;
    color: #fff;
    text-align: center;
    margin-top: 2rem;
    p {
      width: 80%;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.3rem;
      margin: 0 auto;
      background-color: red;
    }
  }
}
</style>