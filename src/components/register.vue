<template>
  <div class="login">
    <div class="content">
      <div class="loginModel">
        <div class="login">
          <span>账户登录</span>|
          <span class="public">账户注册</span>
        </div>
        <div class="comment">
          <input type="text" placeholder="请输入手机号">
        </div>
        <div class="code clearfix">
          <div class="fl">
            <input type="text" placeholder="输入验证码">
          </div>
          <button
            class="getCode fr"
            :disabled="isDis"
            :class="{isDesActive:isDis}"
            @click="getYzm"
          >{{isbtn}}</button>
        </div>

        <div class="comment">
          <input type="text" placeholder="设置登录密码">
        </div>
        <router-link to="/login" class="makeZhu">已有账户立即登录</router-link>
        <div class="btnOne clearfix">
          <span class="cancel fl">取消</span>
          <span class="sure fr">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fromData: {
        phone: "", // 手机号
        vercode: "", // 验证码
        phonecode: "86",
        vercode_token: ""
      },
      tishi: "",
      isDis: false,
      isbtn: "获取验证码"
    };
  },
  methods: {
    getYzm() {
      this.tishi = "";
      this.isDis = true;
      this.CountDown();
    },
    //倒计时
    CountDown() {
      let times = 90;
      this.isbtn = times + "s";
      var inter = setInterval(
        function() {
          times = times - 1;
          this.isbtn = times + "s";
          if (times == 0) {
            clearInterval(inter);
            this.isbtn = "获取成功";
            this.isDis = false;
          }
        }.bind(this),
        1000
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background: #f1f1f1;
  .content {
    padding-top: 6.5rem;
    .loginModel {
      width: 80%;
      margin: 0 auto;
      height: 10rem;
      color: #000;
      text-align: center;
      font-size: 16px;
      padding: 0.3rem;
      border-radius: 0.2rem;

      .code {
        width: 72%;
        margin: 0 auto;
        margin-top: 0.2rem;
        background: #fff;
        border-radius: 0.8rem;
        position: relative;
        input {
          height: 1.2rem;
          margin-bottom: 0.2rem;
          padding-left: 0.6rem;
          background-color: #fff;
          border-radius: 0.8rem;
        }

        .getCode {
          width: 40%;
          font-size: 12px;
          height: 1.4rem;
          border: none;
          background: #ff9254;
          color: #fff;
          padding: 0.3rem 0.5rem;
          border-radius: 0 0.8rem 0.8rem 0;
          outline: none;
          position: absolute;
          right: 0rem;
          top: 0rem;
        }
        .isDesActive {
          background: #999;
        }
      }
      .login {
        color: #000;
        height: 2.2rem;
        background: #f1f1f1;
        line-height: 2.2rem;
        span {
          margin: 0.2rem;
        }
      }
      .public {
        color: #ff7f01;
      }
      .comment {
        // width: 100%;
        margin-top: 0.4rem;
        box-sizing: border-box;
        input {
          width: 65%;
          height: 1.4rem;
          padding-left: 0.8rem;
          margin-bottom: 0.2rem;
          background-color: #fff;
          border-radius: 0.8rem;
        }
      }

      .makeZhu {
        font-size: 12px;
        color: #ff7f01;
        margin: 0 auto;
        line-height: 1rem;
        display: block;
        width: 43%;
        border-bottom: 1px solid #ff7f01;
      }
      .btnOne {
        width: 70%;
        margin: 0 auto;
        margin-top: 1rem;
        color: #fff;
        .cancel {
          width: 3.5rem;
          height: 1.4rem;
          line-height: 1.4rem;
          border: 1px solid #999;
          background-color: #999;
          border-radius: 0.8rem;
        }
        .sure {
          width: 3.5rem;
          height: 1.4rem;
          line-height: 1.4rem;
          border-radius: 0.8rem;
          border: 1px solid #ff7f01;
          background-color: #ff7f01;
        }
      }
    }
  }
}
</style>



