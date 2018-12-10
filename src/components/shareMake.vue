<template>
  <div class="shareMake">
    <mt-header title="我分享的人" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>

    <div class="makeCoupon">
      <div class="makeItem clearfix">
        <div class="fl imgBox">
          <img src="../assets/imgs/users.png" alt>
        </div>
        <div class="fl centerBox">
          <p class="one-txt-cut">标题标题标题标题标题标题</p>
          <p>21</p>
          <p class="iconTxt">分享给用户</p>
          <p class="iconTxt">12345678088</p>
        </div>
        <div class="fr leftBox">
          <p class="publiColor public">待结算</p>
          <p>
            赚¥
            <span>890</span>
          </p>
        </div>
      </div>
      <div class="makeItem clearfix">
        <div class="fl imgBox">
          <img src="../assets/imgs/users.png" alt>
        </div>
        <div class="fl centerBox">
          <p class="one-txt-cut">标题标题标题标题标题标题</p>
          <p>21</p>
          <p class="iconTxt">分享给用户</p>
          <p class="iconTxt">12345678088</p>
        </div>
        <div class="fr leftBox">
          <p class="public">已结算</p>
          <p>
            赚¥
            <span>890</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.shareMake {
  height: 100%;
  background-color: #f1f1f1;
  padding-top: 1.8rem;
  .makeCoupon {
    margin-top: 0.2rem;
    font-size: 14px;
    .makeItem {
      padding: 0.5rem 0.3rem;
      background-color: #fff;
      margin-bottom: 0.2rem;
      .imgBox {
        padding: 0.2rem;
        img {
          width: 2rem;
        }
      }
      .centerBox {
        width: 55%;
        .iconTxt {
          font-size: 12px;
          color: #999;
        }
      }
      .leftBox {
        margin-top: 0.2rem;
        .public {
          font-size: 12px;
          line-height: 1rem;
        }
      }
    }
  }
}
</style>

