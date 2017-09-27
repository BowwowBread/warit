<template>
  <div id="login">
    <div class="3rd_auth">
      <button @click="auth_login('kakao')">kakao</button>
      <button @click="auth_login('facebook')">facebook</button>
      <button @click="auth_login('google')">google</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    auth_login(auth) {
      const baseURI = 'http://localhost:3001/api';
      this.$cookie.set('sign', 'signup');
      location.href=`${baseURI}/auth/${auth}`
    }
  }
}
</script>
