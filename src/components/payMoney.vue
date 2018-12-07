<template>
  <div class="payConfirm">
    <mt-header title="订单支付" style="height:1.8rem" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="paymoney">
      <p class="pay">支付金额</p>
      <p class="money">Y1.00</p>
      <p class="zhifuWay">请选择支付方式</p>
    </div>
    <div class="payWay">
      <div class="itemWay clearfix" @click="getType(1)">
        <img src="../assets/imgs/weixin.png" alt>
        <span class="zhifu">微信支付</span>
        <span class="choose fr">
          <img src="../assets/imgs/gouxuan.png" alt v-show="isShow">
        </span>
      </div>
      <div class="itemWay clearfix" @click="getType(2)">
        <img src="../assets/imgs/zhifubao.png" alt>
        <span class="zhifu">支付宝支付</span>
        <span class="choose fr">
          <img src="../assets/imgs/gouxuan.png" alt v-show="!isShow">
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      isShowAt: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getType(index) {
      if (index == 1) {
        this.isShow = true;
      } else if (index == 2) {
        this.isShow = false;
      }
    }
  },
  created() {
    document.title = "订单支付";
  }
};
</script>
<style lang="scss" scoped>
.payConfirm {
  height: 100%;
  background-color: #f1f1f1;
  padding-top: 2rem;
  font-size: 14px;
  .paymoney {
    text-align: center;
    background-color: #fff;
    .pay {
      line-height: 2rem;
      font-size: 16px;
    }
    .money {
      line-height: 3.5rem;
      font-size: 30px;
    }
    .zhifuWay {
      background-color: #f1f1f1;
      line-height: 2rem;
      text-align: left;
      padding-left: 0.5rem;
    }
  }
  .payWay {
    background-color: #fff;
    .itemWay {
      padding: 0.4rem 0.6rem;

      border-bottom: 1px solid #f1f1f1;
      img {
        width: 0.8rem;
      }
      .zhifu {
        margin-left: 0.5rem;
      }
      .choose {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-right: 0.2rem;
        border: 1px solid #ccc;
        position: relative;
        img {
          width: 0.9rem;
          height: 0.9rem;
          position: absolute;
          left: -1px;
          top: -1px;
        }
      }
    }
  }
}
</style>