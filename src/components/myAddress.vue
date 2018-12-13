<template>
  <div class="myAddress">
    <mt-header fixed title="我的收货地址" style="height:1.8rem">
      <mt-button icon="back" slot="left" @click="goback"></mt-button>
    </mt-header>
    <div class="other" @click="addBtn">
      <img src="../assets/imgs/add.png" alt>
    </div>
    <div class="modelContent">
      <div class="Consignee" v-for="(item,index) in address" :key="index">
        <div class="messages">
          <p class="name">
            {{item.receiver}}
            <span class="phone">{{item.phone}}</span>
          </p>
          <p class="address">{{item.province}}{{item.city}}{{item.county}}{{item.detail}}</p>
          <p class="Moaddress" v-if="item.isDefault == 1">默认地址</p>
        </div>
        <div class="handelbtn">
          <p class="edit" @click="editBtn(item)">编辑</p>
          <p @click="deleBtn(item.id)">删除地址</p>
        </div>
      </div>
      <p class="none">没有更多了</p>
    </div>

    <div class="box" v-show="isShow" @click="hiddleToggle"></div>
    <div class="modelConfirm" v-show="isShow">
      <p>确定删除该地址吗?</p>
      <div class="bgn">
        <span class="fl" @click="cancel">取消</span>
        <span class="fr" @click="makeSure">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Picker, Popup, Toast } from "mint-ui";

export default {
  data() {
    return {
      province: "",
      city: "",
      itemShow: 0,
      isShow: false,
      county: "",
      receiver: "",
      phone: "",
      address: [],
      deleteId: "",
      detail: "",
      phoneArr: []
    };
  },
  methods: {
    goback() {
      this.$router.push("/myInfo");
    },
    cancel() {
      this.isShow = false;
    },
    makeSure() {
      this.deleList();
    },
    deleBtn(id) {
      this.isShow = true;
      this.deleteId = id;
    },
    addBtn() {
      this.$router.push("/creatAddress");
    },
    editBtn(item) {
      this.$router.push({
        path: "/editAddress",
        query: {
          id: item.id
        }
      });
    },
    hiddleToggle() {
      this.isShow = false;
    },
    getList() {
      this.$axios
        .post("/userCenter/userAddressList", {
          phone: "12345678901"
        })
        .then(res => {
          if (res.data.status == 1) {
            this.address = res.data.data;
            // var reg = /(\d{3})\d{4}(\d{4})/;
            // this.phoneArr = this.address.map(function(v) {
            //   v.phone = v.phone.replace(reg, "$1****$2");
            //   return v;
            // });
          }
        });
    },
    deleList(id) {
      this.$axios
        .post("/userCenter/delAddress", {
          phone: "12345678901",
          id: this.deleteId
        })
        .then(res => {
          if (res.data.status == 1) {
            Toast({
              message: "删除成功",
              duration: 1500
            });
            this.isShow = false;
            this.getList();
          }
        });
    }
  },
  created() {
    document.title = "我的收货地址";

    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.myAddress {
  height: 100%;
  background: #f0f0f0;
  padding-top: 2rem;
  position: relative;
  /*蒙版*/
  .box {
    opacity: 0.6;
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
  .modelConfirm {
    width: 75%;
    position: fixed;
    left: 50%;
    top: 50%;
    text-align: center;
    border-radius: 0.2rem;
    padding: 1rem;
    z-index: 100;
    font-size: 16px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    p {
      margin-bottom: 1.5rem;
    }
    .bgn {
      span {
        border: 1px solid #000;
        width: 3.76rem;
        line-height: 1.36rem;
        height: 1.36rem;
        border-radius: 0.8rem;
      }
      span:last-child {
        color: #ff7f01;
        border: 1px solid #ff7f01;
      }
    }
  }
  .modelContent {
    background: #f1f1f1;
    width: 100%;
    font-size: 16px;
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
      margin-bottom: 0.2rem;
      font-size: 16px;
      height: 3.2rem;
      padding: 0.3rem 0.1rem 0.4rem 0.2rem;
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
        width: 79%;
        padding-left: 0.5rem;
        .name {
          .phone {
            font-size: 14px;
            color: #999;
            margin-left: 0.3rem;
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
          overflow: hidden;
        }
      }
      .handelbtn {
        width: 18%;
        text-align: center;
        font-size: 12px;
        color: #999;
        .edit {
          width: 100%;
          line-height: 1.5rem;
        }
        p:last-child {
          width: 100%;
          line-height: 1rem;
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
  .other {
    position: fixed;
    right: 0.6rem;
    top: 0.1rem;
    z-index: 99;
    img {
      width: 0.7rem;
    }
  }
}
</style>

