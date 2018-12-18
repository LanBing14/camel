<template>
  <div id="product_details">
    <mt-header title="商品详情" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <div class="swipeImg">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item,index) in pictureArray" :key="index">
          <img :src="item" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--商品名称-->
    <div class="productInfo">
      <div class="infoOne">
        <p class="eggName txt-cut">{{title}}</p>
      </div>
      <div class="colorPrice">
        <span>￥{{price}}</span>
      </div>
    </div>
    <!--选择套餐-->
    <div class="chooseSpecial clearfix">
      <p class="choose fl">
        分享好友可赚
        <span style="color:#ff7f01">￥{{sharePrice}}</span>
      </p>
    </div>

    <!--商品详情-->
    <div class="productDetails">
      <p class="detailTop">商品详情</p>
      <div class="contImg" v-html="content"></div>
    </div>
    <div class="buyAndRob">
      <div class="buy" @click="chooseModel">
        <p class="free">省钱购</p>
        <p style="fontSize: 14px">积分价￥{{scorePrice}}元</p>
      </div>
    </div>

    <!--蒙版-->
    <div class="box" id="box" v-if="isShow " @click="hiddleToggle"></div>
    <!--选择规格-->
    <div class="choice-style" v-if="isShowTao">
      <div class="choice-box">
        <div class="goods-details">
          <img alt class="good-picture" :src="img">
          <div class="money">
            <p class="price">￥{{sellPrice}}</p>
            <p class="greyIcon">原价￥{{marketPrice}}</p>
            <p class="style">库存{{stock}}件</p>
          </div>
        </div>
        <div class="choice">
          <p class="colors">套餐规格</p>
          <div class="color-choice">
            <div
              class="colorItem"
              v-for="(list,key) in packageArray"
              :key="key"
              :class="{activeModel:iskey==key}"
              @click="choice(key)"
            >{{list.number}}枚/{{list.dateTime}}个月</div>
          </div>
        </div>
        <p class="infuse">每月配送30枚，共{{dateTime}}个月</p>
        <div class="numbers">
          <p class="number">购买数量</p>
          <div class="modified">
            <div class="low" @click="sum"></div>
            <input type="number" class="count" readonly="readonly" v-model="mount">
            <div class="plus" @click="sums">+</div>
          </div>
        </div>
        <div class="yes" @click="goConfirmation">确认</div>
      </div>
    </div>

    <div class="choice-style" v-if="isShowShang">
      <div class="choice-box">
        <div class="goods-details">
          <img alt class="good-picture" :src="img">
          <div class="money">
            <p class="price">￥{{spacePrice}}</p>
            <p class="style">库存{{spaceStock}}件</p>
          </div>
        </div>
        <div class="choice">
          <p class="colors">商品规格</p>
          <div class="color-choice">
            <div
              class="colorItem"
              @click="choiceGui(key)"
              v-for="(item,key) in specArray"
              :key="key"
              :class="{activeModel:activekey==key}"
            >{{item.value}}{{item.name}}</div>
          </div>
        </div>
        <div class="numbers">
          <p class="number">购买数量</p>
          <div class="modified">
            <div class="low" @click="sum"></div>
            <input type="number" class="count" readonly="readonly" v-model="mount">
            <div class="plus" @click="sums">+</div>
          </div>
        </div>
        <div class="yes" @click="goConfirm">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "product_details",
  data() {
    return {
      packageList: [],
      isShow: false,
      iskey: -1,
      commentCount: "",
      activekey: -1,
      price: "",
      mount: 1,
      specArray: [],
      isShowShang: false,
      isShowTao: false,
      title: "",
      sellPrice: "",
      img: "",
      sale: "",
      content: "",
      isFreight: 0,
      pictureArray: [],
      packageArray: [],
      dateTime: "",
      sharePrice: "",
      stock: "",
      scorePrice: "",
      marketPrice: "",
      commentFirst: {},
      packageId: "",
      goodsId: "",
      spacePrice: "",
      spaceMarket: "",
      spaceStock: "",
      goodId: "",
      value: ""
    };
  },
  methods: {
    chooseModel() {
      this.isShow = true;
      if (this.packageArray.length > 0) {
        this.isShowTao = true;
        this.choice(0);
        return false;
      } else if (this.specArray.length > 0) {
        this.isShowShang = true;
        this.choiceGui(0);
        return false;
      }
    },
    goback() {
      this.$router.go(-1);
    },
    hiddleToggle() {
      this.isShow = false;
      this.isShowShang = false;
      this.isShowTao = false;
    },
    //商品确定
    goConfirm() {
      this.$router.push({
        path: "/payConfirm",
        query: {
          packageId: 0,
          goodsId: this.goodsId,
          number: this.mount,
          value: this.value,
          productid: this.productid
        }
      });
    },
    //规格
    choiceGui(i) {
      this.activekey = i;
      this.spacePrice = this.specArray[i].sellPrice;
      this.goodsId = this.specArray[i].goodsId;
      this.spaceStock = this.specArray[i].stock;
      this.value = this.specArray[i].value;
      this.productid = this.specArray[i].id;
    },
    //套餐选中后的样式
    choice(i) {
      this.iskey = i;
      this.sellPrice = this.packageArray[i].sellPrice;
      this.stock = this.packageArray[i].stock;
      this.number = this.packageArray[i].number;
      this.dateTime = this.packageArray[i].dateTime;
      //套餐id
      this.packageId = this.packageArray[i].id;
      //产品id
      this.goodsId = this.packageArray[i].goodsId;
      this.marketPrice = this.packageArray[i].marketPrice;
    },

    //套餐确定
    goConfirmation() {
      this.$router.push({
        path: "/payConfirm",
        query: {
          packageId: this.packageId,
          goodsId: this.goodsId,
          number: this.mount
        }
      });
    },
    getList() {
      this.$axios
        .post("/index/productDetail", {
          id: this.$route.query.id
        })
        .then(res => {
          var info = res.data.data;
          console.log(info);
          if (res.data.status == "1") {
            this.title = info.title;
            this.price = info.sellPrice;
            this.img = info.img;
            this.content = info.content;
            this.sharePrice = info.sharePrice;
            this.pictureArray = info.pictureArray;
            this.scorePrice = info.scorePrice;
            this.packageArray = info.packageArray;
            this.specArray = info.specArray;
            if (this.packageArray.length > 0) {
              this.sellPrice = info.packageArray[0].sellPrice;
              this.marketPrice = info.packageArray[0].marketPrice;
              this.stock = info.packageArray[0].stock;
              this.dateTime = info.packageArray[0].dateTime;
            } else if (this.specArray.length > 0) {
              this.spacePrice = info.specArray[0].sellPrice;
              this.spaceStock = info.specArray[0].stock;
            }
          }
        });
    },
    goback() {
      this.$router.go(-1);
    },
    sums: function() {
      this.mount++;
    },
    sum: function() {
      if (this.mount >= 2) {
        this.mount--;
      } else {
        Toast({
          message: "数量不能小于1",
          duration: 1500
        });
      }
    }
  },
  created() {
    // document.title = "商品详情";
    this.getList();
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
#product_details {
  background: #f0f0f0;
  padding-top: 1.9rem;

  .swipeImg {
    width: 100%;
    height: 12rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  /*商品名称*/
  .productInfo {
    font-size: 16px;
    border-bottom: 2px solid #f1f1f1;
    background-color: #fff;

    .infoOne {
      display: flex;
      align-items: center;
      .eggName {
        width: 65%;
        height: 1.5rem;
        line-height: 1.5rem;
        margin: 0 0.5rem;
        font-size: 18px;
        color: #2a1011;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
      }
    }
    .colorPrice {
      font-size: 28px;
      margin-top: 0.5rem;
      color: #ff7f01;
      padding-left: 0.5rem;
      line-height: 2rem;
    }
    .infoTwo {
      width: 90%;
      display: flex;
      align-items: center;
      margin: 0rem 0.5rem;
      color: #8b8989;
      line-height: 1.2rem;
      font-size: 14px;
      .active1 {
        width: 35%;
        text-align: left;
      }
      .active2 {
        width: 35%;
        text-align: center;
      }
      .active3 {
        width: 40%;
        text-align: right;
      }
    }
  }
  /*选择套餐*/
  .chooseSpecial {
    font-size: 16px;
    padding: 0 0.5rem;
    line-height: 2rem;
    background-color: #fff;
  }
  /*全部评价*/

  .all_evaluate {
    font-size: 16px;
    padding-bottom: 1rem;
    background-color: #fff;
    .titleBox {
      background-color: #f1f1f1 !important;
      color: #000;
      line-height: 1.5rem;
      padding: 0 0.5rem;
    }
    .userEvaluate {
      background-color: #fff;
      padding: 0.3rem 0.5rem;
      .evaluateBox {
        display: flex;
        align-items: center;
        font-size: 14px;

        .useImg {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.8rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.8rem;
          }
        }
        .userName {
          line-height: 1rem;
          margin-left: 0.2rem;
          overflow: hidden;
        }
        .userPhone {
          margin-left: 0.2rem;
        }
      }
      .content {
        width: 100%;
        margin-top: 0.5rem;
      }
    }
    .evaluateBtn {
      color: #000;
      width: 5rem;
      font-size: 18px;
      line-height: 1.8rem;
      background-color: #fff !important;
      margin: 0 auto;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-align: center;
      border: 1px solid #1c1c1c;
      border-radius: 1rem;
    }
  }

  /*立即购买*/

  .buyAndRob {
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    background-color: #ff7f01;
    bottom: 0;
    position: fixed;
    right: 0;
    padding: 0.3rem 0;

    .buy {
      width: 100%;
      height: 100%;
      text-align: center;
      color: #fff;
      .free {
        font-size: 16px;
        line-height: 1.1rem;
      }
      p {
        font-size: 14px;
      }
    }
  }

  .productDetails {
    margin-bottom: 2.5rem;
    font-size: 16px;
    .detailTop {
      height: 1.5rem;
      line-height: 1.5rem;
      background-color: #fff;
      padding-left: 0.6rem;
      margin-top: 0.1rem;
    }
    .contImg {
      text-align: center;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
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

  /*选择规格*/
  .choice-style {
    .choice-box {
      position: fixed;
      background: #fff;
      width: 100%;
      bottom: 0;
      min-height: 18rem;
      font-size: 16px;
      z-index: 999;
      overflow-y: auto;
      overflow-x: hidden;
      .goods-details {
        display: flex;
        padding: 1rem 0 0 0.8rem;
        .good-picture {
          width: 3rem;
          height: 3rem;
        }
        .money {
          padding-left: 0.8rem;
          .price {
            line-height: 1.2rem;
            text-align: left;
            color: #ff7f01;
          }
          .greyIcon {
            color: #999;
            font-size: 14px;
            text-decoration: line-through;
          }
          .style {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 2rem;
            color: #000;
            text-align: left;
          }
        }
        .close {
          width: 1rem;
          height: 1rem;
          position: relative;
          float: right;
          right: -7.8rem;
        }
      }
      .choice {
        .colors {
          margin: 1.2rem 0 0 0;
          padding-left: 1rem;
        }
        .color-choice {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 0.5rem;
          padding: 0.5rem;
          .colorItem {
            border: 1px solid #79797b;
            color: #000;
            width: 30%;
            padding: 0 0.1rem;
            height: 1.5rem;
            line-height: 1.5rem;
            border-radius: 40px;
            margin: 0.2rem 0.5%;
            text-align: center;
          }
          .activeModel {
            border: 1px solid #ff7f01;
            color: #ff7f01;
          }
        }
      }
      .infuse {
        color: #ff7f01;
        padding-left: 1rem;
        line-height: 1.2rem;
      }
      .numbers {
        display: flex;
        height: 2rem;
        align-items: center;
        margin-top: 1rem;
        .number {
          padding-left: 1rem;
          line-height: 1.5rem;
        }
        .modified {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5rem;
          border: 1px solid #79797b;
          width: 5rem;
          height: 1.5rem;
          position: relative;
          right: -5rem;
          .low {
            width: 0.4rem;
            background-color: #000;
            height: 0.1rem;
            margin-right: 0.3rem;
          }
          input {
            border: none;
            width: 2rem;
            font-size: 20px;
            text-align: center;
          }
          .plus {
            font-size: 20px;
            font-weight: 700;
            margin-left: 0.3rem;
          }
        }
      }
      .yes {
        color: #fff;
        background-color: #ff7f01;
        position: fixed;
        bottom: 0;
        height: 2.3rem;
        width: 100%;
        font-size: 18px;
        text-align: center;
        line-height: 2.4rem;
      }
    }
  }
}
</style>