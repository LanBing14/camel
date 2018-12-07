<template>
  <div class="payConfirm">
    <mt-header title="订单确认" style="height:1.8rem" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>

    <!-- /*收货人信息*/ -->
    <div class="Consignee" @click="xuanModel">
      <img src="../assets/imgs/map.png" class="sign">
      <div class="messages">
        <p class="name">
          {{receiver}}
          <span class="phone">{{phone}}</span>
        </p>
        <p class="address">{{province}}{{city}}{{county}}{{detail}}</p>
      </div>
      <img src="../assets/imgs/right.png" alt class="right">
    </div>
    <!--提示-->
    <div class="hintBox">
      <img src="../assets/imgs/jingao.png" alt class="jingao">
      <p class="hint">由于鸡蛋的配送的特殊性，部分地区暂时不能购买
        <br>
        <span>新疆、西藏、青海、海南、港澳地区</span>
      </p>
    </div>

    <!--商品信息-->
    <div class="productInfo">
      <img src="../assets/imgs/swiper.png" alt class="goodPic">
      <div class="line1">
        <p class="name txt-cut">鸡蛋鸡蛋鸡蛋鸡鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋蛋鸡蛋鸡蛋</p>
        <p class="money">￥12222</p>
      </div>
      <div class="line2">
        <p class="guige">344枚/13个月</p>
        <p class="num">x122</p>
      </div>
    </div>

    <!--商品其他-->
    <div class="others">
      <div class="total">
        <p class="left">商品合计</p>
        <p class="right">￥{{totalPrice}}</p>
      </div>
      <div class="total">
        <p class="left">运费</p>
        <p class="right">{{freight}}</p>
      </div>
      <div class="total">
        <p class="left">
          30分积分抵扣
          <span>Y10</span>
        </p>
        <div class="moren">
          <img src="../assets/imgs/gouxuan.png" alt>
        </div>
      </div>
      <div class="total">
        <p class="left">买家留言</p>
        <input type="text" class="infos" placeholder="请留言" v-model="sName">
      </div>
    </div>

    <!--支付-->
    <div class="payInfo">
      <div class="need">
        需付金额
        <span>￥{{totalPrice}}</span>
      </div>
      <mt-button class="pay" style="height:60px;border-radius:0" v-if="isPaying" type="danger">去支付</mt-button>
      <mt-button class="pay2" style="height:60px;border-radius:0" disabled v-else type="default">支付中</mt-button>
    </div>

    <!-- 模态框 -->
    <!--蒙版-->
    <div class="box" id="box" v-if="isShow"></div>
    <div class="choice-style" v-if="isShow">
      <div class="modelContent">
        <!-- meiyige  -->
        <div class="Consignee">
          <div class="messages">
            <p class="name">
              {{receiver}}
              <span class="phone">{{phone}}</span>
            </p>
            <p class="address">{{province}}{{city}}{{county}}{{detail}}</p>
            <p class="Moaddress" v-if="itemShow ==0">默认地址</p>
          </div>
          <p class="yixuan" v-if="itemShow==0">已选</p>
          <img src="../assets/imgs/right.png" alt class="right">
        </div>
        <div class="Consignee">
          <div class="messages">
            <p class="name">
              {{receiver}}
              <span class="phone">{{phone}}</span>
            </p>
            <p class="address">{{province}}{{city}}{{county}}{{detail}}</p>
            <p class="Moaddress" v-if="itemShow">默认地址</p>
          </div>
          <p class="yixuan" v-if="itemShow">已选</p>
          <img src="../assets/imgs/right.png" alt class="right">
        </div>

        <p class="none">没有更多了</p>

        <div class="bottomXiu clearfix">
          <span class="fl" @click="cancel">取消</span>
          <span class="fr" @click="addBtn">新增地址</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weiShow: true,
      sName: "",
      receiver: "依稀",
      phone: "15434565434",
      isShow: false,
      province: "江苏省",
      city: "徐州市",
      county: "盐城市",
      itemShow: false,
      isPaying: true,
      totalPrice: "222",
      freight: "13",
      detail: "111111111"
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    cancel() {
      this.isShow = false;
    },
    xuanModel() {
      this.isShow = true;
    },
    addBtn() {
      this.$router.push("/creatAddress");
    },
    getType(index) {}
  },
  created() {
    document.title = "订单确定";
  }
};
</script>
<style lang="scss" scoped>
.payConfirm {
  height: 100%;
  background: #f1f1f1;
  padding-top: 2rem;
  .mint-header {
    font-size: 16px;
    background: #ff7f01;
  }
  /*收货人信息*/
  .Consignee {
    display: flex;
    align-items: center;
    background-color: #fff;
    font-size: 16px;
    padding: 0.6rem 0.5rem;
    border-top: 1px solid #c1c5c8;
    border-bottom: 1px solid #c1c5c8;
    .sign {
      width: 0.7rem;
    }
    .messages {
      width: 82%;
      padding-left: 0.8rem;
      .name {
        .phone {
          margin-left: 1rem;
        }
      }
      .address {
        width: 90%;
        margin-top: 0.2rem;
        line-height: 0.8rem;
        font-size: 14px;
        color: #c1c5c8;
        overflow: hidden;
      }
    }
  }
  .choice-style {
    .modelContent {
      position: fixed;
      background: #f1f1f1;
      width: 100%;
      bottom: 0;
      min-height: 15.46rem;
      font-size: 16px;
      z-index: 999;
      overflow-y: auto;
      overflow-x: hidden;
      .none {
        text-align: center;
        font-size: 14px;
        line-height: 2rem;
        color: #c1c5c8;
      }
      .Consignee {
        display: flex;
        align-items: center;
        background-color: #fff;
        font-size: 16px;
        height: 3.2rem;
        padding: 0.3rem 0.2rem 0rem 0.2rem;
        border-bottom: none;
        .yixuan {
          font-size: 12px;
          width: 2rem;
          color: #ff7f01;
          margin-right: -2rem;
        }
        .right {
          margin-left: 1rem;
        }
        .messages {
          width: 82%;
          padding-left: 0.8rem;
          .name {
            .phone {
              margin-left: 1rem;
            }
          }
          .Moaddress {
            font-size: 12px;
            color: #ff7f01;
            line-height: 1rem;
          }
          .address {
            width: 90%;
            margin-top: 0.2rem;
            line-height: 0.6rem;
            font-size: 14px;
            color: #c1c5c8;
            overflow: hidden;
          }
        }
      }

      .bottomXiu {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        margin-top: 1.5rem;
        font-size: 16px;
        margin-bottom: 0.5rem;
        span {
          width: 35%;
          line-height: 1.5rem;
          color: #fff;
          border-radius: 0.8rem;
        }
        span:first-child {
          border: 1px solid #999;
          background-color: #999;
        }
        span:last-child {
          border: 1px solid #ff7f01;
          background-color: #ff7f01;
        }
      }
    }
  }
  /*提示*/
  .hintBox {
    background: #ffffff;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 0.6rem 0.5rem;
    .jingao {
      width: 0.8rem;
      height: 0.8rem;
    }
    .hint {
      width: 80%;
      margin-left: 1rem;
      span {
        color: #ff7f01;
      }
    }
  }
  /*商品信息*/
  .productInfo {
    background: #ffffff;
    width: 100%;
    margin-top: 0.5rem;
    font-size: 16px;
    padding: 0.2rem 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .goodPic {
      width: 3rem;
      margin: 0.5rem;
    }
    .line1 {
      width: 70%;
      margin-top: -1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .name {
        width: 6rem;
        font-size: 16px;
        margin-right: 0.5rem;
      }
      .money {
        position: relative;
        width: 33%;
        font-size: 16px;
        text-align: right;
        overflow: hidden;
      }
    }
    .line2 {
      margin-top: -1rem;
      width: 68%;
      margin-left: 4rem;
      display: flex;
      align-items: left;
      font-size: 14px;
      justify-content: left;
      color: #c1c5c8;
      .guige {
        width: 58%;
        margin-right: 0.5rem;
      }
      .num {
        text-align: right;
        width: 30%;
        right: 0rem;
        position: relative;
      }
    }
  }
  /*商品其他*/
  .others {
    background: #ffffff;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-size: 16px;
    .total {
      display: flex;
      align-items: center;
      position: relative;
      height: 2rem;
      border-bottom: 1px solid #c1c5c8;
      .left {
        width: 50%;
        text-align: left;
        padding-left: 1rem;
        span {
          margin-left: 0.5rem;
        }
      }
      .right {
        width: 50%;
        text-align: right;
        padding-right: 1rem;
      }
      .moren {
        width: 0.9rem;
        height: 0.9rem;
        border: 1px solid #c1c5c8;
        border-radius: 50%;
        position: absolute;
        right: 1rem;
        top: 0.6rem;
        img {
          width: 0.9rem;
          height: 0.9rem;
          position: absolute;
          top: 0px;
          right: 0px;
        }
      }
      .infos {
        width: 95%;
        color: #666666;
        line-height: 1.8rem;
        font-size: 14px;
        margin-left: -2rem;
      }
    }
  }

  /*支付*/
  .payInfo {
    width: 100%;
    display: flex;
    align-items: center;
    position: fixed;
    font-size: 16px;
    bottom: 0;
    background: #fff;
    .need {
      width: 70%;
      text-align: right;
      padding-right: 1rem;
      span {
        color: #ff7f01;
      }
    }
    .pay {
      width: 30%;
      background: #ff7f01;
      color: #fff;

      line-height: 2.5rem;
      text-align: center;
    }
    .pay2 {
      width: 30%;
      line-height: 2.5rem;
      text-align: center;
    }
  }
  /*蒙版*/
  .box {
    opacity: 0.9;
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
}
</style>