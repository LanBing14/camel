<template>
  <div class="shareDetails">
    <mt-header fixed title="赏金明细">
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <!--邀请-->
    <div class="makeCoupon">
      <div class="makeItem clearfix">
        <div class="fl imgBox">
          <img src="../assets/imgs/img.png" alt>
        </div>
        <div class="fl centerBox">
          <p class="one-txt-cut">标题标题标题标题标题标题</p>
          <p>
            ￥
            <span>21</span>
          </p>
          <p class="iconTxt">分享给用户</p>
          <p class="iconNum">12345678088</p>
        </div>
        <div class="fr leftBox">
          <p>
            赚
            <span class="publiColor">¥890</span>
          </p>
        </div>
      </div>
      <div class="makeItem clearfix">
        <div class="fl imgBox">
          <img src="../assets/imgs/img.png" alt>
        </div>
        <div class="fl centerBox">
          <p class="one-txt-cut">标题标题标题标题标题标题</p>
          <p>
            ￥
            <span>21</span>
          </p>
          <p class="iconTxt">分享给用户</p>
          <p class="iconNum">12345678088</p>
        </div>
        <div class="fr leftBox">
          <p>
            赚
            <span class="publiColor">¥890</span>
          </p>
        </div>
      </div>
      <div class="makeItem clearfix">
        <div class="fl imgBox">
          <img src="../assets/imgs/img.png" alt>
        </div>
        <div class="fl centerBox">
          <p class="one-txt-cut">标题标题标题标题标题标题</p>
          <p>
            ￥
            <span>21</span>
          </p>
          <p class="iconTxt">分享给用户</p>
          <p class="iconNum">12345678088</p>
        </div>
        <div class="fr leftBox">
          <p>
            赚
            <span class="publiColor">¥890</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shareDetails",
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    // document.title = "赏金明细";
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
.shareDetails {
  background: #f0f0f0;
  padding-top: 1.9rem;
  .makeCoupon {
    margin-top: 0.1rem;
    font-size: 16px;
    .makeItem {
      padding: 0.5rem 0.3rem;
      background-color: #fff;
      border-bottom: 2px solid #f0f0f0;

      .imgBox {
        width: 3.2rem;
        img {
          width: 100%;
        }
      }
      .centerBox {
        width: 55%;
        margin-left: 0.4rem;

        .iconTxt {
          font-size: 14px;
          margin-top: 0.5rem;
          color: #999;
        }
        .iconNum {
          font-size: 14px;
          color: #999;
        }
      }
      .leftBox {
        margin-top: 0.2rem;
        line-height: 3.2rem;
        font-size: 14px;
        span {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
