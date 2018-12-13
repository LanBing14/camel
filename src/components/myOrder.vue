<template>
  <div id="myOrder">
    <mt-header fixed title="我的订单">
      <mt-button icon="back" size="small" slot="left"></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id>全部</mt-tab-item>
      <mt-tab-item id="0">待付款</mt-tab-item>
      <mt-tab-item id="1">待收货</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id>
        <div class="orderBox" v-for="(item,index) in orderList" :key="index">
          <p class="orderNum">
            订单编号:
            <span>{{item.orderSn}}</span>
          </p>
          <div class="goodsInfo" v-for="(it,i) in item.orderGoods" :key="i">
            <img :src="it.goodsArray.img" alt>
            <div class="name">
              <p style="font-size: 16px;" class="txt-cut title">{{it.goodsArray.title}}</p>
              <p class="mount">{{it.number}}枚/{{it.packageDateTime}}个月</p>
              <div class="money">
                <p class="jine">￥{{it.packageSellPrice}}</p>
                <p class="shul">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>
              共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns" v-if="item.statusValue == '未支付'">
            <div class="goPay" @click="goPay(item)">去支付</div>
            <div class="flag">{{item.statusValue}}</div>
          </div>
          <div class="btns" v-else>
            <div class="goPay" @click="detailBtn(item.id)">订单详情</div>
            <div class="flag">{{item.statusValue}}</div>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="0">
        <!--待付款列表信息-->
        <div class="orderBox" v-for="(item,index) in orderList" :key="index">
          <p class="orderNum">
            订单编号:
            <span>{{item.orderSn}}</span>
          </p>
          <div class="goodsInfo" v-for="(it,i) in item.orderGoods" :key="i">
            <img :src="it.goodsArray.img" alt>
            <div class="name">
              <p class="txt-cut title" style="font-size: 16px;width:50%;">{{it.goodsArray.title}}</p>
              <p class="mount">{{it.number}}枚/{{it.packageDateTime}}个月</p>
              <div class="money clearfix">
                <p class="jine">￥{{it.packageSellPrice}}</p>
                <p class="shul">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>
              共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="goPay" @click="goPay(item)">去支付</div>
            <div class="flag">{{item.statusValue}}</div>
          </div>
        </div>
      </mt-tab-container-item>

      <!-- 待收货列表-->
      <mt-tab-container-item id="1">
        <div class="orderBox" v-for="(item,index) in orderList" :key="index">
          <p class="orderNum">
            订单编号:
            <span>{{item.orderSn}}</span>
          </p>
          <div class="goodsInfo" v-for="(it,i) in item.orderGoods" :key="i">
            <img :src="it.goodsArray.img" alt>
            <div class="name">
              <p class="txt-cut title" style="font-size: 16px;width:50%;">{{it.goodsArray.title}}</p>
              <p class="mount">{{it.number}}枚/{{it.packageDateTime}}个月</p>
              <div class="money clearfix">
                <p class="jine">￥{{it.packageSellPrice}}</p>
                <p class="shul">x{{item.number}}</p>
              </div>
            </div>
          </div>
          <div class="total">
            <p>
              共{{item.number}}件商品，合计
              <span>￥{{item.amount}}</span>
            </p>
          </div>
          <div class="btns">
            <div class="goPay" @click="detailBtn(item.id)">订单详情</div>
            <div class="flag">{{item.statusValue}}</div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <payWay :zhiObj="zhiObj" ref="child"></payWay>
  </div>
</template>

<script>
import payWay from "./public/payWay";

import { Navbar, TabItem, Toast, MessageBox } from "mint-ui";
export default {
  name: "myOrder",
  data() {
    return {
      selected: "",
      cancelDing: false,
      zhiObj: {},
      orderList: [],
      selectId: ""
    };
  },
  methods: {
    goPay(item) {
      this.$refs.child.payMoneyModel = true;
      this.zhiObj.orderSn = item.orderSn;
      this.zhiObj.totalPrice = item.amount;
    },
    detailBtn(id) {
      this.$router.push({
        path: "/packDetails",
        query: {
          id: id
        }
      });
    },

    getList() {
      this.$axios
        .post("/order/myOrderList", {
          phone: "12345678901",
          status: this.selected
        })
        .then(res => {
          this.orderList = res.data.data;
        });
    }
  },
  created() {
    document.title = "我的订单";
    this.getList();
  },
  mounted() {},
  watch: {
    selected() {
      this.selectId = this.selected;
      this.getList();
    }
  },
  components: {
    payWay
  }
};
</script>

<style lang="scss" scoped>
#myOrder {
  background: #f1f1f1;
  padding-top: 2rem;

  .mint-navbar {
    background-color: #fff;
    a {
      color: #000;
    }
  }

  .mint-navbar .mint-tab-item.is-selected {
    color: #ff7f01;
    border-bottom: 1px solid #ff7f01;
  }
  .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0;
  }
  .mint-navbar .mint-tab-item {
    margin: 0px 17px;
  }
  .orderBox {
    font-size: 14px;
    background: #ffffff;
    margin-top: 0.2rem;
    padding: 0.5rem;
    padding-right: 0;

    .orderNum {
      font-size: 12px;
      color: #79797b;
      margin-bottom: 10px;
      span {
        margin-left: 5px;
      }
    }
    .goodsInfo {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #c1c5c8;
      padding-top: 0.3rem;
      padding-bottom: 1rem;
      img {
        width: 20%;
      }
      .name {
        width: 80%;
        padding-left: 0.8rem;
        color: #252424;
        font-size: 14px;
        position: relative;
        .title {
          line-height: 1.5rem;
        }
        .mount {
          margin-top: 0.6rem;
          color: #c1c5c8;
        }
        .money {
          display: flex;
          align-items: center;
          color: #c1c5c8;

          .jine {
            position: absolute;
            width: 30%;
            right: 0.4rem;
            top: 0.2rem;
            z-index: 9;
            color: #000;
            text-align: right;
          }
          .shul {
            position: absolute;
            width: 20%;
            right: 0.4rem;
            top: 2rem;
            text-align: right;
            z-index: 7;
          }
        }
      }
    }
    .total {
      text-align: right;
      color: #252424;
      p {
        padding-top: 0.5rem;
        padding-right: 0.5rem;
        span {
          color: #ff7f01;
        }
      }
    }
    .btns {
      display: flex;
      align-items: right;
      font-size: 14px;
      justify-content: flex-end;
      text-align: right;
      height: 1.5rem;
      line-height: 1.5rem;
      margin-top: 0.5rem;
      .cancelBtn {
        width: 3rem;
        line-height: 1.5rem;
        text-align: center;
        color: #000;
        border: 1px solid #79797b;
        border-radius: 2rem;
        margin-right: 0.8rem;
      }
      .goPay {
        width: 3rem;
        text-align: center;
        color: #ff7f01;
        border: 1px solid #ff7f01;
        border-radius: 2rem;
        margin-right: 0.8rem;
      }
      .flag {
        position: absolute;
        left: 1rem;
        text-align: center;
        color: #ff7f01;
        width: 3rem;
        height: 1rem;
        line-height: 1rem;
      }
    }
  }
}
</style>

