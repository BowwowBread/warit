import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
import routes from './config/router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y : 0}),
  routes
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
