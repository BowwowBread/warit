import Vue from 'vue'
import Router from 'vue-router'

import Sign from '../components/auth/sign.vue'
import Search from '../components/main/search.vue'
import Home from '../components/main/home.vue'
import Like from '../components/main/like.vue'
import Ranking from '../components/main/ranking.vue'
import Myinfo from '../components/main/myinfo.vue'
import notFound from '../components/shared/notfound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
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
    {
      path: '/like',
      name: 'like',
      component: Like,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: Myinfo
    },
    {
      path: '/404',
      name: 'notfound',
      component: notFound,
    },
    {
      path: '/*',
      redirect: {
        name: 'notfound'
      },
    },
  ]
})