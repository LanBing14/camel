<template>
  <div id="product_details">
    <div class="header">
      <img src="../assets/imgs/right.png" alt class="imgSl fl">
      <a href="#miao" class="fl first">商品</a>
      <a href="#wang" class="fl">详情</a>
      <a href="#meng" class="fl">评价</a>
    </div>
    <div class="swipeImg" id="miao">
      <mt-swipe :auto="3000">
        <mt-swipe-item>
          <img src="../assets/imgs/swiper.png" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--商品名称-->
    <div class="productInfo">
      <div class="infoOne">
        <p class="eggName txt-cut">标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
      </div>
      <div class="colorPrice">
        <span>￥70</span>
      </div>
      <div class="infoTwo clearfix">
        <p class="active1">包月发送</p>
        <p class="active2">快递 freight元</p>
        <p class="active3">月销 sale</p>
      </div>
    </div>
    <!--选择套餐-->
    <div class="chooseSpecial" @click="chooseModel">
      <p class="choose">选择套餐</p>
    </div>
    <!--全部评价-->
    <div class="all_evaluate" id="meng">
      <div class="titleBox">全部评价</div>
      <div class="userEvaluate">
        <div class="evaluateBox">
          <div class="useImg">
            <img src="../assets/imgs/tou.png">
          </div>
          <p class="userName one-txt-cut">幸福幸福幸福</p>
          <p class="userPhone">手机</p>
        </div>
        <div
          class="content"
        >手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机手机</div>
      </div>
      <div class="evaluateBtn">全部评价</div>
    </div>
    <!--商品详情-->
    <div class="productDetails" id="wang">
      <p class="detailTop">商品详情</p>
      <div class="contImg">
        <img src="../assets/imgs/long.png" alt>
      </div>
    </div>
    <div class="buyAndRob">
      <div class="buy">
        <span class="free">省钱购</span>
        <span style="fontSize: 14px">8元</span>
      </div>
    </div>

    <!--蒙版-->
    <div class="box" id="box" v-if="isShow "></div>
    <!--选择规格-->
    <div class="choice-style" v-if="isShow">
      <div class="choice-box">
        <div class="goods-details">
          <img alt class="good-picture" src="../assets/imgs/user.png">
          <div class="money">
            <p class="price">
              ￥sellPrice
              <span class="greyIcon">原价￥marketPrice</span>
            </p>
            <p class="style">库存stock件</p>
          </div>
        </div>
        <div class="choice">
          <p class="colors">套餐规格</p>
          <div class="color-choice">
            <!-- <div
              v-for="(list,key) in packageList"
              :key="key"
              class="color"
              :class="{active:iskey==key}"
              @click="choice(key)"
            >number/dateTime个月</div>-->
            <div class="colorItem activeModel">122/20个月</div>
            <div class="colorItem">122/20个月</div>
            <div class="colorItem">122/20个月</div>
          </div>
        </div>
        <p class="infuse">每月配送30枚，共dateTime个月</p>
        <div class="numbers">
          <p class="number">购买数量</p>
          <div class="modified">
            <div class="low" @click="sum"></div>
            <input type="number" class="count" readonly="readonly" v-model="mount">
            <div class="plus" @click="sums">+</div>
          </div>
        </div>
        <div class="yes">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "product_details",
  data() {
    return {
      packageList: [],
      isShow: false,
      islogin: false,
      zhuceModel: true,
      mount: 1
    };
  },
  methods: {
    chooseModel() {
      this.isShow = true;
    },
    //规格选中后的样式
    choice: function(i) {
      this.iskey = i;
      this.sellPrice = this.packageList[i].sellPrice;
      this.stock = this.packageList[i].stock;
      this.number = this.packageList[i].number;
      this.dateTime = this.packageList[i].dateTime;
      this.avgPrice = this.packageList[i].avgPrice;
      this.price = this.sellPrice / this.stock;
      this.packageId = this.packageList[i].id;
      this.marketPrice = this.packageList[i].marketPrice;
    },
    sums: function() {
      this.amount++;
    },
    sum: function() {
      if (this.amount >= 2) {
        this.amount--;
      } else {
        Toast({
          message: "数量不能小于1",
          duration: 1500
        });
      }
    }
  },
  created() {},
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
#product_details {
  background-color: #f1f1f1;
  .header {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: #ffffff;
    .imgSl {
      transform: rotate(180deg);
      color: #000;
      margin-top: 0.3rem;
      width: 1.3rem;
    }
    .first {
      margin-left: 1.8rem;
    }
    a {
      color: #ccc;
      text-align: center;
      font-size: 16px;
      width: 18%;
    }
    a.border {
      color: #ff7f01;
      border-bottom: 1px solid #ff7f01;
    }
    a:hover {
      color: #ff7f01;
      border-bottom: 1px solid #ff7f01;
    }
  }

  .swipeImg {
    width: 100%;
    height: 12rem;
    margin-top: 2.1rem;
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
          img {
            width: 100%;
            height: 100%;
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
        line-height: 1rem;
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
      padding-left: 0.6rem;
      margin-top: 0.5rem;
    }
    .contImg {
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

  /*选择规格*/
  .choice-style {
    .choice-box {
      position: fixed;
      background: #fff;
      width: 100%;
      bottom: 0;
      height: 17rem;
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
            line-height: 1.0683760684rem;
            text-align: left;
            color: #ff7f01;
            .greyIcon {
              margin-left: 0.5rem;
              color: rgb(95, 92, 92);
              text-decoration: line-through;
            }
          }
          .style {
            font-family: PingFangSC-Regular;
            color: #333;
            text-align: left;
            margin: 0.2136752137rem 0 0 0.5128205128rem;
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
          margin: 1rem 0 0 0;
          padding-left: 1rem;
        }
        .color-choice {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 1rem;
          .colorItem {
            border: 1px solid #79797b;
            color: #000;
            width: 30%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-radius: 40px;
            margin: 0.2rem 0.2rem;
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
        margin-top: 0.5rem;
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
        height: 2rem;
        width: 100%;
        text-align: center;
        line-height: 2rem;
      }
    }
  }
}
</style>