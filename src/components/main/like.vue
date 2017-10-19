<template>
  <div id="search">
    키워드<input type="text" v-model="keyword">    
    <button @click="keywordSearch(keyword)">keywordsearch</button>
    <button @click="sort('asc', index)">오름차순</button>
    <button @click="sort('desc', index)">내림차순</button>
    <ul>
      <li v-for="(food, index) in foodList" v-bind:key="food.id">
        <span>{{food.place_name}}</span>
        <!-- <span>{{food.category_name}}</span> -->
        <!-- <span>{{food.distance}}</span> -->
        <!-- <span>{{food.address}}</span> -->
        <span>{{food.like}}</span>
        <span>{{food.likeCount}}</span>
        <span>{{food.hate}}</span>
        
        <button v-if="!food.like" @click="toggle('like', food, index)">like</button>
        <button v-else @click="toggle('unlike', food, index)">unlike</button>
        <button v-if="!food.hate" @click="toggle('hate', food, index)">hate</button>        
        <button v-else @click="toggle('unhate', food, index)">unhate</button>        
        
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
    const LatLng = this.getLatLng
    if(LatLng.lat == 0) {
      this.$router.push({
        path: '/'
      })
    }
    let foodList = []            
    const callback = (result, status, pagination) => {
        if (status === daum.maps.services.Status.OK) {
          foodList.push(result)
          if (pagination.hasNextPage) {
            pagination.nextPage()
          } else {
          this.FOOD_LIST(foodList)
            .then(() => {
                this.fetchFoods()
                .then(() => {
                  this.foodList = this.getLikeFoodList
                })
            })         
          }
        } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            console.log('검색 결과가 존재하지 않습니다.')
            return
        } else if (status === daum.maps.services.Status.ERROR) {
            console.log('검색 결과 중 오류가 발생했습니다.')
            return
        }
      }
      this.CATEGORY_SEARCH(callback)
  },
  computed: {
    ...mapGetters([
      'getFoodLists',
      'getLikeFoodList',
      'getLatLng'
    ]),
  },
  methods: {
    ...mapActions([
      'CATEGORY_SEARCH',
      'KEYWORD_SEARCH',
      'FOOD_LIST',
      'LIKE',
      'UNLIKE',
      'HATE',
      'UNHATE',
      'fetchFoods'
    ]),
    toggle(type, food, index) {
      if(type == "unlike") {
        this.UNLIKE(food.id)
        .then(() => {
          this.fetchFoods()
          .then(() => {
            this.foodList = this.getLikeFoodList
          })
        })
      } else if (type == "hate") {
        this.HATE(food.id)
      } else if (type == "unhate") {
        this.UNHATE(food.id)
      }
    },
    sort(type, index) {
      if(type == "asc") {
        return this.foodList.sort((a, b) => {
          return a.place_name - b.place_name ? -1 : a.place_name > b.place_name ? 1 : 0
        })
      } else if (type == "desc") {
        return this.foodList.sort((a, b) => {
          return a.place_name - b.place_name ? -1 : a.place_name < b.place_name ? 1 : 0
        })
      }
    },
    keywordSearch(keyword) {
      let foodList = []      
      const callback = (result, status, pagination) => {
          if (status === daum.maps.services.Status.OK) {
            foodList.push(result)
            if (pagination.hasNextPage) {
              pagination.nextPage()
            } else {
            this.FOOD_LIST(foodList)
              .then((res) => {
                this.foodList = this.getFoodList("asc")
              })
              .catch((err) => {
                console.log(err)
              })
            }

          } else if (status === daum.maps.services.Status.ZERO_RESULT) {
              console.log('검색 결과가 존재하지 않습니다.')
              return
          } else if (status === daum.maps.services.Status.ERROR) {
              console.log('검색 결과 중 오류가 발생했습니다.')
              return
          }
        }
        this.KEYWORD_SEARCH({
          callback,
          keyword,
          global: false
        })
    }
  }
}
</script>
