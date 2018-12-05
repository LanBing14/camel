import Vue from "vue";
import Router from "vue-router";
import productMails from "@/components/productMails";
import creatAddress from "@/components/creat_address";
import coupon from "@/components/coupon";
import shareMake from "@/components/shareMake";
import particular from "@/components/particular";
import payMoney from "@/components/payMoney";
import paySuccess from "@/components/paySuccess";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/productMails",
      name: "productMails",
      component: productMails
    },
    {
      path: "/creatAddress",
      name: "creatAddress",
      component: creatAddress
    },
    {
      path: "/coupon",
      name: "coupon",
      component: coupon
    },
    {
      path: "/particular",
      name: "particular",
      component: particular
    },
    {
      path: "/shareMake",
      name: "shareMake",
      component: shareMake
    },
    {
      path: "/payMoney",
      name: "payMoney",
      component: payMoney
    },
    {
      path: "/paySuccess",
      name: "paySuccess",
      component: paySuccess
    }
  ]
});
