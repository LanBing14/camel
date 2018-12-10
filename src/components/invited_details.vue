<template>
  <div id="invite_details">
    <mt-header fixed title="提现明细">
      <mt-button icon="back" size="small" slot="left" @click="goback"></mt-button>
    </mt-header>
    <!--邀请-->
    <div class="inviteBg">
      <ul>
        <li class="invite">
          <div class="inviteItem">
            <div class="name clearfix">
              <div class="way fl">
                <span class="fl" v-if="isShang">赏金</span>
                <span class="fl">提现</span>
              </div>
              <div class="wayRed fl">
                <span class="redWay fl red" v-if="isShang">+89</span>
                <span class="redWay fl red">-89</span>
              </div>
              <span class="fr" style="fontSize:14px">2018-10-22 13:15</span>
            </div>
            <div class="phoneInfo">
              <p class="phone">用户123****432购买了您推荐的</p>
              <p class="money">(商品标题)</p>
            </div>
            <p class="wayRemind" v-if="isDon">可提现</p>
            <p class="wayRemind red">冻结中</p>
            <p class="wayRemind" v-if="isZhuan">已转账</p>
          </div>
        </li>
        <li class="invite">
          <div class="inviteItem">
            <div class="name clearfix">
              <div class="way fl">
                <span class="fl" v-if="isShang">赏金</span>
                <span class="fl">提现</span>
              </div>
              <div class="wayRed fl">
                <span class="redWay fl red" v-if="isShang">+89</span>
                <span class="redWay fl red">-89</span>
              </div>
              <span class="fr" style="fontSize:14px">2018-10-22 13:15</span>
            </div>
            <div class="phoneInfo" v-if="isShang">
              <p class="phone">用户123****432购买了您推荐的</p>
              <p class="money">(商品标题)</p>
            </div>
            <div class="phoneInfo">
              <p class="tixianWays">提现至(支付宝/微信)</p>
            </div>
            <p class="wayRemind" v-if="isDon">可提现</p>
            <p class="wayRemind red">冻结中</p>
            <p class="wayRemind" v-if="isZhuan">已转账</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "invite_details",
  data() {
    return {
      isBian: false,
      isZhuan: false,
      isShang: false,
      isDon: false
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    document.title = "邀请明细";
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
#invite_details {
  height: 100%;
  background-color: #f1f1f1;
  font-size: 16px;
  .red {
    color: #ff7f01 !important;
  }
  .inviteBg {
    padding-top: 1.8rem;
    .invite {
      width: 100%;
      margin: 0 auto;
      padding: 0.6rem;
      margin-top: 0.2rem;
      box-sizing: border-box;
      background-color: #fff;
      .inviteItem {
        position: relative;
        .name {
          .way {
            float: left;
            span {
              color: #000 !important;
            }
          }
          span:last-child {
            color: #999;
          }
          .redWay {
            margin-left: 0.5rem;
          }
        }
        .phoneInfo {
          margin-top: 0.4rem;
          line-height: 1rem;
          font-size: 14px;
          color: #999;
          .tixianWays {
            line-height: 2rem;
          }
        }
        .wayRemind {
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
