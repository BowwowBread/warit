<template>
  <div id="sign">
    <div class="3rd_auth">
      <button @click="auth_sign('kakao')">kakao</button>
      <button @click="auth_sign('facebook')">facebook</button>
      <button @click="auth_sign('google')">google</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign',
  data () {
    return {
    }
  },
  methods: {
    auth_sign(auth) {
      const baseURI = 'http://localhost:3001/api';
      location.href=`${baseURI}/auth/${auth}`
    }
  }
}
</script>
