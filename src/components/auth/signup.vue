<template>
  <div id="signup">
    <div class="login_form">
      ID <input type="text">
      PW <input type="password">
      email <input type="email">
      name <input type="text">
    </div>
    <div class="3rd_auth">
      <button @click="auth_kakao">kakao</button>
      <button @click="auth_facebook">facebook</button>
      <button @click="auth_google">google</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
    }
  }
}
</script>
