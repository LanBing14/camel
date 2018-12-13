<template>
  <div class="payConfirm">
    <mt-header title="订单确认" style="height:1.8rem" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>

    <!-- /*收货人信息*/ -->
    <div class="Consignee" @click="xuanModel" v-if="!remaind">
      <img src="../assets/imgs/map.png" class="sign">
      <div class="messages">
        <p class="name">
          <span>{{myreceiver}}</span>
          <span class="phone">{{myphone}}</span>
        </p>
        <p class="address">{{myprovince}}{{mycity}}{{mycounty}}{{mydetail}}</p>
      </div>
      <img src="../assets/imgs/right.png" alt class="right">
    </div>
    <div class="Consignee" @click="xuanModel" v-if="remaind">
      <img src="../assets/imgs/jingao.png" class="jingao">
      <div class="messages publiColor">亲,您还没收货地址,请点击这里选择您的收货地址</div>
      <img src="../assets/imgs/right.png" alt class="right">
    </div>
    <!--提示-->
    <div class="hintBox">
      <img src="../assets/imgs/jingao.png" alt class="jingao">
      <p class="hint">由于鸡蛋的配送的特殊性，部分地区暂时不能购买
        <br>
        <span>新疆、西藏、青海、海南、港澳地区</span>
      </p>
    </div>

    <!--商品信息-->
    <div class="productInfo">
      <img src="../assets/imgs/swiper.png" alt class="goodPic">
      <div class="line1">
        <p class="name txt-cut">{{title}}</p>
        <p class="money">￥{{sellPrice}}</p>
      </div>
      <div class="line2">
        <p class="guige">30枚/{{dateTime}}个月</p>
        <p class="num">x{{number}}</p>
      </div>
    </div>

    <!--商品其他-->
    <div class="others">
      <div class="total">
        <p class="left">商品合计</p>
        <p class="right">￥{{price}}</p>
      </div>
      <div class="total">
        <p class="left">运费</p>
        <p class="right">￥{{freight}}</p>
      </div>
      <div class="total">
        <p class="left">
          {{userScore}}分积分抵扣
          <span>￥{{userScorePrice}}</span>
        </p>
        <div class="moren" @click="toggle">
          <img src="../assets/imgs/gouxuan.png" alt v-show="isXuan">
        </div>
      </div>
      <div class="total">
        <p class="left">买家留言</p>
        <input type="text" class="infos" placeholder="请留言" v-model="remark">
      </div>
    </div>

    <!--支付-->
    <div class="payInfo">
      <div class="need">
        需付金额
        <span>￥{{price}}</span>
      </div>
      <mt-button class="pay" style="height:60px;border-radius:0" type="danger" @click="gopay">去支付</mt-button>
    </div>

    <!-- 模态框 -->
    <!--蒙版-->
    <div class="box" id="box" v-if="isShow " @click="hiddle"></div>
    <div class="choice-style" v-if="isShow">
      <div class="modelContent">
        <div
          class="Consignee"
          v-for="(item,index) in myaddress"
          :key="index"
          @click="toggleCurrent(item)"
        >
          <div class="messages">
            <p class="name">
              {{item.receiver}}
              <span class="phone">{{item.phone}}</span>
            </p>
            <p class="address">{{item.province}}{{item.city}}{{item.county}}{{item.detail}}</p>
            <p class="Moaddress" v-if="item.isDefault == 1">默认地址</p>
          </div>
          <p class="yixuan" v-if="item.id == isKey">已选</p>
          <img src="../assets/imgs/right.png" alt class="right">
        </div>
        <p class="none">没有更多了</p>
        <div class="bottomXiu clearfix">
          <span class="fl" @click="cancel">取消</span>
          <span class="fr" @click="addBtn">新增地址</span>
        </div>
      </div>
    </div>
    <payWay :zhiObj="zhiObj" ref="child"></payWay>
  </div>
</template>
<script>
import { Picker, Popup, Toast } from "mint-ui";
import payWay from "./public/payWay";

