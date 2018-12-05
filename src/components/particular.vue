<template>
  <div id="product_details">
    <div class="header">
      <img src="../assets/imgs/right.png" alt class="imgSl fl">
      <a href="#miao" class="fl first border">商品</a>
      <a href="#wang" class="fl">详情</a>
      <a href="#meng" class="fl">评价</a>
    </div>
    <div class="swipeImg">
      <mt-swipe :auto="3000">
        <mt-swipe-item></mt-swipe-item>
      </mt-swipe>
    </div>
    <!--商品名称-->
    <div class="productInfo" id="miao">
      <div class="infoOne">
        <p class="eggName txt-cut">标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
      </div>
      <div class="colorPrice">
        <span>70</span>
      </div>
      <div class="infoTwo clearfix">
        <p class="active1">包月发送</p>
        <p class="active2">快递 freight元</p>
        <p class="active3">月销 sale</p>
      </div>
    </div>
    <!--选择套餐-->
    <div class="chooseSpecial">
      <p class="choose">选择套餐</p>
    </div>
    <!--全部评价-->
    <div class="all_evaluate" id="meng">
      <div class="titleBox">全部评价</div>
      <div class="userEvaluate">
        <div class="evaluateBox">
          <div class="useImg">
            <img>
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

    <div class="buyAndRob">
      <div class="buy">
        <p class="free">省钱购</p>
        <p>8元</p>
      </div>
    </div>
    <!--商品详情-->
    <div class="productDetails" id="wang">
      <p class="detailTop">商品详情</p>
    </div>

    <!--蒙版-->
    <div class="box" id="box" v-if="isShow || islogin || zhuceModel"></div>
    <!--选择规格-->
    <div class="choice-style" v-if="isShow">
      <div class="choice-box">
        <div class="goods-details">
          <img alt class="good-picture">
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
            <div class="color">122/20个月</div>
            <div class="color">122/20个月</div>
            <div class="color">122/20个月</div>
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
    <div v-if="islogin" class="loginModel">
      <div class="login">
        <span class="public">账户登录</span>|
        <span>账户注册</span>
      </div>
      <div class="comment">
        <input type="text" placeholder="请输入手机号">
      </div>
      <div class="comment">
        <input type="text" placeholder="请输入密码">
      </div>
      <p>还没有账号?点击去注册</p>
      <div class="btnOne clearfix">
        <span class="cancel fl">取消</span>
        <span class="sure fr">确定</span>
      </div>
    </div>
    <div v-if="zhuceModel" class="zhuceModel">
      <div class="login">
        <span>账户登录</span>|
        <span class="public">账户注册</span>
      </div>
      <div class="comment">
        <input type="text" placeholder="请输入手机号">
      </div>
      <div class="code">
        <input type="text" placeholder="输入验证码">
        <div class="getCode">获取验证码</div>
      </div>
      <div class="comment">
        <input type="text" placeholder="请输入密码">
      </div>
      <p>还没有账号?点击去注册</p>
      <div class="btnOne clearfix">
        <span class="cancel fl">取消</span>
        <span class="sure fr">确定</span>
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
    goAnchor(selector) {
      // href="javascript:void(0)" rel="external nofollow" @click="goAnchor('#anchor')"
      var anchor = this.$el.querySelector(selector);
      document.body.scrollTop = anchor.offsetTop; // chrome
      document.documentElement.scrollTop = anchor.offsetTop; // firefox
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
  background-color: #fff;
  .header {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    position: fixed;
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
    height: 10rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // 登录

  .loginModel {
    background: #eee;
    width: 80%;
    height: 10rem;
    color: #000;
    text-align: center;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    z-index: 999;
    font-size: 16px;
    padding: 0.2rem;
    border-radius: 0.2rem;
    .login {
      color: #000;
      height: 2.2rem;
      line-height: 2.2rem;
      span {
        margin: 0.2rem;
      }
    }
    .public {
      color: #ff7f01;
    }
    .comment {
      margin-top: 0.2rem;
      box-sizing: border-box;
      input {
        width: 65%;
        height: 1.4rem;
        padding-left: 0.5rem;
        margin-bottom: 0.2rem;
        background-color: #fff;
        border-radius: 0.8rem;
      }
    }

    p {
      font-size: 12px;
      color: #ff7f01;
      margin: 0 auto;
      margin-top: 0.5rem;
      width: 40%;
      border-bottom: 1px solid #ff7f01;
    }
    .btnOne {
      width: 70%;
      margin: 0 auto;
      margin-top: 1rem;
      .cancel {
        width: 3.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border: 1px solid #000;
        border-radius: 0.8rem;
      }
      .sure {
        width: 3.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border-radius: 0.8rem;
        border: 1px solid #000;
      }
    }
  }

  //注册
  .zhuceModel {
    background: #eee;
    width: 80%;
    height: 11rem;
    color: #000;
    text-align: center;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    z-index: 999;
    font-size: 16px;
    padding: 0.2rem;
    border-radius: 0.2rem;
    .code {
      width: 65%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 0.8rem;
      padding-left: 0.6rem;
      input {
        width: 59%;
        line-height: 1.4rem;
        font-size: 14px;
      }
      .getCode {
        font-family: PingFang-SC-Medium;
        background: #ff7f01;
        font-size: 14px;
        color: #ffffff;
        line-height: 1.4rem;
        width: 42%;
        border-radius: 0 0.8rem 0.8rem 0;
        text-align: center;
      }
    }
    .login {
      color: #000;
      height: 2.2rem;
      line-height: 2.2rem;
      span {
        margin: 0.2rem;
      }
    }
    .public {
      color: #ff7f01;
    }
    .comment {
      margin-top: 0.2rem;
      box-sizing: border-box;
      input {
        width: 65%;
        height: 1.4rem;
        padding-left: 0.5rem;
        margin-bottom: 0.2rem;
        background-color: #fff;
        border-radius: 0.8rem;
      }
    }

    p {
      font-size: 12px;
      color: #ff7f01;
      margin: 0 auto;
      margin-top: 0.5rem;
      width: 40%;
      border-bottom: 1px solid #ff7f01;
    }
    .btnOne {
      width: 70%;
      margin: 0 auto;
      margin-top: 1rem;
      .cancel {
        width: 3.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border: 1px solid #000;
        border-radius: 0.8rem;
      }
      .sure {
        width: 3.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border-radius: 0.8rem;
        border: 1px solid #000;
      }
    }
  }
  /*商品名称*/
  .productInfo {
    font-size: 16px;
    border-bottom: 2px solid #f1f1f1;
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
      padding-left: 1rem;
      line-height: 2rem;
    }
    .infoTwo {
      width: 90%;
      display: flex;
      align-items: center;
      margin: 0rem 1rem;
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
      text-align: center;
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
          width: 1rem;
          height: 1rem;
          border: 1px solid #000;
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
      line-height: 2rem;
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
    padding: 0.3rem 0;
    .buy:first-child {
      border-left: none;
    }
    .buy {
      width: 100%;
      height: 100%;
      text-align: center;
      color: #000;
      border-left: 1px solid #000;
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
      text-align: center;
      line-height: 1.5rem;
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

  /*领取提醒*/
  .getRemind {
    background: #fff;
    width: 90%;
    color: #000;
    text-align: center;
    position: fixed;
    top: 30%;
    left: 1rem;
    z-index: 999;
    padding-bottom: 1rem;
    border-radius: 0.3rem;
    .remindTop {
      font-size: 20px;
      line-height: 3rem;
    }
    .remindCenter {
      height: 3rem;
      line-height: 2rem;
      font-size: 16px;
    }
    .color-choice {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      .color {
        border: 1px solid #79797b;
        color: #000;
        border-radius: 5rem;
        width: 30%;
        margin: 0.5rem 0.3rem;
        line-height: 2.3rem;
        text-align: center;
      }
      .active {
        border: 1px solid #ff7f01;
        color: #ff7f01;
      }
    }
    .btns {
      width: 100%;
      font-size: 0.9rem;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .cancel {
        width: 40%;
        line-height: 2.5rem;
        border: 1px solid #030000;
        border-radius: 2rem;
        color: #050505;
        margin-right: 2%;
      }
      .true {
        width: 40%;
        line-height: 2.5rem;
        background: #c9161d;
        border-radius: 2rem;
        color: #ffffff;
        margin-left: 2%;
      }
    }
  }
  /*领蛋提醒*/
  .remindOut {
    background: #fff;
    width: 90%;
    color: #000;
    text-align: center;
    position: fixed;
    top: 30%;
    left: 1rem;
    z-index: 999;
    border-radius: 0.3rem;
    .remindTop {
      font-size: 20px;
      line-height: 3rem;
    }
    .remindCenter {
      height: 3rem;
      line-height: 2rem;
      font-size: 16px;
    }
    .remindBot {
      .btn {
        display: inline-block;
        width: 30%;
        margin: 1rem;
        line-height: 2.5rem;
        border-radius: 2rem;
      }
      .btn1 {
        border: 1px solid #ccc;
      }
      .btn2 {
        background: #c9161d;
        color: #ffffff;
      }
    }
  }
  /*领取提醒-下单*/
  .getRemind_xiadan {
    background: #fff;
    width: 90%;
    color: #000;
    text-align: center;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    z-index: 999;
    border-radius: 0.3rem;
    .remindTop {
      font-size: 20px;
      line-height: 3rem;
    }
    .remindCenter {
      height: 3rem;
      line-height: 2rem;
      font-size: 16px;
    }
    .color-choice {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      width: 100%;
      .color {
        border: 1px solid #79797b;
        color: #000;
        border-radius: 5rem;
        width: 36%;
        margin: 0.5rem 0.3rem;
        line-height: 2.3rem;
        text-align: center;
      }
      .active {
        border: 1px solid #ff7f01;
        color: #ff7f01;
      }
    }
    .infuse {
      color: #ff7f01;
      font-size: 14px;
      padding-left: 1rem;
      line-height: 3rem;
    }
    .btns {
      width: 100%;
      font-size: 0.9rem;
      margin: 2rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .cancel {
        width: 40%;
        line-height: 2.5rem;
        border: 1px solid #030000;
        border-radius: 2rem;
        color: #050505;
        margin-right: 2%;
      }
      .true {
        width: 40%;
        line-height: 2.5rem;
        background: #ff7f01;
        border-radius: 2rem;
        color: #ffffff;
        margin-left: 2%;
      }
    }
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
        padding: 1rem 0 0 1rem;
        .good-picture {
          width: 3rem;
          height: 3rem;
          border: 1px solid #000;
        }
        .money {
          padding-left: 1rem;
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
          .color {
            border: 1px solid #79797b;
            color: #000;
            width: 30%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-radius: 40px;
            margin: 0.2rem 0.2rem;
            text-align: center;
          }
          .active {
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