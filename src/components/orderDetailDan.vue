<template>
  <div class="packDetails">
    <mt-header fixed title="订单详情">
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <!-- 信息发货 -->
    <div class="infoWay">
      <img :src="infoObj.statusImg" alt>
      <span>{{infoObj.statusValue }}</span>
    </div>
    <!-- /*收货人信息*/ -->
    <div class="Consignee">
      <img src="../assets/imgs/map.png" class="sign">
      <div class="messages">
        <p class="name">
          {{infoObj.name}}
          <span class="phone">{{infoObj.phone}}</span>
        </p>
        <p class="address">{{infoObj.address}}</p>
      </div>
      <!-- <img src="../assets/imgs/right.png" alt class="right"> -->
    </div>
    <div>
      <div class="productInfo">
        <img :src="specArray.goodsImg" alt class="goodPic">
        <div class="line1">
          <p class="name txt-cut">{{specArray.goodsTitle}}</p>
          <p class="money">￥{{specArray.sellPrice}}</p>
        </div>
        <div class="line2">
          <p class="guigeG">{{specArray.value}}{{specArray.name}}</p>
          <p class="num">x{{infoObj.number}}</p>
        </div>
      </div>
      <div class="sendWay">
        <div class="sendWayTop">
          <p>
            配送方式:
            <span>快递</span>
            <span>￥{{infoObj.freight}}</span>
          </p>
          <p>
            积分抵扣:
            <span>{{infoObj.discount}}</span>
          </p>
          <p>
            <span>买家留言:</span>
            {{infoObj.remark}}
          </p>
        </div>
        <div class="sendWayBot clearfix">
          <p>
            总计
            <span>￥{{infoObj.amount}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="orderTime">
      <p>订单详情</p>
      <div class="clearfix">
        <p>
          <span class="fl">下单时间</span>
          <span class="fr">{{infoObj.addTime}}</span>
        </p>
        <p v-if="infoObj.payTime != ''">
          <span class="fl">付款时间</span>
          <span class="fr">{{infoObj.payTime}}</span>
        </p>
        <p v-if="infoObj.sendTime != ''">
          <span class="fl">发货时间</span>
          <span class="fr">{{infoObj.sendTime}}</span>
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
      receiver: "",
      upClick: true,
      phone: "",
      province: "",
      packageGoodsList: {},
      city: "",
      packageInfo: {},
      detail: "",
      county: "",
      copyContent: "11111111111111111111111111111",
      infoObj: {},
      orderGoods: {},
      selected: "0",
      specArray: {}
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    clickBtn() {
      this.upClick = !this.upClick;
    },
    copy() {
      var copybtn = document.getElementsByClassName("btn");
      var clipboard = new Clipboard(copybtn);
      let _this = this;
      clipboard.on("success", function() {
        this.$toast("复制成功");
        _this.destroy();
        _this.clipboard = new Clipboard(copyBtn);
      });
      clipboard.on("error", function() {
        Toast("复制失败，请手动复制");
      });
    },
    getList() {
      this.$axios
        .post("/order/theOrderInfo", {
          phone: localStorage.getItem("phone"),
          id: this.$route.query.id
        })
        .then(res => {
          this.infoObj = res.data.data;
          this.specArray = res.data.data.orderGoods[0].specArray;
        });
    }
  },
  created() {
    // document.title = "订单详情";
    this.state = this.$route.query.state;
    this.getList();
  },
  watch: {
    selected(value) {
      console.log(value);
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
  padding-top: 1.9rem;
  background: #f0f0f0;
  font-size: 16px;
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
        margin-right: 0.8rem;
      }
      .guigeG {
        width: 2rem;
        text-align: center;
        line-height: 1rem;
        border-radius: 0.2rem;
        background-color: #f1f1f1;
        color: #000;
        margin-right: 5rem;
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
    padding: 0.6rem 0.6rem;
    margin-top: 0.1rem;

    .sign {
      width: 0.7rem;
    }
    .messages {
      width: 82%;
      padding-left: 1rem;
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
        padding: 0.5rem 0.4rem;
        color: #c1c5c8;
        height: 0.3rem;
      }
    }
  }

  .sendInfotitle {
    margin-top: 0.5rem;
    /deep/ .mint-navbar {
      background: #f0f0f0;
      padding: 0 3rem;
    }
    a {
      color: #ff7f01;
    }
    .mint-navbar .mint-tab-item {
      background-color: #ffffff;
      border-radius: 0.8rem 0 0 0.8rem;
    }
    .mint-navbar .mint-tab-item:nth-child(2) {
      background-color: #ffffff;
      border-radius: 0 0.8rem 0.8rem 0;
      border-left: 2px solid #ff7f01;
    }
    /deep/.mint-tab-item {
      width: 5rem;
      color: #000;
    }
    /deep/ .mint-navbar .mint-tab-item.is-selected {
      border-bottom: none;
      color: #fff;
      margin-bottom: 0;
      background-color: #ff7f01;
    }
    /deep/ .mint-tab-item-label {
      font-size: 14px;
    }
  }
  .already_huo {
    background: #ffffff;
    width: 100%;
    font-size: 16px;
    margin-top: 0.5rem;
    .monthBorder:last-child {
      border-bottom: none;
    }
    .monthBorder {
      position: relative;
      border-bottom: 1px solid #c1c5c8;
      .box_one {
        padding: 0.5rem 1rem 0.56rem 1rem;
        color: #666666;
        width: 92%;
        p {
          display: inline-block;
          font-weight: 500;
        }
        span {
          text-align: right;
          float: right;
          margin-right: 2rem;
        }
        img {
          position: absolute;
          right: 1rem;
          top: 0.7rem;
          width: 0.9rem;
          height: 0.5rem;
        }
      }
      .order_btn {
        color: #252424;
        font-weight: 500;
        padding: 0.75rem 1rem 0.4375rem 1rem;
      }
    }
  }
  .stay_huo {
    margin-top: 0.5rem;
    background: #ffffff;
    width: 100%;
    font-size: 16px;
    .boxs_one:last-child {
      border-bottom: none;
    }
    .boxs_one {
      padding: 0.5rem 1rem 0.56rem 1rem;
      color: #666666;
      width: 92%;
      border-bottom: 1px solid #c1c5c8;
      p {
        display: inline-block;
        font-weight: 500;
      }
      span {
        text-align: right;
        float: right;
        margin-right: 2rem;
      }
    }
  }
  .information_exhibition {
    width: 92%;
    background: #ffffff;
    z-index: 9;
    font-size: 16px;
    border-top: 1px solid #c1c5c8;
    top: 2.25rem;
    padding: 0 0.5rem;
    p {
      display: inline-block;
      color: #999999;
      line-height: 2rem;
      font-size: 15px;
    }

    span {
      text-align: center;
      width: 3rem;
      line-height: 1.4rem;
      height: 1.4rem;
      color: #ff7f01;
      float: right;
      font-size: 14px;
      border: 1px solid #ff7f01;
      border-radius: 0.8rem;
      margin-left: 0.5rem;
      margin-top: 0.3rem;
    }
  }
}
</style>

