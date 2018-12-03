<template>
  <div class="productMails">
    <div class="top">
      <mt-header title="商城"></mt-header>
    </div>
    <!-- 轮播图 -->
    <div class="swiper-container banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../assets/imgs/1.jpg" alt>
        </div>
        <div class="swiper-slide">
          <img src="../assets/imgs/2.jpg" alt>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

    <!-- 淘宝商城 -->
    <div class="shoppingMall">
      <!-- 商城特惠 -->
      <div class="ShoppingCity fl commonMall clearfix">
        <div class="title">商城特惠</div>
        <div class="hotMall clearfix">
          <div class="leftMallItem fl">
            <div class="img">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="PresentPrice">￥12.89</p>
            <p class="oldPrice">￥99.00</p>
          </div>
          <div class="leftMallItem fl">
            <div class="img">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="PresentPrice">￥12.89</p>
            <p class="oldPrice">￥99.00</p>
          </div>
        </div>
      </div>
      <!-- 淘宝特惠 -->
      <div class="taoBaoCity fl commonMall clearfix">
        <div class="title">淘宝热卖</div>
        <div class="hotMall clearfix">
          <div class="leftMallItem fl">
            <div class="img">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="PresentPrice">￥12.89</p>
            <p class="LenPrice">领8元券</p>
          </div>
          <div class="leftMallItem fl">
            <div class="img">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="PresentPrice">￥12.89</p>
            <p class="LenPrice">领8元券</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 分享转赏金 -->
    <div class="shareMoney">
      <!-- 分享头部 -->
      <div class="shareMoneyTop">
        <span>分享转赏金</span>
        <span>更多赏金</span>
      </div>
      <!-- 分享内容 -->
      <div class="shareMoneyContent clearfix">
        <ul class="clearfix" :style="{width: widthStyle + 'rem'}">
          <li class="shareMoneyItem fl" ref="contentLiStyle" @click="clickMe">
            <div class="shareImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="one-txt-cut">商品标题商品标题商品标题商品标题</p>
            <p>￥99.00</p>
            <div class="shareBtn">
              <div>去分享</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 领券购买 -->
    <div class="Coupon">
      <!-- 头部领券 -->
      <div class="CouponTop">
        <span class="fl">领券购买划算</span>
        <span class="fr">更多优惠</span>
      </div>
      <div class="CouponContent clearfix">
        <!--   -->
        <ul class="content clearfix" :style="{width: widthStyle + 'rem'}">
          <li class="taoGouItem fl" ref="contentStyle">
            <div class="taoGouImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <div class="titleContent">
              <p class="one-txt-cut">商品标题</p>
              <p class="one-txt-cut">商品标题</p>
              <p class="presentPrice">
                券后价
                <span>￥12.89</span>
              </p>
            </div>
            <div class="CouponGetBtn">
              <div class="CouponGet">领3元券</div>
            </div>
          </li>
          <li class="taoGouItem fl" ref="contentStyle">
            <div class="taoGouImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <div class="titleContent">
              <p class="one-txt-cut">商品标题</p>
              <p class="one-txt-cut">商品标题</p>
              <p class="presentPrice">
                券后价
                <span>￥12.89</span>
              </p>
            </div>
            <div class="CouponGetBtn">
              <div class="CouponGet">领3元券</div>
            </div>
          </li>
          <li class="taoGouItem fl" ref="contentStyle">
            <div class="taoGouImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <div class="titleContent">
              <p class="one-txt-cut">商品标题</p>
              <p class="one-txt-cut">商品标题</p>
              <p class="presentPrice">
                券后价
                <span>￥12.89</span>
              </p>
            </div>
            <div class="CouponGetBtn" ref="contentStyle">
              <div class="CouponGet">领3元券</div>
            </div>
          </li>
          <li class="taoGouItem fl" ref="contentStyle">
            <div class="taoGouImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <div class="titleContent">
              <p class="one-txt-cut">商品标题</p>
              <p class="one-txt-cut">商品标题</p>
              <p class="presentPrice">
                券后价
                <span>￥12.89</span>
              </p>
            </div>
            <div class="CouponGetBtn">
              <div class="CouponGet">领3元券</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="prductDetails">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="prductDetailsContent clearfix"
      >
        <li class="clearfix" v-for="item in list">
          <div class="leftImg">
            <img src="../assets/imgs/3.png" alt>
          </div>
          <div class="rightContent">
            <p class="txt-cut">标题标题标题标题标题标题标题标题标题</p>
            <p class="oldPrice">
              原价:
              <span>￥12</span>
            </p>
            <p class="Price">
              现价:
              <span>￥110</span>
            </p>
          </div>
        </li>
      </ul>
      <p v-if="loadingDom" class="loading">没有更多数据</p>
    </div>

    <!-- 底部按钮 -->
    <div class="bottomBtn">
      <span class="fl btnMail">我的</span>
      <span class="fl btnMail">你的</span>
      <span class="fl btnMail">他的</span>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      list: 5,
      loading: false,
      loadingDom: false,
      widthStyle: 30
    };
  },
  methods: {
    loadMore() {
      this.list = 5;
      for (var i = 0; i <= 5; i++) {
        this.list += 5;
      }
    },
    clickMe() {
      alert("我被点击了");
    }
  },
  created() {
    //计算ul的长度
  },
  mounted() {
    var swiper1 = new Swiper(".banner", {
      pagination: {
        el: ".swiper-pagination"
      },
      paginationClickable: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      speed: 500
    });
    let scroll = new BScroll(".CouponContent", {
      scrollX: true,
      click: true
    });
    let scroll1 = new BScroll(".shareMoneyContent", {
      scrollX: true,
      click: true
    });

    // let that = this;
    // //  请求数据完成后获取每个li的高度给ul
    // that.$nextTick(function() {
    //   that.contentStyle = that.$refs.contentStyle.clientWidth;
    // });
  }
};
</script>
<style lang="scss" scoped>
.productMails {
  height: 100%;
  background: #fff;
  position: relative;
  //头部
  .top {
    .mint-header {
      background-color: red;
    }
  }
  // 轮播图
  .swiper-container {
    width: 100%;
    height: 8rem;
    .swiper-slide {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 商城特卖
  .shoppingMall {
    height: 6rem;
    padding: 0.5rem 0.4rem 0.5rem 0.4rem;
    box-sizing: border-box;
    font-size: 16px;
    margin-top: 0.5rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .commonMall {
      width: 48%;
      padding: 0.1rem;
      .title {
        margin-bottom: 0.5rem;
        padding-left: 0.5rem;
      }
      .hotMall {
        padding-left: 0.5rem;
        .leftMall:nth-child(2n) {
          margin-left: 0.5rem;
        }
        .leftMallItem {
          width: 46%;
          .img {
            width: 2rem;
            height: 2rem;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .PresentPrice {
            font-size: 14px;
            line-height: 0.8rem;
          }
          .oldPrice {
            font-size: 12px;
            color: #ccc;
            text-decoration: line-through;
          }
          .LenPrice {
            font-size: 12px;
            color: #ccc;
          }
        }
      }
    }
    .ShoppingCity {
      border-right: 1px solid #ccc;
    }
  }

  // 分享转赏金
  .shareMoney {
    margin-top: 0.5rem;
    width: 100%;
    border-top: 1px solid #ccc;
    font-size: 14px;
    .shareMoneyTop {
      height: 1.4rem;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      span:first-child {
        flex: 1;
        margin-left: 0.5rem;
        line-height: 1.4rem;
      }
      span:nth-child(2n) {
        display: inline-block;
        margin-right: 1rem;
        width: 3.5rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 0.8rem;
      }
    }
    .shareMoneyContent {
      width: 100%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;

      margin-top: 0.3rem;
      .shareMoneyItem:nth-child(2) {
        margin: 0 0.2rem;
      }
      .shareMoneyItem {
        width: 5rem;
        padding: 0.2rem;
        .shareImg {
          width: 4rem;
          height: 4rem;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .shareBtn {
          height: 0.9rem;
          line-height: 0.9rem;
          margin-top: 0.2rem;

          div {
            margin: 0 auto;
            width: 3.5rem;
            border-radius: 0.8rem;
            text-align: center;
            background-color: #fff;
            border: 1px solid #000;
          }
        }
      }
    }
  }
  //领券划算
  .Coupon {
    width: 100%;
    margin-top: 0.5rem;
    font-size: 14px;
    .CouponTop {
      height: 1.4rem;
      background-color: #ffffff;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      span:first-child {
        flex: 1;
        margin-left: 0.8rem;
        line-height: 1.4rem;
      }
      span:nth-child(2n) {
        display: inline-block;
        margin-right: 1rem;
        width: 3.5rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 0.8rem;
      }
    }
    .CouponContent {
      height: 10rem;
      padding: 0.5rem;
      white-space: nowrap;

      overflow: hidden;
      background-color: #f1f1f1;
      .content {
        height: 100%;
      }
      .taoGouItem {
        width: 6rem;
        margin-left: 1rem;
        .taoGouImg {
          width: 5rem;
          height: 5rem;
          margin-bottom: 0.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .titleContent {
          .presentPrice {
            height: 1.5rem;
            line-height: 1.5rem;
            font-size: 10px;
            span {
              font-size: 14px;
            }
          }
        }
        .CouponGetBtn {
          height: 1.2rem;
          .CouponGet {
            margin: 0 auto;
            margin-top: 0.2rem;
            border: 1px solid #ccc;
            width: 5rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            background-color: #fff;
          }
        }
      }
      .taoGouItem:first-child {
        margin-left: 0rem;
      }
    }
  }

  //商品详情
  .prductDetails {
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
    font-size: 16px;
    width: 100%;
    .prductDetailsContent {
      li:last-child {
        margin-bottom: 0rem;
      }
      li {
        padding: 0.2rem;
        margin-bottom: 0.5rem;
        border: 1px solid #eee;
        .leftImg {
          float: left;
          img {
            width: 4rem;
            height: 4rem;
            padding: 0.2rem;
          }
        }
        .rightContent {
          margin-left: 5rem;
          line-height: 1rem;
          font-size: 16px;
          .oldPrice {
            text-decoration: line-through;
            color: red;
          }
          .oldPrice,
          .Price {
            font-size: 14px;
            line-height: 1rem;
          }
        }
      }
    }
  }
  //底部按钮
  .bottomBtn {
    position: fixed;
    background-color: #fff;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem !important;
    .btnMail:nth-child(2) {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 0 1%;
    }
    .btnMail {
      width: 30%;
      height: 2.5rem;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
