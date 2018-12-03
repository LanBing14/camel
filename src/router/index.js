import Vue from "vue";
import Router from "vue-router";
import productMails from "@/components/productMails";
import creatAddress from "@/components/creat_address";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "productMails",
      component: productMails
    },
    {
      path: "/creatAddress",
      name: "creatAddress",
      component: creatAddress
    }
  ]
});
