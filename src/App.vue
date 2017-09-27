<template>
  <div id="app">
    {{email}}
    <div v-if="email == null"class="sign">
    <router-link to="/login">login</router-link>
    <router-link to="/signup">signup</router-link>
    </div>
    <div v-else>
    <button @click="logout">logout</button>
    </div>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
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
  },
  methods: {
    logout() {
      this.$http.get('/auth/logout')
      .then((res) => {
        this.$cookie.delete('email');
        this.email = null;
        console.log(res);
      })
    }
  }
}
</script>
