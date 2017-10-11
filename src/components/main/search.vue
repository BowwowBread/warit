<template>
  <div id="search">
    키워드<input type="text" v-model="keyword">    
    <button @click="keywordSearch(keyword)">keywordsearch</button>
    <button @click="sort('asc', index)">오름차순</button>
    <button @click="sort('desc', index)">내림차순</button>
    <button @click="goPage(0)">1</button>
    <button @click="goPage(1)">2</button>
    <button @click="goPage(2)">3</button>
    
    <ul>
      <li v-for="food in foodList[index]" v-bind:key="food.id">
        <span>{{food.place_name}}</span>
        <span>{{food.category_name}}</span>
        <span>{{food.distance}}</span>
        <span>{{food.address}}</span>
        <span>{{food.like}}</span>
        <span>{{food.hate}}</span>
        
        <button @click="toggle('like')">like</button>
        <button @click="toggle('hate')">hate</button>        
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
      index: 0,
    }
  },
  created() {

  },
  computed: {
    ...mapGetters([
      'getFoodList'
    ]),
  },
  methods: {
    ...mapActions([
      'KEYWORD_SEARCH',
      'FOOD_LIST'
    ]),
    goPage(index) {
      this.index = index;
    },
    toggle(type) {
      if (type == "like") {

      } else if (type == "hate") {

      }
    },
    sort(type, index) {
      if (type == "asc") {
        return this.foodList[index].sort((a, b) => {
          return a.place_name > b.place_name ? -1 : a.place_name < b.place_name ? 1 : 0;
        })
      } else if (type == "desc") {
        return this.foodList[index].sort((a, b) => {
          return a.place_name < b.place_name ? -1 : a.place_name > b.place_name ? 1 : 0
        })
      }
    },
    keywordSearch(keyword) {
      let foodList = [];      
      const callback = (result, status, pagination) => {
          if (status === daum.maps.services.Status.OK) {
            foodList.push(result);
            if (pagination.hasNextPage) {
              pagination.nextPage();
            } else {
            this.FOOD_LIST(foodList)
              .then((res) => {
                this.foodList = this.getFoodList("desc");
              })
              .catch((err) => {

              })
            }

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
