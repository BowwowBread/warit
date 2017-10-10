<template>
  <div id="search">
    키워드<input type="text" v-model="keyword">    
    <button @click="keywordSearch(keyword)">keywordsearch</button>
    <ul>
      <li v-for="food in foodList" v-bind:key="food.id">
        <span>{{food.place_name}}</span>
        <span>{{food.category_name}}</span>
        <span>{{food.distance}}</span>
        <span>{{food.id}}</span>
        <span>{{food.x}}</span>
        <span>{{food.y}}</span>
        <span>{{food.address}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
export default {
  name: 'search',
  data() {
    return {
      keyword: "",
      foodList: [],
    }
  },
  created() {

  },
  computed: {
    ...mapGetters([
      'getFoodList(sort)'
    ]),
  },
  methods: {
    ...mapActions([
      'KEYWORD_SEARCH',
      'FOOD_LIST'
    ]),
    keywordSearch(keyword) {
      const callback = (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            this.FOOD_LIST(result)
              .then((res) => {
                this.foodList = this.getFoodList("asc");
              })
              .catch((err) => {

              })
          } else if (status === daum.maps.services.Status.ZERO_RESULT) {
              console.log('검색 결과가 존재하지 않습니다.');
              return;
          } else if (status === daum.maps.services.Status.ERROR) {
              console.log('검색 결과 중 오류가 발생했습니다.');
              return;
          }
        }
        this.KEYWORD_SEARCH({
          callback,
          keyword,
          global: false
        });
    }
  }
}
</script>
