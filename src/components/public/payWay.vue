<template>
  <div>
    <div class="box" @click="hiddleToggle" v-if="payMoneyModel"></div>
    <div class="payWay" v-if="payMoneyModel">
      <p class="zhifuWay">请选择支付方式</p>
      <div class="itemWay clearfix" @click="getType(1)">
        <img src="../../assets/imgs/weixin.png" alt>
        <span class="zhifu">微信支付</span>
        <span class="choose fr">
          <img src="../../assets/imgs/gouxuan.png" alt v-show="isShowPic">
        </span>
      </div>
      <div class="itemWay clearfix" @click="getType(2)">
        <img src="../../assets/imgs/zhifubao.png" alt>
        <span class="zhifu">支付宝支付</span>
        <span class="choose fr">
          <img src="../../assets/imgs/gouxuan.png" alt v-show="!isShowPic">
        </span>
      </div>
      <p class="zhifuAtOnce" @click="goPayAt">立即支付</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowPic: true,
      payMoneyModel: false,
      type: 0
    };
  },
  props: {
    zhiObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    hiddleToggle() {
      this.payMoneyModel = false;
    },
    // 微信接口
    getWei() {
      this.$axios
        .post("/order/wxh5Request", {
          phone: "12345678901",
          orderSn: this.zhiObj.orderSn,
          remark: this.zhiObj.remark
        })
        .then(res => {
          console.log(res.data.data);
          location.href = res.data.data;
        });
    },
    goPayAt() {
      console.log(this.zhiObj);
      if (this.zhiObj.remark == "") {
        this.$toast("请写上您的留言备注");
        return false;
      }
      if (this.type == 0) {
        this.getWei();
      } else if (this.type == 1) {
        // 走支付包
        console.log(this.type);
      }
    },
    getType(index) {
      if (index == 1) {
        this.isShowPic = true;
        this.type = 0;
      } else if (index == 2) {
        this.isShowPic = false;
        this.type = 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/*蒙版*/
.box {
  opacity: 0.8;
  background: #000;
  z-index: 99;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.payWay {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  font-size: 16px;
  background-color: #fff;
  .zhifuWay {
    padding-left: 1rem;
    line-height: 1.5rem;
    color: #999;
    border-bottom: 1px solid #f1f1f1;

    font-size: 14px;
  }
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

  .zhifuAtOnce {
    width: 100%;
    background-color: #ff7f01;
    line-height: 2rem;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
}
</style>

