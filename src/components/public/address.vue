<template>
  <div class="creatAddress">
    <div class="setBox">
      <div class="infos">
        收货人
        <input type="text" class="infosItem" placeholder="请输入收货人姓名" v-model="sName">
      </div>
      <div class="infos">
        手机号
        <input
          type="text"
          class="infosItem"
          placeholder="请输入收货人手机号"
          v-model="shouPhone"
          @blur="checkPhone(shouPhone)"
        >
      </div>
      <div class="linkage" @click="cityChange">
        <div class="three">
          选择地区
          <input
            type="text"
            class="inputStyle"
            v-model="address"
            placeholder="选择省"
            readonly="readonly"
          >
          <img src="../../assets/imgs/right.png" alt>
        </div>
      </div>
    </div>
    <textarea v-model="detail" placeholder="详细地址"></textarea>
    <!-- 设为默认地址 -->
    <div class="MorenAddress clearfix">
      <p class="fl">设为默认地址</p>
      <div class="xuanze fr" @click="goDefault">
        <img src="../../assets/imgs/gouxuan.png" alt v-show="showChoice">
      </div>
    </div>
    <div class="baocun" @click="addAddress">
      <p>保存</p>
    </div>
    <!-- 保存 -->
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker
        :slots="slots"
        v-model="popupVisible"
        @change="onValuesChange"
        value-key="name"
        :visible-item-count="5"
        ref="picker"
      ></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { Picker, Popup, Toast } from "mint-ui";
import address from "./../common/city.json";

