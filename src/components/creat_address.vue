<template>
  <div class="creatAddress">
    <mt-header fixed title="新增收货地址" style="height:1.8rem">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="setBox">
      <div class="infos">
        收货人
        <input type="text" class="infosItem" placeholder="请输入收货人姓名" v-model="userName">
      </div>
      <div class="infos">
        手机号
        <input type="text" class="infosItem" placeholder="请输入收货人手机号" v-model="phone">
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
          <img src="../assets/imgs/right.png" alt>
        </div>
      </div>
    </div>
    <textarea v-model="detailed" placeholder="详细地址"></textarea>
    <!-- 设为默认地址 -->
    <div class="MorenAddress clearfix">
      <p class="fl">设为默认地址</p>
      <div class="xuanze fr">
        <img src="../assets/imgs/gouxuan.png" alt v-show="show">
      </div>
    </div>
    <!-- 保存 -->
    <div class="baocun">
      <p>保存</p>
    </div>
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
import { Picker, Popup } from "mint-ui";
import address from "./common/city.json";

export default {
  data() {
    return {
      popupVisible: false,
      userName: "",
      phone: "",
      show: false,
      detailed: "",
      regionInit: false, //禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    cityChange(e) {
      e.stopPropagation();
      this.popupVisible = true;
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
  height: 100%;
  background-color: #f1f1f1;
  .mint-header {
    background-color: #ff7f01;
    font-size: 16px;
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .mint-popup {
    border-radius: 0.4rem 0.4rem 0 0;
  }
  .setBox {
    margin-top: 2rem;
    padding-bottom: 0.5rem;
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
          width: 8%;
        }
      }
    }
  }

  textarea {
    width: 100%;
    font-size: 16px;
    box-sizing: border-box;
    padding: 0.1rem 0 0.5rem 0.7rem;
    font-family: PingFang-SC-Medium;
    color: #666666;
    resize: none;
    border: none;
  }
  textarea:-ms-input-placeholder {
    font-size: 16px;
    color: #e0dfdf;
  }
  textarea::-webkit-input-placeholder {
    font-size: 16px;
    color: #e0dfdf;
  }
  .MorenAddress {
    font-size: 16px;
    margin-top: 0.2rem;
    background-color: #fff;
    line-height: 1.5rem;
    padding-left: 0.5rem;

    .xuanze {
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid #aaaaaa;
      margin: 0.5rem 0.5rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
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
}
</style>
