import Index from '../components/main/index.vue'
import Login from '../components/auth/login.vue'
import Signup from '../components/auth/signup.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  }
]