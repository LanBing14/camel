<template>
  <div class="coupon">
    <mt-header title="优惠券" style="height:1.8rem" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="navBar">
      <mt-navbar v-model="selected ">
        <mt-tab-item id="1">超值优惠券</mt-tab-item>
        <mt-tab-item id="2">女装</mt-tab-item>
        <mt-tab-item id="3">男装</mt-tab-item>
        <mt-tab-item id="4">玩具</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="clearfix contain">
            <mt-navbar v-model="selectedTwo" class="mintNav">
              <mt-tab-item id="5" class="side">大衣</mt-tab-item>
              <mt-tab-item id="6" class="side">裤子</mt-tab-item>
              <mt-tab-item id="7" class="side">毛衣</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selectedTwo">
              <mt-tab-container-item id="5">
                <div class="left">
                  <div class="leftItem clearfix">
                    <div class="leftImg fl">
                      <img src="../assets/imgs/3.png" alt>
                    </div>
                    <div class="rightContainers">
                      <p class="one-txt-cut title">标题标题标题标题标题标题标题标题</p>
                      <p class="coupMoney">
                        <span class="price">￥88</span>
                        <span class="couponQuan">￥888优惠券</span>
                      </p>
                    </div>
                  </div>
                </div>
              </mt-tab-container-item>
              <mt-tab-container-item id="6">
                <div class="left">
                  <div class="leftItem clearfix">
                    <div class="leftImg fl">
                      <img src="../assets/imgs/3.png" alt>
                    </div>
                    <div class="rightContainers">
                      <p class="one-txt-cut title">标题标题标题标题标题标题标题标题</p>
                      <p class="coupMoney">
                        <span class="price">￥88</span>
                        <span class="couponQuan">￥888优惠券</span>
                      </p>
                    </div>
                  </div>
                </div>
              </mt-tab-container-item>
              <mt-tab-container-item id="7">
                <div class="left">
                  <div class="leftItem clearfix">
                    <div class="leftImg fl">
                      <img src="../assets/imgs/3.png" alt>
                    </div>
                    <div class="rightContainers">
                      <p class="one-txt-cut title">标题标题标题标题标题标题标题标题</p>
                      <p class="coupMoney">
                        <span class="price">￥88</span>
                        <span class="couponQuan">￥888优惠券</span>
                      </p>
                    </div>
                  </div>
                </div>
              </mt-tab-container-item>
            </mt-tab-container>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">2</mt-tab-container-item>
        <mt-tab-container-item id="3">3</mt-tab-container-item>
        <mt-tab-container-item id="4">4</mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import { Navbar, TabItem } from "mint-ui";

export default {
  data() {
    return {
      selected: "1",
      selectedTwo: "5"
    };
  },
  methods: {
    goBack() {}
  }
};
</script>
<style lang="scss" scoped>
.coupon {
  height: 100%;
  background-color: #f0f0f0;
  padding-top: 1.8rem;
  .navBar {
    margin-top: 0.2rem;
    .mint-navbar .mint-tab-item {
      border-right: none;
      color: #000;
    }
    .mint-navbar .mint-tab-item.is-selected {
      margin-bottom: -1px;
      background-color: #ff7f01;
      border-bottom: 3px solid #ff7f01;
      color: #fff;
    }
  }
  .contain {
    margin-top: 0.3rem;
    .mint-navbar.mintNav {
      width: 3.5rem;
      display: block;
      float: left;
      .mint-tab-item.side {
        width: 100% !important;
      }
    }
    .left {
      font-size: 14px;
      margin-left: 0.2rem;
      position: relative;
      .leftItem {
        width: 12rem;
        height: 3.5rem;
        border: 1px solid #ccc;
        margin-bottom: 0.4rem;
        padding: 0.5rem 0 0.2rem 0.3rem;
        .leftImg {
          width: 3rem;
          img {
            width: 100%;
          }
        }
        .rightContainers {
          .title {
            margin-bottom: 1.2rem;
          }
          .coupMoney {
            .couponQuan {
              background-color: #ff7f01;
              color: #fff;
              width: 35%;
              position: absolute;
              text-align: center;
              right: 0;
              bottom: 0.2rem;
              font-size: 12px;
              height: 1.4rem;
              line-height: 1.4rem;
              border-radius: 0.8rem 0 0 0.8rem;
            }
          }
        }
      }
    }
  }
}
</style>
