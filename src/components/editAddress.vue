<template>
  <div class="creatAddress">
    <mt-header fixed title="编辑收货地址" style="height:1.8rem">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <addressmore :AddressId="AddressId"></addressmore>
  </div>
</template>
<script>
import addressmore from "./public/address";
export default {
  data() {
    return {
      AddressId: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    // document.title = "新增收货地址";
    this.AddressId = this.$route.query.id;
  },
  mounted() {},
  components: {
    addressmore
  }
};
</script>
<style lang="scss">
</style>
