import Vue from 'vue'
import Router from 'vue-router'

import Sign from '../components/auth/sign.vue'
import Search from '../components/main/search.vue'
import Home from '../components/main/home.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
  ]
})