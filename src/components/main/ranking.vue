<template>
  <div id="ranking">
    검색 <input v-on:input="searching" v-bind:value="search">
    <button @click="sort('asc', index)">오름차순</button>
    <button @click="sort('desc', index)">내림차순</button>
    <ul>
      <li v-for="(food, index) in foodLists" v-bind:key="food.id">
        <span>{{food.place_name}}</span>
        <!-- <span>{{food.category_name}}</span> -->
        <span>{{food.distance}}</span>
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
  name: 'ranking',
  data() {
    return {
      search: "",
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
    this.fetchFoods()
    .then(() => {
      this.foodList = this.getFoodLists.filter((food, i) => {
        return i < 10
      })
    })  
  },
  computed: {
   foodLists() {
      return  this.foodList.filter((food) =>{
        return food.place_name.toLowerCase().indexOf(this.search.toLowerCase())>=0;
      })
    },
    ...mapGetters([
      'getFoodLists',
      'getLatLng'
    ]),
  },
  methods: {
    ...mapActions([
      'LIKE',
      'UNLIKE',
      'HATE',
      'UNHATE',
      'fetchFoods'
    ]),
    searching(search) {
      this.search = search.target.value
    },
    toggle(type, food, index) {
      if (type == "like") {
        console.log('like')        
        this.LIKE(food.id)
        while (1) {
          if (index == 0) {
            return
          }
          if (food.likeCount + 1 > this.foodLists[index - 1].likeCount) {
            let tmp = this.foodLists[index - 1]
            this.foodLists[index - 1] = food
            this.foodLists[index] = tmp
          } else if(food.likeCount + 1 == this.foodLists[index - 1].likeCount) {
            return
          }
          index--          
        }
      } else if(type == "unlike") {
        console.log('unlike')
        this.UNLIKE(food.id)
        while (1) {
          if (index == this.foodLists.length - 1) {
            return
          }
          if (food.likeCount - 1 < this.foodLists[index + 1].likeCount || food.distance > this.foodList[index].distance) {
            let tmp = this.foodLists[index + 1]
            this.foodLists[index + 1] = food
            this.foodLists[index] = tmp
          } 
          if(food.distance <= this.foodLists[index + 2].distance) {
            return
          }
          index++          
        }
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
  }
}
</script>
