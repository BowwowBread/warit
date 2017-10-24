<template>
  <div id="myinfo">
    
    <button @click="logout">logout</button>
    <button @click="unregister_user">unregister</button>    
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'myinfo',
    data() {
      return {
        email: null
      } 
    },
    created() {

    },
    watch: {

    },
    computed: {
      ...mapGetters([
        'getInfo',
      ])
    },
    methods: {
      ...mapActions([
        'LOAOUT_AUTH',
        'UNREGISTER',
      ]),
      logout() {
        Kakao.Auth.logout()        
        this.LOAOUT_AUTH()
          .then((res) => {
            this.$cookie.delete('email')
            this.$cookie.delete('token')
            this.$router.push({
              path: '/sign'
            })
          })
      },
      unregister_user() {
        Kakao.Auth.logout()        
        this.UNREGISTER(email)
          .then((res) => {
            this.$cookie.delete('email')
            this.$cookie.delete('token')
            this.$router.push({
              path: '/sign'
            })
          })
      }
    }
  }
</script>