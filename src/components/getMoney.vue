<template>
  <div class="getMoney">
    <mt-header title="提现" fixed style="height:1.8rem">
      <mt-button icon="back" size="small" slot="left"></mt-button>
    </mt-header>
    <div class="getNow">
      <p>提现金额</p>
      <div>
        <label>
          <span>￥</span>
          <input type="number" class="money">
        </label>
      </div>
      <p class="reti">
        金额
        <span>￥780</span>
        ,全部提现
      </p>
      <div class="apply_for" @click="placeNow">提现</div>
    </div>
    <div class="box" id="box" v-show="hintShow" @click="hintShow == false"></div>
    <div class="hintBox" v-show="hintShow">
      <div class="attention">
        <select class="attens" v-model="slects" @change="switcher(slects)">
          <option value style="display: none">选择入账方式</option>
          <option value="1">微信</option>
          <option value="0">支付宝</option>
          <option value="2">银行</option>
        </select>

        <div v-show="wxShow">
          <input type="text" v-model="accounts" placeholder="输入微信号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
        </div>
        <div v-show="AlipayShow">
          <input type="text" v-model="accounts" placeholder="输入支付号" class="atten">
          <input type="text" v-model="names" placeholder="输入您的真实姓名" class="atten">
        </div>
        <div v-show="bankShow">
          <select class="attens">
            <option value style="display: none" readonly>工商银行</option>
            <option value="1">农业银行</option>
            <option value="0">建设银行</option>
          </select>
          <input type="text" placeholder="输入您的开户名称" class="atten">
          <input type="text" placeholder="输入银行开户卡号" class="atten">
          <input type="text" placeholder="输入您的真实姓名" class="atten">
          <input type="text" placeholder="输入您的手机号" class="atten">
        </div>

        <div class="phoneCode" v-if="weiBang">
          <input type="text" placeholder="输入验证码" class="codeInput">
          <button class="getCode" :disabled="dis">
            获取验证码
            <span v-if="isTrue">({{promptTo}}s)</span>
          </button>
        </div>
      </div>
      <div class="btns">
        <div class="cancel" @click="cancel">取消</div>
        <div class="true">确认无误，立即提现</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hintShow: false,
      accounts: "",
      tishi: "",
      names: "",
      isShow: true,
      dis: false,
      slects: "",
      promptTo: "",
      isTrue: true,
      bankShow: false,
      weiBang: false,
      AlipayShow: false,
      wxShow: false,
      isbtn: "获取验证码"
    };
  },
  methods: {
    placeNow() {
      this.hintShow = true;
    },
    cancel() {
      this.hintShow = false;
    },
    switcher(slects) {
      this.id = slects;
      if (slects == "0") {
        this.wxShow = false;
        this.AlipayShow = true;
        this.bankShow = false;
        this.weiBang = true;
      } else if (slects == "1") {
        this.wxShow = true;
        this.AlipayShow = false;
        this.bankShow = false;
        this.weiBang = true;
      } else {
        this.wxShow = false;
        this.AlipayShow = false;
        this.bankShow = true;
        this.weiBang = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.getMoney {
  height: 100%;
  background: #f1f1f1;
  font-size: 16px;
  text-align: center;
  .getNow {
    background-color: #fff;
    margin-top: 0.5rem;
    padding-bottom: 1rem;
    .reti {
      font-size: 12px;
      margin-left: 1rem;
    }
    p {
      line-height: 3rem;
      text-align: left;
      padding-left: 2.5rem;
    }
    div {
      span {
        font-size: 30px;
      }
      .money {
        color: #666666;
        font-size: 1.4rem;
        line-height: 2rem;
        width: 60%;
        font-size: 18px;
        padding-left: 1rem;
        background-color: #fff;
        display: inline-block;
        border-bottom: 2px solid #ff7f01;
      }
    }
  }
  .box {
    opacity: 0.2;
    background: #040000;
    z-index: 9;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    /*display:none*/
  }
  .hintBox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    background: #ffffff;
    width: 90%;
    padding-bottom: 1rem;
    color: #0b0b0b;
    font-size: 16px;
    border-radius: 0.4rem;
    .attention {
      width: 100%;
      line-height: 1.5rem;
      padding: 1rem 0 0rem 0;
      text-align: center;
      justify-content: center;
      .atten {
        width: 80%;
        margin: 0.3rem auto;
        border: 1px solid #c1c5c8;
        line-height: 1.5rem;
        overflow: hidden;
        outline: none;
        border-radius: 5px;
      }
      .attens {
        background: #eee;
        color: #0b0b0b;
        width: 80%;
        opacity: 0.5;
        text-align: center;
        padding: 5px;
        margin: 0.5rem auto;
        height: 34px;
        -webkit-appearance: none;
        overflow: hidden;
        outline: none;
      }
      .remind {
        width: 80%;
        margin: 0 10% 0.5rem 10%;
        line-height: 0.8rem;
        font-size: 14px;
        text-align: left;
      }
      .phoneCode {
        display: flex;
        align-items: center;
        justify-content: center;
        .codeInput {
          width: 46%;
          margin-right: 0.3rem;
          border: 1px solid #c1c5c8;
          line-height: 1.5rem;
          overflow: hidden;
          outline: none;
          border-radius: 5px;
        }
        .getCode {
          width: 32%;
          border-radius: 2rem;
          height: 1.8rem;
          background: #ff7f01;
          color: #ffffff;
          outline: none;
          border: none;
        }
      }
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #c9c9c9;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #c9c9c9;
    }
    input:-ms-input-placeholder {
      color: #c9c9c9;
    }
    input::-webkit-input-placeholder {
      color: #c9c9c9;
    }
    .btns {
      width: 100%;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .cancel {
        width: 30%;
        line-height: 2rem;
        border-radius: 2rem;
        background-color: #999;
        border: 1px solid #999;
        margin-right: 2%;
        color: #fff;
      }
      .true {
        width: 50%;
        line-height: 2rem;
        background: #ff7f01;
        border-radius: 2rem;
        color: #ffffff;
        margin-left: 2%;
      }
    }
  }
  .apply_for {
    width: 4rem;
    height: 1.8rem;
    margin: 0 auto;
    margin-top: 1.5rem;
    color: #fff;
    border-radius: 1rem;
    line-height: 1.8rem;
    background-color: #ff7f01;
  }
}
</style>



