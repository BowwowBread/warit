<template>
  <div id="navbar">
    <div class="hero is-danger">
      <nav class="navbar container is-danger">  
        <div class="navbar-brand">
              <router-link to="/" class="navbar-item logo">WARIT</router-link>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
              <router-link to="/search" class="navbar-item">검색</router-link>
              <router-link to="/ranking" class="navbar-item">랭킹</router-link>
              <router-link to="/like" class="navbar-item">즐겨찾기</router-link>
              <router-link to="/myinfo" class="navbar-item">내 정보</router-link>      
            </div>
        </div>
    </nav>
    </div>
    <div class="menu-burger is-block-mobile is-hidden-tablet">
      <button class="button is-danger" @click="toggleMenu">
      <b-icon icon="menu" size="is-medium"></b-icon>
      </button>
    </div>  
    <div class="hero is-danger is-block-mobile-only is-hidden-tablet" v-if="showMenu">
      <nav class="navbar is-danger">  
        <div class="navbar-brand ">
          <router-link to="/search" class="column navbar-item">검색</router-link>
          <router-link to="/ranking" class="column navbar-item">랭킹</router-link>
          <router-link to="/like" class="column navbar-item">즐겨찾기</router-link>
          <router-link to="/myinfo" class="column navbar-item">내 정보</router-link>   
        </div>
    </nav>
    </div>
    <div class="hero is-danger is-block-tablet-only is-hidden-mobile is-hidden-desktop">
      <nav class="navbar is-danger">  
        <div class="navbar-brand ">
          <router-link to="/search" class="column navbar-item">검색</router-link>
          <router-link to="/ranking" class="column navbar-item">랭킹</router-link>
          <router-link to="/like" class="column navbar-item">즐겨찾기</router-link>
          <router-link to="/myinfo" class="column navbar-item">내 정보</router-link>   
        </div>
    </nav>
    </div>
  </div>
</template>
<script>  
  export default {
    name: 'navbar',
    data() {
      return {
        showMenu: false
      }
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu
      }
    }
  }
  
</script>
<style src="../../assets/css/navbar.scss" scoped>

</style>

