<template>
  <div class="packDetails">
    <mt-header fixed title="套餐详情">
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
    <!--商品信息-->
    <div>
      <div class="productInfo">
        <img :src="packageInfo.goodsImg" alt class="goodPic">
        <div class="line1">
          <p class="name txt-cut">{{packageInfo.goodsTitle}}</p>
          <p class="money">￥{{packageInfo.sellPrice}}</p>
        </div>
        <div class="line2">
          <p class="guige">{{packageInfo.number}}枚/{{packageInfo.dateTime}}个月</p>
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
    <!--待收货 别的状态需要 -->
    <div class="sendInfotitle" v-if="infoObj.statusValue == '部分发货' || infoObj.statusValue == '待收货'">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">
          <div>已发货</div>
        </mt-tab-item>
        <mt-tab-item id="1">
          <div>待发货</div>
        </mt-tab-item>
      </mt-navbar>

      <!--列表内容容器下拉-->
      <mt-tab-container v-model="selected">
        <!--已发货列-->
        <mt-tab-container-item id="0">
          <div class="already_huo">
            <div class="monthBorder" v-for="(item,index) in isSend" :key="index">
              <div class="box_one" @click="clickBtn(index)">
                <p>{{item.date}}</p>
                <span>{{item.status_text}}</span>
                <img src="../assets/imgs/arrow-dow.png" v-show="item.otherParam">
                <img src="../assets/imgs/arrow-up.png" v-show="!item.otherParam">
              </div>
              <div class="information_exhibition" v-if="item.otherParam">
                <p>{{item.date}}</p>
                <span @click="goOrder(item.id)">订单详情</span>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <!--  待发货列-->
        <mt-tab-container-item id="1">
          <div class="stay_huo">
            <div class="boxs_one" v-for="(item,index) in noSend" :key="index">
              <p>{{item.date}}</p>
              <span>{{item.status_text}}</span>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 代付款状态 -->
    <div class="waitPay" v-if="infoObj.statusValue == '未支付'">
      <p @click="goPay">去支付</p>
    </div>
    <div class="orderTime">
      <p>订单详情</p>
      <div class="clearfix">
        <p>
          <span class="fl">下单时间</span>
          <span class="fr">{{infoObj.addTime}}</span>
        </p>
        <p v-if="infoObj.payTime !=''">
          <span class="fl">付款时间</span>
          <span class="fr">{{infoObj.payTime}}</span>
        </p>
        <p v-if="infoObj.sendTime != ''">
          <span class="fl">发货时间</span>
          <span class="fr">{{infoObj.sendTime}}</span>
        </p>
      </div>
    </div>
    <payWay :zhiObj="zhiObj" ref="child"></payWay>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import payWay from "./public/payWay";

export default {
  name: "packDetails",
  data() {
    return {
      isShow: false,
      receiver: "",
      upClick: true,
      phone: "",
      orderSn: "",
      province: "",
      city: "",
      detail: "",
      county: "",
      infoObj: {},
      packageInfo: {},
      goodsImg: "",
      zhiObj: {},
      selected: "0",
      otherParam: false,
      goodsArray: {},
      isSend: [],
      remark: ""
    };
  },
  methods: {
    goPay() {
      this.$refs.child.payMoneyModel = true;
    },
    goOrder() {
      this.$router.push({
        path: "/orderDetails",
        query: {
          id: this.$route.query.id
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    clickBtn(index) {
      this.isSend[index].otherParam = !this.isSend[index].otherParam;
    },
    getList() {
      this.$axios
        .post("/order/theOrderInfo", {
          phone: "12345678901",
          id: this.$route.query.id
        })
        .then(res => {
          this.infoObj = res.data.data;
          console.log(this.infoObj);
          this.packageInfo = res.data.data.orderGoods[0].packageInfo;
          this.isSend = res.data.data.isSend;
          this.noSend = res.data.data.noSend;
          this.orderSn = res.data.data.orderSn;
          this.remark = res.data.data.remark;
          this.zhiObj.orderSn = res.data.data.orderSn;
          this.zhiObj.remark =
            res.data.data.orderGoods[0].packageInfo.goodsTitle;
          if (res.data.data.length > 0) {
            this.clickBtn(0);
          }
        });
    }
  },
  components: {
    payWay
  },
  created() {
    // document.title = "套餐详情";
    this.getList();
  },
  watch: {
    // selected(value) {
    //   console.log(value);
    // }
  },
  mounted() {}
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
  .waitPay {
    margin: 0.8rem 0;
    width: 100%;
    p {
      width: 6rem;
      margin: 0 auto;
      line-height: 1.8rem;
      border-radius: 0.8rem;
      color: #fff;
      height: 1.8rem;
      text-align: center;
      background-color: #ff7f01;
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
        padding: 0.2rem 0.4rem;
        color: #c1c5c8;
        height: 1rem;
      }
    }
  }

  .sendInfotitle {
    margin-top: 0.5rem;
    /deep/ .mint-navbar {
      background: #f0f0f0;
      padding: 0 4rem;
    }
    a {
      color: #ff7f01;
    }
    .mint-navbar .mint-tab-item {
      background-color: #ffffff;
      padding: 13px 0;
      border-radius: 0.8rem 0 0 0.8rem;
    }
    .mint-navbar .mint-tab-item:nth-child(2) {
      background-color: #ffffff;
      border-radius: 0 0.8rem 0.8rem 0;
      border-left: 2px solid #ff7f01;
    }
    /deep/.mint-tab-item {
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
    padding: 0 1rem;
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
      margin-right: 0.5rem;
      margin-top: 0.3rem;
    }
  }
}
</style>

