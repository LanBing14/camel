import Vue from "vue";
import Router from "vue-router";
import productMails from "@/components/productMails";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "productMails",
      component: productMails
    }
  ]
});
