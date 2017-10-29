<template>
  <div id="myinfo">
    <div class="button-group">
      <button class="button is-warning" @click="logout">로그아웃</button>
      <button class="button is-danger" @click="unregister_user">회원탈퇴</button>
    </div>
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
        this.$dialog.confirm({
          title: '로그아웃',
          message: '로그이아웃 하시겠습니까?',
          cancelText: '아니요',
          confirmText: '네',
          type: 'is-warning',
          hasIcon: true,
          onConfirm: () => {
            this.LOAOUT_AUTH()
              .then((res) => {
                this.$cookie.delete('email')
                this.$cookie.delete('token')
                Kakao.Auth.logout()
                this.$router.push({
                  path: '/sign'
                })
              })
          }
        })
      },
      unregister_user() {
        this.$dialog.confirm({
          title: '회원탈퇴',
          message: '회원탈퇴를 하시겠습니까?',
          cancelText: '아니요',
          confirmText: '네',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.getInfo
              .then((info) => {
                this.UNREGISTER(info.email)
                  .then((res) => {
                    this.$cookie.delete('email')
                    this.$cookie.delete('token')
                    Kakao.Auth.logout()
                    this.$router.push({
                      path: '/sign'
                    })
                  })
              })
          }
        })
      }
    }
  }
</script>

<style src="../../assets/css/myinfo.scss" scoped>