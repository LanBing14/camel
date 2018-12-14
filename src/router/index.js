import Vue from "vue";
import Router from "vue-router";

const productMails = resolve => require(["@/components/productMails"], resolve);
const coupon = resolve => require(["@/components/coupon"], resolve);
const shareMake = resolve => require(["@/components/shareMake"], resolve);
const particular = resolve => require(["@/components/particular"], resolve);
const payConfirm = resolve => require(["@/components/payConfirm"], resolve);
const paySuccess = resolve => require(["@/components/paySuccess"], resolve);
const register = resolve => require(["@/components/register"], resolve);
const myOrder = resolve => require(["@/components/myOrder"], resolve);
const getMoney = resolve => require(["@/components/getMoney"], resolve);
const guanzhu = resolve => require(["@/components/guanzhu"], resolve);
const packDetails = resolve => require(["@/components/packDetails"], resolve);
const exchangeGift = resolve => require(["@/components/exchangeGift"], resolve);
const myInfo = resolve => require(["@/components/myInfo"], resolve);
const myAddress = resolve => require(["@/components/myAddress"], resolve);
const editAddress = resolve => require(["@/components/editAddress"], resolve);
const creatAddress = resolve =>
  require(["@/components/creat_address"], resolve);
const getMoneySuccess = resolve =>
  require(["@/components/getMoneySuccess"], resolve);
const invitedDetails = resolve =>
  require(["@/components/invited_details"], resolve);
const shareDetails = resolve =>
  require(["@/components/share_Details"], resolve);

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      path: "/register",
      name: "手机绑定",
      component: register
    },
    {
      path: "/",
      name: "商城",
      component: productMails,
      meta: { auth: true }
    },
    {
      path: "/creatAddress",
      name: "地址",
      component: creatAddress,
      meta: { auth: true }
    },
    {
      path: "/myAddress",
      name: "我的收货地址",
      component: myAddress,
      meta: { auth: true }
    },
    ,
    {
      path: "/editAddress",
      name: "编辑收货地址",
      component: editAddress,
      meta: { auth: true }
    },
    {
      path: "/coupon",
      name: "优惠券",
      component: coupon,
      meta: { auth: true }
    },
    {
      path: "/particular",
      name: "详情页",
      component: particular,
      meta: { auth: true }
    },
    {
      path: "/shareMake",
      name: "我分享的人",
      component: shareMake,
      meta: { auth: true }
    },
    {
      path: "/payConfirm",
      name: "订单确认",
      component: payConfirm,
      meta: { auth: true }
    },
    {
      path: "/paySuccess",
      name: "支付成功",
      component: paySuccess,
      meta: { auth: true }
    },
    {
      path: "/myOrder",
      name: "我的订单",
      component: myOrder,
      meta: { auth: true }
    },
    {
      path: "/getMoney",
      name: "申请提现",
      component: getMoney,
      meta: { auth: true }
    },
    {
      path: "/getMoneySuccess",
      name: "提现成功",
      component: getMoneySuccess,
      meta: { auth: true }
    },
    {
      path: "/guanzhu",
      name: "关注",
      component: guanzhu,
      meta: { auth: true }
    },
    {
      path: "/invitedDetails",
      name: "邀请明细",
      component: invitedDetails,
      meta: { auth: true }
    },
    {
      path: "/shareDetails",
      name: "赏金明细",
      component: shareDetails,
      meta: { auth: true }
    },
    {
      path: "/packDetails",
      name: "订单详情",
      component: packDetails,
      meta: { auth: true }
    },
    {
      path: "/exchangeGift",
      name: "礼品兑换",
      component: exchangeGift,
      meta: { auth: true }
    },
    {
      path: "/myInfo",
      name: "我的",
      component: myInfo,
      meta: { auth: true }
    }
  ]
});
