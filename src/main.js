import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from './router'
import ElementUI from 'element-ui';
import All from "./common/All";
import 'element-ui/lib/theme-chalk/index.css';
import {post,get,patch,put,del} from './api/index';
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$cookies = VueCookies;
Vue.prototype.$All = All
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$del=del;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: function(){
      return {
        userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{},
        pageSize:15,
      }
  },
  render: h => h(App)
})
