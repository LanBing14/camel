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
      <div class="shareMoneyContent">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          class="clearfix"
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
                积分价
                <span class="publiColor">￥{{item.scorePrice}}</span>
              </p>
              <p class="couponKou" style="font-size:12px">
                积分抵
                <span>￥{{item.scoreDeduction}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="circleMy" v-if="isZhuan">
        <mt-spinner type="fading-circle" color="#ff7f01" :size="50"></mt-spinner>
      </div>
    </div>
    <!--  -->
    <!-- 模态框 -->
    <div class="box" @click="hiddleToggle" v-if="isShow"></div>
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
export default {
  data() {
    return {
      list: [],
      loading: true,
      isZhuan: false,
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
    this.$axios.all[(this.getList(), this.bannerList())];
  },
  methods: {
    loadMore() {
      this.loading = true;
      this.isZhuan = true;
      this.page = this.page + 1;
      var that = this;
      setTimeout(function() {
        that.getList();
      }, 1000);
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
          if (res.data.status == "1") {
            var info = res.data.data;
            this.isZhuan = false;
            if (info.length >= 10) {
              this.list = this.list.concat(info);
              this.loading = false;
            } else {
              this.list = this.list.concat(info);
            }
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
  .mint-header.is-fixed {
    z-index: 998;
  }

  .circleMy {
    width: 100%;
    margin: 0 auto;
    padding: 0.2rem 6.5rem;
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
      background-color: #f7efe8;
      border-radius: 0 0 0.4rem 0.4rem;

      span {
        width: 3rem;
        height: 1.2rem;
        line-height: 1.2rem;
        display: inline-block;
        text-align: center;
        border-radius: 0.8rem;
        color: #1f1e1e;
        border: 1px solid #1f1e1e;
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
    // padding-bottom: 2rem;
    font-size: 16px;
    width: 100%;

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
            color: #a7a7a7;
            font-size: 14px;
            margin-top: 0.2rem;
          }
          .oldPrice,
          .Price {
            line-height: 1rem;
          }
          .Price {
            margin-top: 0.5rem;
            font-size: 14px;
          }
        }
      }
      li:nth-child(2n) {
        float: left;
        margin-left: 0.4rem;
      }
    }
  }
}
</style>
