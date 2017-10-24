<template>
  <div id="search">
      <b-table
            :data="isEmpty ? [] : foodLists"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :loading="isLoading"
            :mobile-cards="hasMobileCards">

            <template scope="props">
                <b-table-column label="음식점명">
                    {{ props.row.place_name }}
                </b-table-column>
                <b-table-column label="카테고리">
                    {{ props.row.category_name }}
                </b-table-column>
                <b-table-column label="주소">
                    {{ props.row.address }}
                </b-table-column>
                <b-table-column label="좋아요 수" centered>
                    {{ props.row.likeCount }}
                </b-table-column>
                <b-table-column label="좋아요">
                    <button class="button is-warning" v-if="!props.row.like" @click="toggle('like', props.row)">O</button>
                    <button class="button is-success"v-else @click="toggle('unlike', props.row)">X</button>
                </b-table-column>
                <b-table-column label="싫어요">
                    <button class="button is-warning"v-if="!props.row.hate" @click="toggle('hate', props.row)">O</button>        
                    <button class="button is-success" v-else @click="toggle('unhate', props.row)">X</button>  
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="sentiment_very_dissatisfied"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
    <!-- 검색 <input v-on:input="searching" v-bind:value="search">
    <button @click="sort('asc')">오름차순</button>
    <button @click="sort('desc')">내림차순</button>
    <ul>
      <li v-for="(food, index) in foodLists" v-bind:key="food.id">
        <span>{{food.place_name}}</span> -->
        <!-- <span>{{food.category_name}}</span> -->
        <!-- <span>{{food.distance}}</span> -->
        <!-- <span>{{food.address}}</span> -->
        <!-- <span>{{food.like}}</span>
        <span>{{food.likeCount}}</span>
        <span>{{food.hate}}</span>
        
        <button v-if="!food.like" @click="toggle('like', food, index)">like</button>
        <button v-else @click="toggle('unlike', food, index)">unlike</button>
        <button v-if="!food.hate" @click="toggle('hate', food, index)">hate</button>        
        <button v-else @click="toggle('unhate', food, index)">unhate</button>        
        
      </li>
    </ul> -->
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
      search: '',
      foodList: [],
      index: 0,
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isLoading: false,
      hasMobileCards: true
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
      this.foodList = this.getFoodLists
    })
  },
  computed: {
    foodLists() {
      function compare(a, b) {
        if (a.likeCount < b.likeCount)
          return 1
        if (a.likeCount > b.likeCount)
          return -1
        return 0
      }
      return this.foodList.filter((food) => {
        return food.place_name.toLowerCase().indexOf(this.search.toLowerCase())>=0        
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
    toggle(type, food) {
      if (type == "like") {
        this.LIKE(food.id)
      } else if(type == "unlike") {
        this.UNLIKE(food.id)
      } else if (type == "hate") {
        this.HATE(food.id)
      } else if (type == "unhate") {
        this.UNHATE(food.id)
      }
    },
    sort(type) {
      if(type == "asc") {
        this.foodList.sort((a, b) => {
          return a.place_name > b.place_name ? 1 : a.place_name < b.place_name ? -1 : 0
        })
      } else if (type == "desc") {
        this.foodList.sort((a, b) => {
          return a.place_name < b.place_name ? 1 : a.place_name > b.place_name ? -1 : 0
        })
      }
    },
  }
}
</script>
