<template>
  <div class="productMails">
    <div class="top">
      <mt-header title="商城" style="height:1.8rem" fixed></mt-header>
      <router-link class="userTou" to="/myInfo">
        <img src="../assets/imgs/user.png" alt>
      </router-link>
    </div>
    <!-- 轮播图 -->
    <div class="swipeImg">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item,index) in bannerArr" :key="index">
          <img :src="item.img" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 中间图片
    -->
    <router-link to="/exchangeGift" class="middlePic">
      <img :src="bannerimg" alt>
    </router-link>

    <!-- 商品详情 -->
    <div class="infoPic">
      <div class="shareMoneyTop publiColor">
        <img src="../assets/imgs/hotpic.png" alt>
      </div>
    </div>
    <div class="prductDetails">
      <div class="shareMoneyContent clearfix" ref="shareMoneyContent">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          class="prductDetailsContent"
        >
          <li
            class="clearfix"
            v-for="(item,index) in list"
            @click="clickItem(item.id)"
            :key="index"
          >
            <div class="topImg">
              <img :src="item.img" alt>
              <p class="couponZhuan">
                分享赚
                <span>￥{{item.sharePrice}}</span>
              </p>
            </div>
            <div class="Content">
              <p class="one-txt-cut">{{item.title}}</p>
              <p class="oldPrice">原价￥{{item.sellPrice}}</p>
              <p class="Price clearfix">
                <span class="fl">积分价</span>
                <span class="fl publiColor">￥{{item.scorePrice}}</span>
              </p>
              <p class="couponKou" style="font-size:12px">
                积分抵
                <span>￥{{item.scoreDeduction}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <p class="loading">没有更多数据了</p>
    </div>

    <!-- 模态框 -->
    <div class="box" v-if="isShow" @click="hiddleToggle"></div>
    <div class="boxModel" v-if="showLing">
      <div class="boxtitle">
        <p style="fontSize:16px">领取礼品提醒</p>
        <p>恭喜您成为骆驼管家VIP用户，可免费领取升级大礼包一份~！</p>
      </div>
      <div class="btn">
        <span>暂不领取</span>
        <span>立即领取</span>
      </div>
    </div>
    <div class="boxModel" v-if="showWeiLing">
      <div class="btn">
        <span>暂不领取</span>
        <span>立即领取</span>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      list: [],
      loading: false,
      isShow: false,
      showWeiLing: false,
      showLing: false,
      page: 1,
      bannerArr: [],
      bannerimg: ""
    };
  },
  created() {
    document.title = "商城";
    this.getList();
    this.bannerList();
  },
  methods: {
    loadMore() {
      this.page = this.page + 1;
      this.getList();
    },

    hiddleToggle() {
      this.isShow = false;
      this.showLing = false;
      this.showWeiLing = false;
    },
    // 获取首页信息
    getList() {
      this.$axios
        .post("/index/productList", {
          cate: 0,
          page: this.page
        })
        .then(res => {
          var info = res.data.data;
          if (res.data.status == "1") {
            this.list = this.list.concat(info);
          }
        });
    },
    // 获取轮播图信息
    bannerList() {
      this.$axios.get("/index/bannerList").then(res => {
        this.bannerArr = res.data.data.bannerList;
        this.bannerimg = res.data.data.centerBanner.img;
      });
    },
    clickItem(index) {
      this.$router.push({ path: "/particular", query: { id: index } });
    }
  },

  mounted() {}
};
</script>
<style lang="scss" scoped>
.productMails {
  background: #f0f0f0;
  position: relative;
  padding-top: 1.8rem;
  padding-bottom: 1rem;
  .mint-header.is-fixed {
    z-index: 998;
  }
  /deep/ .mint-swipe-indicator.is-active {
    background: #ff7f01;
    opacity: 0.8;
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
  .boxModel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("../assets/imgs/bg.jpg") no-repeat;
    background-size: contain;
    width: 80%;
    z-index: 999;
    height: 10rem;
    font-size: 14px;
    text-align: center;
    border-radius: 0.4rem;
    .boxtitle {
      position: absolute;
      bottom: 30%;
      p:first-child {
        margin-bottom: 0.2rem;
      }
    }
    .btn {
      position: absolute;
      width: 100%;
      bottom: -3%;
      left: 0;
      padding-top: 1rem;
      height: 2rem;
      font-size: 14px;
      background-color: #eee;
      border-radius: 0 0 0.4rem 0.4rem;
      span {
        width: 3rem;
        height: 1.2rem;
        line-height: 1.2rem;
        display: inline-block;
        text-align: center;
        border-radius: 0.8rem;
        border: 1px solid #000;
      }
      span:nth-child(2n) {
        margin-left: 1rem;
        border: 1px solid #ff7f01;
        color: #ff7f01;
      }
    }
  }
  .publiColor {
    color: #ff7f01;
  }
  .loading {
    text-align: center;
    line-height: 2rem;
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
    position: fixed;
    top: 0.15rem;
    right: 0.3rem;
    z-index: 999;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  // 轮播图
  .swipeImg {
    width: 100%;
    height: 8rem;
    img {
      width: 100%;
      height: 100%;
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

  .middlePic {
    width: 100%;
    height: 5.46rem;
    display: block;
    margin-top: 0.1rem;
    img {
      width: 100%;
      height: 5.46rem;
    }
  }
  //商品详情
  .infoPic {
    .shareMoneyTop {
      height: 1.4rem;
      font-size: 16px;
      text-align: center;
      padding: 0.8rem 0.1rem 0.1rem 0rem;
      img {
        width: 5rem;
      }
    }
  }
  .prductDetails {
    padding: 0.2rem 0.1rem 0.2rem 0.1rem;
    font-size: 16px;
    width: 100%;
    // min-height: 20rem;
    // overflow: hidden;
    ul {
      li {
        width: 45%;
        float: left;
        padding: 0.2rem;
        margin-bottom: 0.5rem;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 0.4rem;
        p {
          font-size: 15px;
          line-height: 1rem;
        }
        .topImg {
          height: 6.9rem;
          margin: 0.2rem auto;
          text-align: center;
          position: relative;
          img {
            width: 4rem;
            height: 100%;
          }
          .couponZhuan {
            width: 3.14rem;
            border: 1px solid #ff7f01;
            border-left: none;
            font-size: 10px;
            border-radius: 0 0.8rem 0.8rem 0;
            background-color: #fff;
            color: #ff7f01;
            position: absolute;
            left: -0.2rem;
            top: 1rem;
          }
        }

        .Content {
          position: relative;
          margin-top: 0.5rem;
          .couponKou {
            width: 2.74rem;
            border: 1px solid #ff7f01;
            border-right: none;
            font-size: 10px !important;
            border-radius: 0.8rem 0 0 0.8rem;
            padding-left: 0.4rem;
            background-color: #fff;
            color: #ff7f01;
            position: absolute;
            right: -0.2rem;
            bottom: 1.4rem;
          }

          .oldPrice {
            color: #ccc;
            margin-top: 0.2rem;
          }
          .oldPrice,
          .Price {
            font-size: 14px;
            line-height: 1rem;
            span:nth-child(2) {
              font-size: 16px;
            }
          }
          .Price {
            margin-top: 0.5rem;
          }
        }
      }
      li:nth-child(2n) {
        float: left;
        margin-left: 0.3rem;
      }
    }
  }
}
</style>
