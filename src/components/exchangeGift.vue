<template>
  <div class="exchangeGift">
    <mt-header title="礼品兑换" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <!-- 商品详情 -->
    <div class="prductDetails">
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
              <p class="oldPrice">vip可领</p>
              <p class="Price clearfix">
                <span class="fl oldPrice" style="text-decoration:line-through">原价 ￥110</span>
                <span class="fr divbtn">免费领取</span>
                <span class="fr divbtn oldPrice">已领取</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <p v-if="loadingDom" class="loading">没有更多数据</p>
    </div>
  </div>
</template>
<script>
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
    goback() {
      this.$router.go(-1);
    },
    loadMore() {
      this.list = 5;
      for (var i = 0; i <= 5; i++) {
        this.list += 5;
      }
    }
  },
  created() {
    // document.tltle = "礼品兑换";
  },
  mounted() {
    let scroll1 = new BScroll(".prductDetails", {
      scrollX: true,
      click: true
    });
  }
};
</script>

<style lang="scss" scoped>
.exchangeGift {
  background-color: #f0f0f0;
  padding-top: 1.9rem; //商品详情
  .prductDetails {
    font-size: 16px;
    width: 100%;

    .prductDetailsContent {
      li:last-child {
        margin-bottom: 0rem;
      }

      li {
        padding: 0.2rem;
        background-color: #fff;
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
            color: #ccc !important;
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
}
</style>

