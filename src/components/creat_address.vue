<template>
  <div class="creatAddress">
    <input type="text" v-model="address" placeholder="选择省" readonly="readonly">
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
      address: "",
      companyName: ""
    };
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0]) {
        picker.setSlotValues(1, values[0].city);
        let county = [];
        if (values[1]) {
          county = values[1].area;
        }
        picker.setSlotValues(2, county);
      } else {
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
    this.$nextTick(() => {
      setTimeout(() => {
        this.slots[0].defaultIndex = 0;
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
  .mint-popup-bottom {
    width: 100%;
  }
  .mint-popup {
    border-radius: 0.4rem;
  }
}
</style>
