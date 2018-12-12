<template>
  <div class="login">
    <div class="content">
      <div class="loginModel">
        <div class="login">
          <p>请绑定你登录的手机号码</p>
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
        <div class="btnOne clearfix">
          <span class="sure">确定绑定</span>
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
      this.isDis = true;
      this.CountDown();
    },
    //倒计时
    CountDown() {
      let times = 60;
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
    },
    // 去绑定
    getLogin() {
      this.$axios.post("/HomeUser/Login", this.fromData).then(res => {
        if (res.data.code == "0") {
          localStorage.setItem("token", res.data.data.Ticket);
          this.$router.push("/index");
        } else if (res.data.code == "101") {
          // 去注册 完善个人信息
          this.$router.push({
            path: "/res",
            query: {
              iphone: this.fromData.phone,
              ZYFUser: res.data.data.ZYFUser_ID
            },
            meta: { id: 1 }
          });
        } else if (res.data.code == "1001") {
          // 验证码错误
          this.tishi = res.data.msg;
        } else {
          this.tishi = "登录失败，请重新尝试。";
        }
      });
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
        width: 78%;
        margin: 0 auto;
        margin-top: 0.8rem;
        background: #fff;
        border-radius: 0.8rem;
        position: relative;
        input {
          height: 1.6rem;
          padding-left: 0.8rem;
          background-color: #fff;
          border-radius: 0.8rem;
        }

        .getCode {
          width: 40%;
          font-size: 12px;
          height: 1.6rem;
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
        margin-top: 0.5rem;
        box-sizing: border-box;
        input {
          width: 70%;
          height: 1.6rem;
          padding-left: 0.8rem;
          margin-bottom: 0.2rem;
          background-color: #fff;
          border-radius: 0.8rem;
        }
      }

      .btnOne {
        margin-top: 1.5rem;
        color: #fff;
        .sure {
          width: 4rem;
          height: 1.5rem;
          margin: 0 auto;
          line-height: 1.5rem;
          display: block;
          border-radius: 0.8rem;
          border: 1px solid #ff7f01;
          background-color: #ff7f01;
        }
      }
    }
  }
}
</style>



