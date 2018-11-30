// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
import "swiper/dist/css/swiper.css";
import axios from "./util/http";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.prototype.$axios = axios;
import qs from "qs";
Vue.use(qs);
Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
