require('es6-promise').polyfill();
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import routes from './config/router'

Vue.use(Router)
Vue.use(axios)
Vue.use(VueCookie)
Vue.prototype.$http = axios

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y : 0}),
  routes
})


new Vue({
  el: '#AWT',
  router,
  render: h => h(App)
})
