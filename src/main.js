
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import "./plugins/BaseComponents"; // 基础公共组件
import './assets/css/font.css';//字体引入
import './plugins/vant'
import './plugins/element';

import api from "./plugins/api.js";
Vue.prototype.$api = api;
import axios from "./plugins/axios.js";
Vue.prototype.$axios = axios;

import 'lib-flexible'

// import VConsole from 'vconsole';
// let vConsole = new VConsole();
// Vue.use(vConsole);

Vue.prototype.$url = "http://fd.sctsjkj.com:5081"; // 服务器地址

Vue.config.productionTip = false

let val = localStorage.getItem("setUserInfo");
if (val) {
  let info = JSON.parse(val);
  store.commit("setUserInfo", info);
}

import { Toast } from "vant";
document.addEventListener("plusready", function() {
  let time = ""; // 用来存上一次按键时间；
  plus.key.addEventListener(
    "backbutton",
    function() {
      let url = location.hash.split("/")[1];
      if (
        url === "unit" ||
        url === "terminal" ||
        url === "set" ||
        url === "login"
      ) {
        // 处于app首页,满足退出app操作
        if (new Date() - time < 2000) {
          // 小于2s,退出程序
          plus.runtime.quit();
        } else {
          // 大于2s，重置时间戳，
          time = new Date();
          Toast("再次点击退出");
        }
        return;
      } else {
        // console.log("不满足条件");
        window.history.back();
      }
    },
    false
  );
});


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
