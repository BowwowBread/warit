import Login from '../components/auth/login.vue'
import Signup from '../components/auth/signup.vue'

export default [
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