<template>
  <div class="exchangeGift">
    <mt-header title="礼品兑换" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <!-- 商品详情 -->
    <div class="prductDetails">
      <div>
        <ul class="prductDetailsContent clearfix">
          <li class="clearfix" v-for="(item,index) in list" :key="index">
            <div class="leftImg">
              <img :src="item.img" alt>
            </div>
            <div class="rightContent">
              <p class="txt-cut">{{item.title}}</p>
              <p class="oldPriceLing">{{item.vip_text}}可领</p>
              <p class="Price clearfix">
                <span
                  class="fl oldPrice"
                  style="text-decoration:line-through"
                >原价 ￥{{item.sellPrice}}</span>
                <span
                  class="fr divbtn"
                  v-if="item.status_text == '免费领取'"
                  @click="goConfirm(item)"
                >免费领取</span>
                <span class="fr divbtn oldPrice bg" v-else @click="hasGet">已领取</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="box" v-if="isShow"></div>
    <div class="boxModel" v-if="isShow" @click="hiddleToggle">
      <div class="boxtitle">
        <p style="fontSize:16px">领取礼品提醒</p>
        <p>您的当前为vip，需要升级为创客，可免费领取此商品</p>
      </div>
      <div class="btn">
        <span @click="BtnClose">我已了解</span>
        <span>立即升级</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFree: false,
      isShow: false,
      list: []
    };
  },
  methods: {
    hiddleToggle() {
      this.isShow = false;
    },
    BtnClose() {
      this.isShow = false;
    },
    //商品确定
    goConfirm(item) {
      this.getListLing(item);
    },
    getList() {
      this.$axios
        .post("/index/freeGoods", {
          phone: "12345678901"
        })
        .then(res => {
          if (res.status == 200) {
            this.list = res.data.data;
            console.log(this.list);
          }
        });
    },
    hasGet() {
      this.$toast({
        message: "您已领取成功,不能重复领取哦",
        duration: 1500
      });
    },
    getListLing(item) {
      this.$axios
        .post("/index/receiveGoods", {
          phone: localStorage.getItem("phone"),
          goodsId: item.id
        })
        .then(res => {
          if (res.status == 200) {
            this.$toast({
              message: "领取成功",
              duration: 1500
            });
            this.$router.push({
              path: "/payConfirm",
              query: {
                packageId: 0,
                goodsId: item.id,
                number: 1,
                value: item.value,
                name: item.name
              }
            });
            this.getList();
          }
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    // document.tltle = "礼品兑换";
    this.getList();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.exchangeGift {
  background-color: #f0f0f0;
  padding-top: 1.9rem; //商品详情
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
    background: url("../assets/imgs/bg.png") no-repeat;
    background-size: contain;
    width: 78%;
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
      bottom: 0%;
      left: 0;
      height: 2rem;
      font-size: 14px;
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
  .prductDetails {
    font-size: 16px;
    width: 100%;

    .prductDetailsContent {
      li:last-child {
        margin-bottom: 0rem;
      }

      li {
        padding: 0.3rem 0.2rem;
        background-color: #fff;
        border: 1px solid #eee;
        position: relative;
        .bg {
          color: #999 !important;
        }
        p {
          font-size: 16px;
        }
        .leftImg {
          float: left;
          img {
            width: 3.32rem;
            height: 3.32rem;
            padding: 0.4rem 0.2rem;
          }
        }
        .rightContent {
          width: 70%;
          margin-left: 4rem;
          line-height: 1rem;
          padding-top: 0.3rem;
          font-size: 16px;
          .oldPriceLing {
            color: #999;
            line-height: 0.9rem;
            font-size: 14px;
          }

          .Price {
            font-size: 15px;
            color: #a7a7a7;
            padding-top: 1rem;
            .oldPrice {
              color: #999;
              line-height: 1.3rem;
              line-height: 0.8rem;
            }

            .divbtn {
              position: absolute;
              bottom: 0.5rem;
              right: 0.5rem;
              height: 1.2rem;
              line-height: 1.2rem;
              width: 3.2rem;
              border-radius: 25px;
              font-size: 14px;
              color: #ff7f01;
              text-align: center;
              margin-right: 0.5rem;
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

