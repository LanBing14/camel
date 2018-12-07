import Vue from "vue";
import Router from "vue-router";
import productMails from "@/components/productMails";
import creatAddress from "@/components/creat_address";
import coupon from "@/components/coupon";
import shareMake from "@/components/shareMake";
import particular from "@/components/particular";
import payConfirm from "@/components/payConfirm";
import paySuccess from "@/components/paySuccess";
import login from "@/components/login";
import register from "@/components/register";
import myOrder from "@/components/myOrder";
import getMoney from "@/components/getMoney";
import guanzhu from "@/components/guanzhu";
import getMoneySuccess from "@/components/getMoneySuccess";
import invitedDetails from "@/components/invited_details";
import packDetails from "@/components/packDetails";
import payMoney from "@/components/payMoney";
import exchangeGift from "@/components/exchangeGift";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "登录",
      component: login
    },
    {
      path: "/register",
      name: "注册",
      component: register
    },
    {
      path: "/productMails",
      name: "商城",
      component: productMails
    },
    {
      path: "/creatAddress",
      name: "地址",
      component: creatAddress
    },
    {
      path: "/coupon",
      name: "优惠券",
      component: coupon
    },
    {
      path: "/particular",
      name: "详情页",
      component: particular
    },
    {
      path: "/shareMake",
      name: "分享赚",
      component: shareMake
    },
    {
      path: "/payConfirm",
      name: "订单确认",
      component: payConfirm
    },
    {
      path: "/payMoney",
      name: "订单支付",
      component: payMoney
    },
    {
      path: "/paySuccess",
      name: "支付成功",
      component: paySuccess
    },
    {
      path: "/myOrder",
      name: "我的订单",
      component: myOrder
    },
    {
      path: "/getMoney",
      name: "申请提现",
      component: getMoney
    },
    {
      path: "/getMoneySuccess",
      name: "提现成功",
      component: getMoneySuccess
    },
    {
      path: "/guanzhu",
      name: "关注",
      component: guanzhu
    },
    {
      path: "/invitedDetails",
      name: "邀请明细",
      component: invitedDetails
    },
    {
      path: "/packDetails",
      name: "订单详情",
      component: packDetails
    },
    {
      path: "/exchangeGift",
      name: "礼品兑换",
      component: exchangeGift
    }
  ]
});
