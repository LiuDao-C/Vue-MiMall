import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VueLazyLoad from 'vue-lazyload'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
// import env from './env'

// mock 开关
const mock = false;
if(mock) {
  require('./mock/api');
}

// 根据前端的跨域方式做调整
// 接口代理
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;

// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data;
  if(res.status == 0) {
    return res.data;
  } else if(res.status == 10) {
      window.location.href = '/#/login';
      return Promise.reject(res);
  } else {
    //alert(res.msg);
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  return Promise.reject(error);
});

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(Message)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
