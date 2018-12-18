<template>
  <div class="guanzhu">
    <mt-header fixed title="分享推广二维码">
      <mt-button icon="back" size="small" slot="left"></mt-button>
    </mt-header>
    <div class="center">
      <img src="../assets/imgs/code.png" alt>
      <p>保存商品二维码到手机相册发送给好友购买</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "guanzhu",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {
    document.title = "分享推广二维码";
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.guanzhu {
  height: 100%;
  font-size: 16px;
  background-color: #f0f0f0;
  padding-top: 1.9rem;

  .center {
    width: 100%;
    background-color: #fff;
    border-top: 2px solid #f1f1f1;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin: 0 auto;
    margin-top: 2rem;
    text-align: center;
    img {
      width: 4.8rem;
    }
    p {
      width: 60%;
      font-size: 14px;
      margin: 0 auto;
      margin-top: 1rem;
    }
  }
}
</style>

