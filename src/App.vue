<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div v-if="email == null" class="sign">
    </div>
    <div v-else>
      <button @click="logout">logout</button>
    </div>
    </p>
    <router-view :latlng="LatLng"></router-view>
    {{email}}
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import menu from './components/shared/menu.vue'
  export default {
    name: 'app',
    components: {
      navBar: menu,
    },
    data() {
      return {
        email: null,
        LatLng: {
          lat: 0,
          lng: 0,
        }
      }
    },
    created() {
      this.tokenAuth();
      this.updateLocation();
    },
    watch: {
      '$route' : [
        'tokenAuth',
      ]
    },
    computed: {
      ...mapGetters([
        'getInfo',
        'getLatLng'
      ])
    },
    methods: {
      ...mapActions([
        'tokenauth',
        'logoutAuth',
        'updatelocation'
      ]),
      updateLocation() {
        this.updatelocation()
          .then((res) => {
            this.LatLng = this.getLatLng
          })
          .catch((err) => {
            console.log(err)
          })
      },
      tokenAuth() {
        const token = this.$cookie.get('token');
        this.tokenauth(token)
          .then((res) => {
            this.email = this.getInfo.email;
          })
          .catch((err) => {
            console.log(err);
            this.$cookie.delete('email')
            this.$cookie.delete('token')
            this.$router.push({
              path: '/sign'
            });
          })
      },
      logout() {
        this.logoutAuth()
          .then((res) => {
            this.email = this.getEmail;
            this.$cookie.delete('email')
            this.$cookie.delete('token')
            this.$router.push({
              path: '/sign'
            });
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }
</script>

<style src="./assets/css/app.scss" lang="scss">
  
</style>
