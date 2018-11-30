/**
 * Created by superman on 17/2/16.
 * http配置
 */
// import Vue from 'vue'
import axios from "axios";

// import router from '@/router'
// axios 配置

// axios.defaults.timeout = 5000;
// const root = process.env.API_ROOT
// axios.defaults.baseURL = root;
// console.log(axios.defaults.headers)
// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';   // Accept
// console.log(axios.defaults.headers)
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // var xtoken = sessionStorage.getItem("token")
    // config.headers['XToken'] = xtoken?xtoken:''
    //console.log(store.state.cesh)
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code == "404") {
      // console.log(11)
      alert(8);
    } else {
      return response;
      // console.log(22)
      // if(response.data.code == '0'){
      //     return response.data.data;
      // }else {
      //     console.log('接口出错')
      //     return response
      // }
    }
  },
  error => {
    alert(9);
    // console.log(error)
    if (error.response) {
      console.log(error);
    }

    return Promise.reject(error);
  }
);

export default axios;
