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
              <p class="oldPriceLing">vip可领</p>
              <p class="Price clearfix">
                <span
                  class="fl oldPrice"
                  style="text-decoration:line-through"
                >原价 ￥{{item.sellPrice}}</span>
                <span
                  class="fr divbtn"
                  v-if="item.status_text == '免费领取'"
                  @click="goGet(item.id)"
                >免费领取</span>
                <span class="fr divbtn oldPrice bg" v-else @click="hasGet">已领取</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFree: false,
      list: []
    };
  },
  methods: {
    goGet(index) {
      this.getListLing(index);
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
    getListLing(index) {
      this.$axios
        .post("/index/receiveGoods", {
          phone: "12345678901",
          goodsId: index
        })
        .then(res => {
          if (res.status == 200) {
            this.$toast({
              message: "领取成功",
              duration: 1500
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

