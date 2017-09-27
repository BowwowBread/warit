<template>
  <div id="app">
    <p>
    <router-link to="/login">login</router-link>
    <router-link to="/signup">signup</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>
