<template>
  <div id="ranking">
<b-field @keydown.native.enter="keywordSearch(keyword)">
        <b-input v-if="!searchLoading" v-on:input.native="searching" v-model="search" placeholder="음식점 검색" type="search" icon="search"></b-input>
        <b-input v-else v-on:input.native="searching" v-model="search" placeholder="검색중..." searchLoading type="search" icon="search"></b-input>        
      </b-field>

              <hr>        
        <b-table
        :data="foodLists"
        backend-sorting
        @sort="onSort"        
        >
            <template scope="props">
                <b-table-column field="place_name" label="음식점명" sortable>
                    {{ props.row.place_name }}
                </b-table-column>
                <b-table-column  label="카테고리">
                    {{ props.row.category_name }}
                </b-table-column>
                <b-table-column label="주소">
                    {{ props.row.address }}
                </b-table-column>
                <b-table-column field="likeCount" label="좋아요 수" sortable centered>
                    {{ props.row.likeCount }}
                </b-table-column>
                <b-table-column field="like" label="좋아요">
                    <button class="button is-warning" v-if="!props.row.like" @click="toggle('like', props.row)">O</button>
                    <button class="button is-success"v-else @click="toggle('unlike', props.row)">X</button>
                </b-table-column>
                <b-table-column field="hate" label="싫어요">
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
                        <p>검색결과가 없습니다.</p>
                    </div>
                </section>
            </template>
        </b-table>
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
      foodList: [],
      isEmpty: false,
      isLoading: true,
      searchLoading: false,
      hasMobileCards: true,
      searchTotal: 0,
      defaultSortDirection: 'asc',
      perPage: 10,
      sortField: 'likeCount',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      page: 1,
      order: 'is-centered',
      size: 'is-medium',
      isSimple: false,
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
