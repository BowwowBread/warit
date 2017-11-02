<template>
  <div id="app">

    <nav-bar></nav-bar>
    <router-view class="container router-view"></router-view>
  </div>
</template>

<script>
  import navbar from './components/shared/navbar.vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'app',
    components: {
      navBar : navbar
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
        'closeToast'
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
        'SET_LOCATION',
        'closeToast'
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
          .catch((err) => {
            this.$cookie.delete('token')
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
              this.$cookie.delete('token')
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

<style src="./assets/css/app.scss" lang="scss"></style>