export default {
  data() {
    return {
      myprovince: "",
      remaind: false,
      isKey: -1,
      mycity: "",
      myreceiver: "",
      mycounty: "",
      mydetail: "",
      myphone: "",
      isXuan: false,
      isShowPic: false,
      isShow: false,
      itemShow: false,
      remark: "",
      receiver: "",
      phone: "",
      province: "",
      city: "",
      county: "",
      totalPrice: "",
      freight: "",
      detail: "",
      title: "",
      sellPrice: "",
      totalPrice: "",
      userScore: "",
      freight: "",
      userScorePrice: "",
      userAddress: [],
      number: "",
      dateTime: "",
      num: "",
      zhiObj: {},
      orderId: "",
      orderSn: "",
      price: "",
      myaddress: [],
      morenArr: [],
      myId: 0
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggleCurrent(item) {
      this.isKey = item.id;
      this.myprovince = item.province;
      this.myCity = item.city;
      this.myreceiver = item.receiver;
      this.mycounty = item.county;
      this.mydetail = item.detail;
      this.myphone = item.phone;
      this.myId = item.id;
      this.isShow = false;
      this.getList();
    },
    cancel() {
      this.isShow = false;
    },
    gopay() {
      //生成订单
      if (
        this.myreceiver == "" ||
        this.myCity == "" ||
        this.mycounty == "" ||
        this.mydetail == "" ||
        this.myphone == "" ||
        this.myprovince == ""
      ) {
        Toast({
          message: "请去选择您的收货地址",
          duration: 1500
        });
        return false;
      }
      //生成订单
      this.getPayist();
    },
    //生成订单
    getPayist() {
      this.$refs.child.payMoneyModel = true;
      if (this.isXuan) {
        this.score = this.userScore;
      } else {
        this.score = 0;
      }
      this.$axios({
        method: "post",
        url: "/order/buy",
        params: {
          goodsId: this.$route.query.goodsId,
          number: this.$route.query.number,
          packageId: this.$route.query.packageId,
          //地址
          aid: this.myId,
          phone: "12345678901",
          totalPrice: this.price,
          remark: this.remark,
          score: this.score
        }
      }).then(res => {
        if (res.status == 200) {
          this.orderId = res.data.data.orderId;
          this.orderSn = res.data.data.orderSn;
          this.zhiObj.orderSn = this.orderSn;
          this.zhiObj.totalPrice = this.price;
        }
      });
    },
    //获取地址信息
    getAddress() {
      this.$axios
        .post("/userCenter/userAddressList", {
          phone: "12345678901"
        })
        .then(res => {
          if (res.data.status == 1) {
            this.myaddress = res.data.data;
            if (this.myaddress.length == 0) {
              this.remaind = true;
              return false;
            }
            var morenArr = [];
            this.myaddress.forEach(function(v) {
              if (v.isDefault == 1) {
                morenArr.push(v);
              } else {
                morenArr.push(v);
              }
            });
            this.myprovince = morenArr[0].province;
            this.myCity = morenArr[0].city;
            this.myreceiver = morenArr[0].receiver;
            this.mycounty = morenArr[0].county;
            this.mydetail = morenArr[0].detail;
            this.myphone = morenArr[0].phone;
            this.myId = morenArr[0].id;
            this.toggleCurrent(morenArr[0]);
          }
        });
    },
    toggle() {
      this.isXuan = !this.isXuan;
      if (this.isXuan) {
        this.price = Number(this.total - this.userScorePrice);
      } else {
        this.price = this.total;
      }
    },
    xuanModel() {
      this.isShow = true;
    },
    getType(index) {
      if (index == 1) {
        this.isShowPic = true;
      } else if (index == 2) {
        this.isShowPic = false;
      }
    },
    //订单信息
    getList() {
      this.$axios({
        method: "post",
        url: "/order/preorder",
        params: {
          goodsId: this.$route.query.goodsId,
          number: this.$route.query.number,
          packageId: this.$route.query.packageId,
          aid: this.myId,
          phone: "12345678901"
        }
      }).then(res => {
        if (res.data.data.status == 1) {
          var info = res.data.data;
          this.title = info.title;
          this.sellPrice = info.sellPrice;
          //产品积分
          this.score = info.score;
          //产品总价
          this.totalPrice = info.totalPrice;
          this.total = info.totalPrice;
          this.price = info.totalPrice;
          //用户可用积分
          this.userScore = info.userScore;
          this.userScorePrice = info.userScorePrice;
          this.freight = info.freight;
          //用户地址
          this.userAddress = info.userAddress;
          this.num = info.packageInfo[0].number;
          this.dateTime = info.packageInfo[0].dateTime;
        }
      });
    },
    addBtn() {
      this.$router.push("/creatAddress");
    },
    hiddle() {
      this.isShow = false;
    }
  },
  created() {
    document.title = "订单确定";
    this.number = this.$route.query.number;
    // 获取地址信息
    this.getAddress();
    //获取订单信息
    this.getList();
  },
  mounted() {},
  components: {
    payWay
  }
};
</script>
<style lang="scss" scoped>
.payConfirm {
  height: 100%;
  background: #f1f1f1;
  padding-top: 2rem;
  .payWay {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    .zhifuWay {
      padding-left: 1rem;
      line-height: 1.5rem;
      color: #999;
      border-bottom: 1px solid #f1f1f1;

      font-size: 14px;
    }
    .itemWay {
      padding: 0.4rem 0.6rem;
      border-bottom: 1px solid #f1f1f1;
      img {
        width: 0.8rem;
      }
      .zhifu {
        margin-left: 0.5rem;
      }
      .choose {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-right: 0.2rem;
        border: 1px solid #ccc;
        position: relative;
        img {
          width: 0.9rem;
          height: 0.9rem;
          position: absolute;
          left: -1px;
          top: -1px;
        }
      }
    }

    .zhifuAtOnce {
      width: 100%;
      background-color: #ff7f01;
      line-height: 2rem;
      text-align: center;
      font-size: 16px;
      color: #fff;
    }
  }
  /*收货人信息*/
  .Consignee {
    display: flex;
    align-items: center;
    background-color: #fff;
    font-size: 16px;
    padding: 0.6rem 0.5rem;
    margin-bottom: 0.2rem;
    .jingao {
      width: 0.8rem;
    }
    .sign {
      width: 0.8rem;
    }
    .right {
      width: 0.8rem;
    }
    .messages {
      width: 82%;
      padding-left: 0.8rem;
      .name {
        .phone {
          margin-left: 0.2rem;
        }
      }
      .address {
        width: 90%;
        margin-top: 0.2rem;
        line-height: 0.8rem;
        font-size: 14px;
        color: #c1c5c8;
        overflow: hidden;
      }
    }
  }
  .choice-style {
    .modelContent {
      position: fixed;
      background: #f1f1f1;
      width: 100%;
      bottom: 0;
      max-height: 15.46rem;
      overflow: hidden;
      font-size: 16px;
      z-index: 999;
      overflow-y: auto;
      overflow-x: hidden;
      .none {
        text-align: center;
        font-size: 14px;
        line-height: 2rem;
        color: #c1c5c8;
      }
      .Consignee {
        display: flex;
        align-items: center;
        background-color: #fff;
        font-size: 16px;
        height: 3.2rem;
        padding: 0.3rem 0.5rem 0rem 0.2rem;
        border-bottom: none;
        .yixuan {
          font-size: 12px;
          width: 2rem;
          color: #ff7f01;
          margin-right: -2rem;
        }
        .right {
          margin-left: 1rem;
        }
        .messages {
          width: 82%;
          padding-left: 0.8rem;
          .name {
            .phone {
              margin-left: 1rem;
            }
          }
          .Moaddress {
            font-size: 12px;
            color: #ff7f01;
            line-height: 1rem;
          }
          .address {
            width: 90%;
            margin-top: 0.2rem;
            line-height: 0.6rem;
            font-size: 14px;
            color: #c1c5c8;
            overflow: hidden;
          }
        }
      }

      .bottomXiu {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        margin-top: 1.5rem;
        font-size: 16px;
        margin-bottom: 0.5rem;
        span {
          width: 35%;
          line-height: 1.5rem;
          color: #fff;
          border-radius: 0.8rem;
        }
        span:first-child {
          border: 1px solid #999;
          background-color: #999;
        }
        span:last-child {
          border: 1px solid #ff7f01;
          background-color: #ff7f01;
        }
      }
    }
  }
  /*提示*/
  .hintBox {
    background: #ffffff;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 0.6rem 0.5rem;
    .jingao {
      width: 0.8rem;
      height: 0.8rem;
    }
    .hint {
      width: 80%;
      margin-left: 1rem;
      span {
        color: #ff7f01;
      }
    }
  }
  /*商品信息*/
  .productInfo {
    background: #ffffff;
    width: 100%;
    margin-top: 0.5rem;
    font-size: 16px;
    padding: 0.2rem 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .goodPic {
      width: 3rem;
      margin: 0.5rem;
    }
    .line1 {
      width: 70%;
      margin-top: -1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .name {
        width: 6rem;
        font-size: 16px;
        margin-right: 0.5rem;
      }
      .money {
        position: relative;
        width: 33%;
        font-size: 16px;
        text-align: right;
        overflow: hidden;
      }
    }
    .line2 {
      margin-top: -1rem;
      width: 68%;
      margin-left: 4rem;
      display: flex;
      align-items: left;
      font-size: 14px;
      justify-content: left;
      color: #c1c5c8;
      .guige {
        width: 58%;
        margin-right: 0.5rem;
      }
      .num {
        text-align: right;
        width: 30%;
        right: 0rem;
        position: relative;
      }
    }
  }
  /*商品其他*/
  .others {
    background: #ffffff;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-size: 16px;
    .total {
      display: flex;
      align-items: center;
      position: relative;
      height: 2rem;
      border-bottom: 1px solid #c1c5c8;
      .left {
        width: 50%;
        text-align: left;
        padding-left: 1rem;
        span {
          margin-left: 0.5rem;
        }
      }
      .right {
        width: 50%;
        text-align: right;
        padding-right: 1rem;
      }
      .moren {
        width: 0.9rem;
        height: 0.9rem;
        border: 1px solid #c1c5c8;
        border-radius: 50%;
        position: absolute;
        right: 1rem;
        top: 0.6rem;
        img {
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: -2px;
          right: -2px;
        }
      }
      .infos {
        width: 95%;
        color: #666666;
        line-height: 1.8rem;
        font-size: 14px;
        margin-left: -2rem;
      }
    }
  }

  /*支付*/
  .payInfo {
    width: 100%;
    display: flex;
    align-items: center;
    position: fixed;
    font-size: 16px;
    bottom: 0;
    background: #fff;
    .need {
      width: 70%;
      text-align: right;
      padding-right: 1rem;
      span {
        color: #ff7f01;
      }
    }
    .pay {
      width: 30%;
      background: #ff7f01;
      color: #fff;

      line-height: 2.5rem;
      text-align: center;
    }
    .pay2 {
      width: 30%;
      line-height: 2.5rem;
      text-align: center;
    }
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
}
</style>