<template>
  <div id="myinfo">
    <div class="card">  
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="userInfo.profile_image" alt="profile_image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4 is-size-5-mobile has-text-right">{{userInfo.username}}</p>
            <b-taglist class="tags is-hidden-mobile" attached>
              <b-tag size="is-medium":class="{'is-warning': userInfo.auth_provider == 'kakao', 'is-info': userInfo.auth_provider == 'facebook', 'default': userInfo.auth_provider == 'google'}">{{userInfo.auth_provider}}</b-tag>
              <b-tag  type="is-dark" size="is-medium"> {{userInfo.email}}</b-tag>
            </b-taglist>
            <b-taglist class="tags is-block-mobile is-hidden-tablet" attached>
              <b-tag size="is-small":class="{'is-warning': userInfo.auth_provider == 'kakao', 'is-info': userInfo.auth_provider == 'facebook', 'default': userInfo.auth_provider == 'google'}">{{userInfo.auth_provider}}</b-tag>
              <b-tag  type="is-dark" size="is-small"> {{userInfo.email}}</b-tag>
          </b-taglist>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button class="button card-footer-item is-outlined" :class="{'is-warning': userInfo.auth_provider == 'kakao', 'is-info': userInfo.auth_provider == 'facebook', 'default': userInfo.auth_provider == 'google'}" @click="logout">로그아웃</button>
        <button class="button card-footer-item is-outlined" :class="{'is-warning': userInfo.auth_provider == 'kakao', 'is-info': userInfo.auth_provider == 'facebook', 'default': userInfo.auth_provider == 'google'}" @click="unregister_user">회원탈퇴</button>
      </footer>
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
        userInfo: {
          profile_image: "profile_image",
          username: "username",
          email: "email",
          auth_provider: "default"
        },
      }
    },
    created() {
      this.getInfo
        .then((userInfo) => {
          this.userInfo = userInfo
        })
        .catch(() => {
          this.$router.push({
            path: '/'
          })
        })
    },
    watch: {
      
    },
    computed: {
      ...mapGetters([
        'getInfo',
      ]),
    },
    methods: {
      ...mapActions([
        'LOAOUT_AUTH',
        'UNREGISTER',
      ]),
      logout() {
        this.$dialog.confirm({
          title: '로그아웃',
          message: '로그아웃 하시겠습니까?',
          cancelText: '아니요',
          confirmText: '네',
          type: 'is-warning',
          hasIcon: true,
          onConfirm: () => {
            this.LOAOUT_AUTH()
              .then((res) => {
                Kakao.Auth.logout()                
                this.$cookie.delete('email')
                this.$cookie.delete('token')
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
                    Kakao.Auth.logout()                    
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