export default {
  data() {
    return {
      popupVisible: false,
      city: "",
      sName: "",
      shouPhone: "",
      showChoice: false,
      detail: "",
      regionInit: false,
      slots: [
        {
          flex: 1,
          defaultIndex: 10,
          values: address,
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: address[0].city,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: address[0].city[0].area,
          className: "slot5",
          textAlign: "center"
        }
      ],
      addressXian: "",
      addressProvince: "",
      addressCity: "",
      address: null,
      companyName: ""
    };
  },
  props: ["AddressId"],
  methods: {
    getddress() {
      this.$axios
        .post("/userCenter/getTheAddress", {
          phone: "12345678901",
          id: this.AddressId
        })
        .then(res => {
          this.city = res.data.data.city;
          this.sName = res.data.data.receiver;
          this.province = res.data.data.province;
          this.county = res.data.data.county;
          this.isDefault = res.data.data.isDefault;
          this.shouPhone = res.data.data.phone;
          this.detail = res.data.data.detail;
          this.address = this.province + "-" + this.city + "-" + this.county;
          if (this.isDefault == 1) {
            this.showChoice = true;
          }
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    /*设置默认地址*/
    goDefault() {
      this.showChoice = !this.showChoice;
    },
    addAddress() {
      var that = this;
      if (that.sName == "" || that.shouPhone == "" || that.detail == "") {
        Toast({
          message: "姓名、手机号、详情地址都不能为空",
          duration: 1500
        });
        return false;
      }
      if (!/^1[34578]\d{9}$/.test(that.shouPhone)) {
        Toast({
          message: "手机号码不正确",
          duration: 1500
        });
        return false;
      }

      if (
        this.address.substring(0, 3) == "青海省" ||
        this.address.substring(0, 2) == "西藏" ||
        this.address.substring(0, 3) == "海南省" ||
        this.address.substring(0, 2) == "新疆" ||
        this.address.substring(0, 2) == "香港" ||
        this.address.substring(0, 2) == "澳门"
      ) {
        Toast({
          message: "新疆、青海、香港、澳门、西藏、宁夏等地不发货",
          duration: 1500
        });
        return false;
      }
      var addresss = new Array(); //定义一数组
      addresss = that.address.split("-"); //字符分割
      var i = 0;
      if (that.showChoice) {
        i = 1;
      }
      that.editAddress(
        addresss[0],
        addresss[1],
        addresss[2],
        that.sName,
        that.shouPhone,
        that.detail,
        i
      );
    },
    editAddress(
      province,
      city,
      county,
      receiver,
      shouPhone,
      detail,
      isDefault
    ) {
      this.$axios
        .post("/userCenter/editAddress", {
          phone: "12345678901",
          name: receiver,
          editPhone: shouPhone,
          province: province,
          city: city,
          county: county,
          detail: detail,
          isDefault: isDefault, //1默认 0普通,
          id: this.AddressId
        })
        .then(res => {
          if (this.AddressId == 0) {
            Toast({
              message: "添加成功",
              duration: 1500
            });
            this.$router.go(-1);
          } else {
            Toast({
              message: "修改成功",
              duration: 1500
            });
            this.$router.push({
              path: "/myAddress",
              query: {
                number: res.data.data.id
              }
            });
          }
        });
    },
    cityChange(e) {
      e.stopPropagation();
      this.popupVisible = true;
    },
    /* 验证手机号 */
    checkPhone(phone) {
      if (!/^1[34578]\d{9}$/.test(phone)) {
        Toast({
          message: "手机号码不正确",
          duration: 1500
        });
      }
      return true;
    },
    onValuesChange(picker, values) {
      if (!values[0]) {
        this.$nextTick(() => {
          if (this.companyName) {
            // 赋默认值
          } else {
            picker.setValues([
              address[0],
              address[0].city[0],
              address[0].city[0].area[0]
            ]);
          }
        });
      } else {
        picker.setSlotValues(1, values[0].city);
        let town = [];
        if (values[1]) {
          town = values[1].area;
        }
        picker.setSlotValues(2, town);
      }

      if (this.regionInit) {
        this.address =
          values[0]["name"] + "-" + values[1]["name"] + "-" + values[2];
        this.addressProvince = values[0]["name"];
        this.addressCity = values[1]["name"];
        this.addressXian = values[2]["name"];
      } else {
        this.regionInit = true;
      }
    }
  },
  created() {
    // document.title = "新增收货地址";
    if (this.AddressId != 0) {
      this.getddress();
    }
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      setTimeout(() => {
        that.slots[0].defaultIndex = 0;
      }, 100);
    });
  },
  components: {
    "mt-picker": Picker,
    "mt-popup": Popup
  }
};
</script>
<style lang="scss">
.creatAddress {
  background-color: #f0f0f0;
  padding-top: 1rem;
  .mint-header {
    background-color: #fff;
    font-size: 16px;
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .mint-popup {
    border-radius: 0.4rem 0.4rem 0 0;
  }
  .setBox {
    font-size: 16px;
    background: #ffffff;
    .infos {
      font-family: PingFang-SC-Medium;
      color: #666666;
      height: 2rem;
      padding-left: 0.3rem;
      margin: 0 0.5rem 0rem 0.5rem;
      line-height: 2rem;
      border-bottom: 1px solid #e0dfdf;
      .infosItem {
        font-size: 16px;
        padding-left: 0.9rem;
      }
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #e0dfdf;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #e0dfdf;
    }
    input:-ms-input-placeholder {
      color: #e0dfdf;
    }
    input::-webkit-input-placeholder {
      color: #e0dfdf;
    }

    .linkage {
      display: flex;
      align-items: center;
      font-size: 16px;
      width: 97%;
      .three {
        width: 100%;
        display: flex;
        margin-left: 0.5rem;
        align-items: center;
        padding-left: 0.3rem;
        border-bottom: 1px solid #e0dfdf;
        .inputStyle {
          width: 68%;
          line-height: 2rem;
          padding-left: 0.4rem;
          color: #0f0f0f;
          font-size: 16px;
        }
        img {
          margin-left: 0.7rem;
          width: 0.7rem;
        }
      }
    }
  }

  textarea {
    width: 100%;
    font-size: 16px;
    box-sizing: border-box;
    padding: 0.4rem 0 0.5rem 0.7rem;
    font-family: PingFang-SC-Medium;
    color: #666666;
    resize: none;
    border: none;
    border: solid 0px;
  }
  textarea:-ms-input-placeholder {
    font-size: 16px;
    color: #e0dfdf;
  }
  textarea::-webkit-input-placeholder {
    font-size: 16px;
    color: #e0dfdf;
  }
  textarea:focus {
    outline: none;
  }
  .baocun {
    width: 100%;
    margin-top: 3.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 18px;
    p {
      width: 8rem;
      margin: 0 auto;
      border-radius: 0.6rem;
      text-align: center;
      background-color: #ff7f01;
      color: #fff;
    }
  }
  .MorenAddress {
    font-size: 16px;
    margin-top: 0.2rem;
    background-color: #fff;
    line-height: 1.7rem;
    padding-left: 0.5rem;

    .xuanze {
      width: 0.7rem;
      height: 0.7rem;
      border: 1px solid #aaaaaa;
      margin: 0.5rem 0.5rem;
      border-radius: 50%;
      img {
        width: 0.8rem;
        height: 0.8rem;
        display: block;
        border-radius: 50%;
        margin-left: -1.1px;
        margin-top: -1.1px;
      }
    }
  }
}
</style>

