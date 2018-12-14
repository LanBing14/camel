<template>
  <div class="myInfo">
    <mt-header title="我的" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <div class="top">
      <div class="topLeft fl">
        <div class="fl">
          <img :src="img || imgUrl" alt>
        </div>
        <div class="fr infoTitle">
          <p>{{username}}</p>
          <p>{{myphone}}</p>
        </div>
      </div>
      <div class="fr topRight">
        <img src="../assets/imgs/jifen.png" alt>
        <span>{{score}}积分</span>
      </div>
    </div>

    <div class="content">
      <div class="extra clearfix">
        <div class="shangjin">
          <img src="../assets/imgs/money.png" alt>
          <span>我的赏金</span>
          <span>￥{{balance}}</span>
        </div>
        <div class="goTi" @click="goTiXian">去提现</div>
      </div>

      <router-link class="itemCont clearfix" to="/shareDetails">
        <div class="fl">
          <img src="../assets/imgs/mingxi.png" alt>
          <span>赏金明细</span>
        </div>
      </router-link>

      <router-link to="/shareMake" class="itemCont clearfix">
        <div class="fl">
          <img src="../assets/imgs/share.png" alt>
          <span>我分享的人</span>
        </div>
      </router-link>

      <router-link class="itemCont clearfix" to="/myAddress">
        <div class="fl">
          <img src="../assets/imgs/map.png" alt>
          <span>我的收货地址</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myphone: "",
      username: "",
      score: "",
      balance: "",
      parentId: "",
      imgUrl: require("../assets/imgs/users.png"),
      img: ""
    };
  },
  methods: {
    goTiXian() {
      this.$router.push("/getMoney");
    },
    getList() {
      this.$axios
        .post("/userCenter/personCenter", {
          phone: "12345678901"
        })
        .then(res => {
          var info = res.data.data;
          this.phone = info.phone;
          this.img = info.img;
          this.score = info.score;
          //产品积分
          this.username = info.username;
          //产品总价
          this.balance = info.balance;
          //上级id
          this.parentId = info.parentId;
          var reg = /^(\d{3})\d{4}(\d{4})$/;
          this.myphone = this.phone.replace(reg, "$1****$2");
        });
    },
    goback() {
      this.$router.push("/");
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.myInfo {
  padding-top: 1.9rem;
  background: #f0f0f0;
  height: 100%;
  font-size: 16px;

  .top {
    height: 2.58rem;
    font-size: 16px;
    background-color: #fff;
    .topLeft {
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      div {
        width: 1.5rem;

        img {
          width: 1.5rem;
          border-radius: 50%;
        }
      }
      .infoTitle {
        width: 60%;
        margin-left: 0.2rem;
        p:nth-child(2) {
          font-size: 14px;
          color: #ccc;
        }
      }
    }
    .topRight {
      line-height: 2.6rem;
      margin-right: 0.5rem;
      color: #ff7f01;
      font-size: 14px;
      img {
        width: 0.6rem;
      }
    }
  }

  .content {
    .extra {
      line-height: 2.1rem;
      margin-top: 0.4rem;
      padding-left: 0.6rem;
      font-size: 14px;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      color: #000;
      border-bottom: 2px solid #f0f0f0;
      background-color: #fff;
      .shangjin {
        width: 75%;
      }
      div {
        img {
          width: 0.8rem;
        }
        span:nth-child(2) {
          margin-left: 0.2rem;
        }
        span:nth-child(3) {
          margin-left: 0.2rem;
          color: #ccc;
        }
      }
      .goTi {
        border: 1px solid #ff7f01;
        width: 2.6rem;
        text-align: center;
        border-radius: 0.8rem;
        color: #ff7f01;
        height: 1.3rem;
        line-height: 1.3rem;
        margin-top: 0.4rem;
      }
    }
    .itemCont {
      line-height: 2.1rem;
      padding-left: 0.6rem;
      font-size: 14px;
      display: block;
      color: #000;
      border-bottom: 2px solid #f0f0f0;
      background-color: #fff;
      div {
        img {
          width: 0.8rem;
        }
        span:nth-child(2) {
          margin-left: 0.2rem;
        }
        span:nth-child(3) {
          margin-left: 0.2rem;
          color: #ccc;
        }
      }
    }
  }
}
</style>
