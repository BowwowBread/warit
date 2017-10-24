<template>
  <div id="menu">
    <div class="menu-container">
      <div class="logo">
        warit
      </div>
      <div class="top_menu">
        <ul>
          <li><router-link to="/">홈</router-link></li>
          <li><router-link to="/search">검색</router-link></li>
          <li><router-link to="/like">즐겨찾기</router-link></li>
          <li><router-link to="/ranking">랭킹</router-link></li>
          <li><router-link to="/myinfo">정보</router-link></li>  
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'menu',
  data() {
    return {

    }
  },
}
</script>
<style src="../../assets/css/menu.scss" lang="scss" scoped>

</style>
