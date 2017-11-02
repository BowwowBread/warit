<template>
  <div id="sign">
    <div class="button-group">
      <button class="button is-warning" @click="auth_sign('kakao')">카카오로 이용하기</button>
      <button class="button is-info" @click="auth_sign('facebook')">페이스북으로 이용하기</button>
      <button class="button " @click="auth_sign('google')">구글로 이용하기</button>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
export default {
  name: 'sign',
  data () {
    return {
    }
  },
  created() {
    const token = this.$cookie.get('token')
    if(token != null) {
      this.$router.push({
        path: '/'
      })
    }
    const sign = this.$cookie.get('sign')
      if(sign == "error") {
        this.$toast.open({
            duration: 3000,
             message: `로그인에 실패하였습니다. 이미 등록된 계정입니다`,
            position: 'is-top',
            type: 'is-warning'
        })
      }
      this.$cookie.delete('sign')
  },
  methods: {
        ...mapActions([
      'addToast',
      'closeToast',
    ]),
    auth_sign(auth) {
      let baseURI = location.protocol + '//' + location.hostname + ':' + 3001 + '/api'
      location.href=`${baseURI}/auth/${auth}`
    }
  }
}
</script>
<style src="../../assets/css/sign.scss" scoped>