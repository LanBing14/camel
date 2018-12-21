<template>
  <div class="shareDetails">
    <mt-header fixed title="赏金明细">
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <!--邀请-->
    <div class="makeCoupon">
      <div class="makeItem clearfix" v-for="(item,index) in infoArr" :key="index">
        <div class="fl imgBox">
          <img :src="item.goodsImg" alt>
        </div>
        <div class="fl centerBox">
          <p class="one-txt-cut">{{item.goodsName}}</p>
          <p>￥{{item.orderAmount}}</p>
          <p class="iconTxt">分享给用户</p>
          <p class="iconNum">{{item.senderUserName}}</p>
        </div>
        <div class="fr leftBox">
          <p>
            赚
            <span class="publiColor">¥{{item.money}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shareDetails",
  data() {
    return {
      infoArr: []
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getList() {
      this.$axios
        .post("/userCenter/bountyList", {
          phone: localStorage.getItem("phone")
        })
        .then(res => {
          if (res.status == 200) {
            this.infoArr = res.data.data;
            console.log(this.infoArr);
          }
        });
    }
  },
  created() {
    // document.title = "赏金明细";
    this.getList();
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
.shareDetails {
  background: #f0f0f0;
  padding-top: 1.9rem;
  .makeCoupon {
    margin-top: 0.1rem;
    .makeItem {
      padding: 0.3rem;
      background-color: #fff;
      border-bottom: 2px solid #f0f0f0;

      .imgBox {
        padding: 0.2rem;
        margin-top: 0.4rem;
        width: 2.5rem;
        img {
          width: 100%;
        }
      }
      .centerBox {
        width: 55%;
        font-size: 15px;
        margin-left: 0.4rem;
        .one-txt-cut {
          font-size: 16px;
          line-height: 1.2rem;
        }
        .iconTxt {
          font-size: 14px;
          margin-top: 0.3rem;
          color: #999;
        }
        .iconNum {
          font-size: 14px;
          color: #999;
        }
      }
      .leftBox {
        margin-top: 0.2rem;
        line-height: 3.2rem;
        font-size: 15px;
        span {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
