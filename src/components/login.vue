<template>
  <div class="login">
    <div class="content">
      <div class="loginModel">
        <div class="login">
          <span class="public">账户登录</span>|
          <span>账户注册</span>
        </div>
        <div class="comment">
          <input type="text" placeholder="请输入手机号">
        </div>
        <div class="comment">
          <input type="text" placeholder="请输入密码">
        </div>
        <router-link to="/register" class="makeZhu">还没有账号?点击去注册</router-link>
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
  methods: {}
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
        width: 45%;
        display: block;
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

