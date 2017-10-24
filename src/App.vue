<template>
  <div id="app">
    <div class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <div class="columns level">
          <div class="column is-2 level-left">
            <div class="title has-text-centered">
              <router-link to="/">WARIT</router-link>
            </div>
          </div>
          <div class="column is-8 level-right columns is-hidden-mobile">
            <div class="level-item column has-text-centered"><router-link to="/search">검색</router-link></div>
            <div class="level-item column has-text-centered"><router-link to="/ranking">랭킹</router-link></div>
            <div class="level-item column has-text-centered"><router-link to="/like">즐겨찾기</router-link></div>
            <div class="level-item column has-text-centered"><router-link to="/myinfo">정보</router-link></div>  
          </div>
          </div>
        </div>
        </div>
    </div>
    <router-view class="container router-view"></router-view>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'app',
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
