<template>
  <div class="productMails">
    <div class="top">
      <mt-header title="商城">
        <mt-button icon="back" size="small" slot="left"></mt-button>
      </mt-header>
      <div class="userTou">
        <img src="../assets/imgs/user.png" alt>
      </div>
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
      <div class="shareMoneyTop publiColor">
        <span>分享赚赏金</span>
      </div>
      <!-- 分享内容 -->
      <div class="shareMoneyContent clearfix">
        <ul class="clearfix" :style="{width: widthStyle + 'rem'}">
          <li class="shareMoneyItem fl" ref="contentLiStyle" @click="clickMe">
            <div class="shareImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="one-txt-cut">商品标题商品标题商品标题商品标题</p>

            <p class="publiColor">￥99.00</p>
            <div class="shareBtn">
              <div>去分享</div>
            </div>
          </li>
          <li class="shareMoneyItem fl" ref="contentLiStyle" @click="clickMe">
            <div class="shareImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="one-txt-cut">商品标题商品标题商品标题商品标题</p>

            <p class="publiColor">￥99.00</p>
            <div class="shareBtn">
              <div>去分享</div>
            </div>
          </li>
          <li class="shareMoneyItem fl" ref="contentLiStyle" @click="clickMe">
            <div class="shareImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="one-txt-cut">商品标题商品标题商品标题商品标题</p>

            <p class="publiColor">￥99.00</p>
            <div class="shareBtn">
              <div>去分享</div>
            </div>
          </li>
          <li class="shareMoneyItem fl" ref="contentLiStyle" @click="clickMe">
            <div class="shareImg">
              <img src="../assets/imgs/3.png" alt>
            </div>
            <p class="one-txt-cut">商品标题商品标题商品标题商品标题</p>

            <p class="publiColor">￥99.00</p>
            <div class="shareBtn">
              <div>去分享</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 中间图片
    -->
    <div class="middlePic">
      <img src="../assets/imgs/3.png" alt>
    </div>
    <!-- 商品详情 -->
    <div class="prductDetails">
      <div class="shareMoneyTop publiColor">
        <span>分享赚赏金</span>
      </div>
      <div>
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
                <span>1222</span>
                人购买
              </p>
              <p class="Price clearfix">
                <span class="fl">券后价</span>
                <span class="fl">￥110</span>
                <span class="fr divbtn">去领券</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <p v-if="loadingDom" class="loading">没有更多数据</p>
    </div>

    <!-- 底部按钮 -->
    <!-- <div class="bottomBtn">
      <span class="fl btnMail">我的</span>
      <span class="fl btnMail">你的</span>
      <span class="fl btnMail">他的</span>
    </div>-->
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

    let scroll1 = new BScroll(".shareMoneyContent", {
      scrollX: true,
      click: true
    });
    // let scroll = new BScroll(".CouponContent", {
    //   scrollX: true,
    //   click: true
    // });

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
  // height: 100%;
  background: #f1f1f1;
  position: relative;
  .publiColor {
    color: #ff7f01;
  }
  //头部
  .top {
    .mint-header {
      background-color: #fff;
      color: #ff7f01;
      font-size: 18px;
    }
  }
  .userTou {
    position: absolute;
    top: 0;
    right: 0.3rem;
    img {
      width: 1.2rem;
      height: 1.2rem;
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
    height: 8.3rem;
    padding: 0.9rem 0.1rem 0.4rem 0.1rem;
    box-sizing: border-box;
    font-size: 16px;
    margin-top: 0.5rem;
    background-color: #fff;

    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .commonMall {
      width: 48%;
      padding: 0.1rem 0.1rem 0.1rem 0rem;
      .title {
        margin-bottom: 0.5rem;
        color: #ff7f01;
        text-align: center;
      }
      .hotMall {
        text-align: center;
        .leftMallItem:nth-child(2n) {
          margin-left: 0.3rem;
        }
        .leftMallItem {
          width: 46%;
          .img {
            width: 3.24rem;
            height: 3.24rem;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .PresentPrice {
            font-size: 14px;
            margin-top: 0.2rem;
            color: #ff7f01;
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
    .taoBaoCity {
      padding-left: 0.3rem;
    }
  }

  // 分享转赏金
  .shareMoney {
    margin-top: 0.5rem;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 0.9rem 0rem 0.4rem 0rem;
    font-size: 14px;
    .shareMoneyTop {
      height: 1.4rem;
      font-size: 16px;
      text-align: center;
      padding: 0.1rem 0.1rem 0.1rem 0rem;
    }
    .shareMoneyContent {
      width: 100%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      margin-top: 0.3rem;

      .shareMoneyItem {
        width: 4.5rem;
        padding: 0.2rem;
        background-color: #fff;
        p {
          line-height: 0.8rem;
        }
        .shareImg {
          width: 3.6rem;
          height: 4.32rem;
          margin: 0 auto;
          margin-bottom: 0.2rem;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .shareBtn {
          height: 1rem;
          line-height: 1rem;
          margin-top: 0.2rem;

          div {
            margin: 0 auto;
            width: 2.6rem;
            border-radius: 25px;
            font-size: 14px;
            color: #ff7f01;
            text-align: center;
            background-color: #fff;
            border: 1px solid #eeeeee;
          }
        }
      }
    }
  }
  .middlePic {
    width: 100%;
    height: 3.6rem;
    margin-top: 0.5rem;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    img {
      width: 100%;
      height: 3.6rem;
    }
  }
  //商品详情
  .prductDetails {
    margin-bottom: 2.5rem;
    margin-top: 0.5rem;
    font-size: 16px;
    width: 100%;
    background-color: #fff;
    .shareMoneyTop {
      height: 1.4rem;
      font-size: 16px;
      text-align: center;
      padding: 0.8rem 0.1rem 0.1rem 0rem;
    }
    .prductDetailsContent {
      li:last-child {
        margin-bottom: 0rem;
      }
      li:first-child {
        border-top: none;
      }
      li {
        padding: 0.2rem;
        margin-bottom: 0.5rem;
        border: 1px solid #eee;
        p {
          font-size: 15px;
        }
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
            color: #ccc;
            margin-top: 0.2rem;
          }
          .oldPrice,
          .Price {
            font-size: 14px;
            line-height: 1rem;
            .divbtn {
              height: 1rem;
              line-height: 1rem;
              width: 2.6rem;
              border-radius: 25px;
              font-size: 14px;
              color: #ff7f01;
              text-align: center;
              background-color: #fff;
              border: 1px solid #eeeeee;
            }
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
