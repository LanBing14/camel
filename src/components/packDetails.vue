<template>
  <div class="packDetails">
    <mt-header fixed title="订单详情">
      <mt-button icon="back" size="small" slot="left"></mt-button>
    </mt-header>
    <!-- 信息发货 -->
    <div class="infoWay">
      <img src="../assets/imgs/daishouhuo.png" alt>
      <span>待收货</span>
    </div>
    <div class="infoWay" v-show="isShow">
      <img src="../assets/imgs/daipingjia.png" alt>
      <span>待评价</span>
    </div>
    <!-- /*收货人信息*/ -->
    <div class="Consignee" v-show="isShow">
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
    <!-- 发货地址 -->
    <div class="sendInfo">
      <div class="sendItem">
        <img src="../assets/imgs/car.png" alt>
      </div>
      <div class="sendItem">
        <p>
          <span>物流名称:</span>
          <span>中国邮政</span>
        </p>
        <p style="width: 8rem;">
          <span class="fl">物流单号:</span>
          <input
            type="text"
            v-model="copyContent"
            id="copy_text"
            style="width: 5rem;margin-left:.2rem"
          >
        </p>
      </div>
      <div class="sendItem">
        <button
          class="btn"
          style="float: right;border: none;"
          ref="copy"
          data-clipboard-action="copy"
          data-clipboard-target="#copy_text"
          @click="copy"
        >复制单号</button>
      </div>
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
    <div class="sendWay">
      <div class="sendWayTop">
        <p>
          配送方式:
          <span>快递</span>
          <span>￥0.00</span>
        </p>
        <p>
          积分抵扣:
          <span>0</span>
        </p>
        <p>
          <span>买家留言:</span>
          请及时留言
        </p>
      </div>
      <div class="sendWayBot clearfix">
        <p>
          总计
          <span>￥234</span>
        </p>
      </div>
    </div>

    <div class="orderTime">
      <p>订单详情</p>
      <div class="clearfix">
        <p>
          <span class="fl">下单时间</span>
          <span class="fr">2018/8/23/20:21</span>
        </p>
        <p>
          <span class="fl">付款时间</span>
          <span class="fr">2018/8/23/20:21</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "packDetails",
  data() {
    return {
      isShow: false,
      receiver: "依稀",
      phone: "15434565434",
      province: "江苏省",
      city: "徐州市",
      detail: "111111111111111111111111",
      county: "盐城市",
      copyContent: "34123412423412343"
    };
  },
  methods: {
    copy() {
      var copybtn = document.getElementsByClassName("btn");
      var clipboard = new Clipboard(copybtn);
      let _this = this;
      clipboard.on("success", function() {
        Toast("复制成功");
        _this.destroy();
        _this.clipboard = new Clipboard(copyBtn);
      });
      clipboard.on("error", function() {
        Toast("复制失败，请手动复制");
      });
    }
  },
  mounted() {
    var copybtn = document.getElementsByClassName("btn");
    var clipboard = new Clipboard(copybtn);
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.packDetails {
  height: 100%;
  padding-top: 2rem;
  font-size: 16px;
  background-color: #f1f1f1;
  .infoWay {
    height: 2.88rem;
    line-height: 2.88rem;
    background-color: #fff;
    text-align: center;
    color: #ff7f01;
    img {
      width: 1.1rem;
      height: 1.1rem;
    }
    span {
      margin-left: 0.2rem;
    }
  }

  //   发货信息
  .sendInfo {
    display: flex;
    font-size: 14px;
    height: 3.8rem;
    box-sizing: border-box;
    padding-top: 1rem;
    background-color: #fff;
    margin-top: 0.1rem;
    align-content: center;
    .sendItem {
      margin-left: 0.8rem;
      line-height: 1rem;
      img {
        width: 2rem;
      }
    }
    .sendItem:nth-child(2) {
      margin-left: 0.5rem;
    }
    .sendItem:last-child {
      margin-top: 0.2rem;
      button {
        width: 2.5rem;
        height: 1.2rem;
        background-color: #fff;
        border: 0;
        border: 1px solid #000;
        border-radius: 0.3rem;
      }
    }
  }
  /*商品信息*/
  .productInfo {
    background: #ffffff;
    width: 100%;
    font-size: 16px;
    margin-top: 0.3rem;
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
  /*收货人信息*/
  .Consignee {
    display: flex;
    align-items: center;
    background-color: #fff;
    font-size: 16px;
    padding: 0.6rem 0.5rem;
    margin-top: 0.1rem;

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
  .sendWay {
    font-size: 14px;
    background-color: #fff;
    margin-top: 0.1rem;
    line-height: 1.3rem;
    color: #000;
    .sendWayTop {
      padding: 0.5rem;
      border-bottom: 1px solid #f1f1f1;
    }
    .sendWayBot {
      font-size: 16px;
      p {
        float: right;
        margin-right: 0.3rem;
        line-height: 1.5rem;
        span {
          color: #ff7f01;
        }
      }
    }
  }
  .orderTime {
    background-color: #fff;
    color: #000;
    font-size: 14px;
    margin-top: 0.3rem;
    p {
      line-height: 1.3rem;
      padding-left: 0.4rem;
    }
    div {
      border-top: 2px solid #f1f1f1;
      p {
        padding: 0.2rem 0.4rem;
        color: #c1c5c8;
        height: 1rem;
      }
    }
  }
}
</style>

