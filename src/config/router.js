import Sign from '../components/auth/sign.vue'
import Search from '../components/main/search.vue'
import Home from '../components/main/home.vue'



export default [
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