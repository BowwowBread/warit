<template>
  <div id="signup">
    <div class="3rd_auth">
      <button @click="auth_signup('kakao')">kakao</button>
      <button @click="auth_signup('facebook')">facebook</button>
      <button @click="auth_signup('google')">google</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      
    }
  },
  methods: {
    auth_signup(auth) {
      const baseURI = 'http://localhost:3001/api';
      this.$cookie.set('sign', 'signup');
      location.href=`${baseURI}/auth/${auth}`
    }
  }
}
</script>
