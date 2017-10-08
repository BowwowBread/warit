<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div v-if="email == null"class="sign">
    </div>
    <div v-else>
    <button @click="logout">logout</button>
    </div>
    </p>
    <router-view></router-view>
    {{email}}    
  </div>
</template>

<script>
import menu from './components/shared/menu.vue';
export default {
  name: 'app',
  components: {
    navBar: menu,
  },
  data () {
    return {
      email: null,
    }
  },
  beforeCreate() {
    this.$http.defaults.baseURL = "http://localhost:3001/api"
  },
  created() {
<<<<<<< HEAD
    const token = this.$cookie.get('token');
    this.$http.defaults.headers.common.Authorization = token;
    this.$http.get(`/myinfo`)
    .then((res) => {
      this.$cookie.set('email', res.data.email);
      this.email = this.$cookie.get('email');
    })
    .catch((err) => {
      this.$router.push({ path : '/sign'});
    })
  },
  updated() {
    const token = this.$cookie.get('token');
    this.$http.defaults.headers.common.Authorization = token;
    this.$http.get(`/myinfo`)
    .then((res) => {
      this.$cookie.set('email', res.data.email);
      this.email = this.$cookie.get('email');
    })
    .catch((err) => {
      this.$router.push({ path : '/sign'});
    })
=======
    const email = this.$cookie.get('email');
    //해당 이메일의 유저 정보 체크
    this.$http.get(`/users/search/${email}`)
      .then((res) =>  {
        if(res.data._id) {
          this.email = email;
        } else {
          this.$cookie.delete('email');
        }
      })
      .catch(() => {
        this.$cookie.delete('email');
      })
>>>>>>> 88fec8cb233b369d91e1f5c72cc5473d0ba684dc
  },
  methods: {
    logout() {
      this.$http.get('/auth/logout')
      .then((res) => {
        this.$cookie.delete('email');
        this.$cookie.delete('token');
        this.email = null;
<<<<<<< HEAD
        this.$router.push({ path : '/sign'});
=======
        console.log(res);
>>>>>>> 88fec8cb233b369d91e1f5c72cc5473d0ba684dc
      })
    }
  }
}
</script>
<style src="./assets/css/app.scss" lang="scss">
</style>
