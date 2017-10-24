<template>
  <div id="app">
    <nav-bar></nav-bar>
    </p>
    <router-view></router-view>
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
      this.tokenAuth()
      this.updateLocation()
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
        'TOKEN_AUTH',
        'UPDATE_LOCATION',
        'SET_LOCATION'
      ]),
      updateLocation() {
        this.UPDATE_LOCATION()
          .then((CurLatLng) => {
            // this.SET_LOCATION(CurLatLng)
          })
      },
      tokenAuth() {
        this.email = null
        this.getInfo
        .then((info) => {
          this.TOKEN_AUTH(info.token)
          .then((res) => {
            this.email = res.email
          })
          .catch(() => {
            this.$router.push({
              path: '/sign'
            })
          })
        this.$cookie.delete('email')
        })
        .catch(() => {
          this.TOKEN_AUTH(this.$cookie.get('token'))
            .then((res) => {
              this.email = res.email
            })
            .catch((err) => {
              this.$router.push({
                path: '/sign'
              })
            })
          this.$cookie.delete('email')
        })
      
      },
    }
  }
</script>

<style src="./assets/css/app.scss" lang="scss">
  
</style>
