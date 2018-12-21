<template>
  <div class="shareMake">
    <mt-header title="我分享的人" fixed>
      <mt-button icon="back" size="small" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="makeCoupon">
      <div class="makeItem clearfix" v-for="(item,index) in infoArr" :key="index">
        <div class="fl imgBox">
          <img :src="item.img" alt>
        </div>
        <div class="fl centerBox">
          <p class="one-txt-cut">分享给用户</p>
          <p class="iconTxt">{{item.phone}}</p>
        </div>
        <div class="fr leftBox">
          <p class="public">合计</p>
          <p>
            赚
            <span class="publiColor public">¥{{item.shareUserSum}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoArr: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getList() {
      this.$axios
        .post("/userCenter/shareUserList", {
          phone: localStorage.getItem("phone")
        })
        .then(res => {
          if (res.status == 200) {
            this.infoArr = res.data.data;
          }
        });
    }
  },
  created() {
    // document.title = "我分享的人";
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.shareMake {
  background: #f0f0f0;
  padding-top: 1.9rem;
  .makeCoupon {
    margin-top: 0.1rem;
    font-size: 15px;
    .makeItem {
      padding: 0.5rem 0.3rem;
      background-color: #fff;
      border-bottom: 2px solid #f0f0f0;
      .imgBox {
        width: 2.5rem;
        padding: 0.4rem 0.2rem;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      .centerBox {
        width: 55%;
        padding-left: 0.5rem;
        margin-top: 0.3rem;
        .iconTxt {
          line-height: 1.5rem;
        }
      }
      .leftBox {
        margin-top: 0.2rem;
        .public {
          font-size: 15px;
          text-align: center;
          line-height: 1.3rem;
        }
      }
    }
  }
}
</style>

