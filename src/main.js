require('es6-promise').polyfill()

import Vue from 'vue'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
import App from './App.vue'
import router from './config/router'
import store from './store/store'

Vue.use(axios)
Vue.prototype.$http = axios
Vue.use(VueCookie)

new Vue({
  el: '#AWT',
  store,
  router,
  render: h => h(App)
})
