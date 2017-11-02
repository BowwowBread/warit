<template>
  <div id="search">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <div class="columns ">
      <div class="column ">
      <b-field>
        <b-input v-if="!searchLoading" v-on:input.native="searching" v-model="search" placeholder="음식점 검색" type="search" icon="search"></b-input>
        <b-input v-else v-on:input.native="searching" v-model="search" placeholder="검색중..." searchLoading type="search" icon="search"></b-input>      
      </b-field>
      </div>
      <div class="column is-2 is-hidden-mobile">
      <button class="button is-danger randomButton" @click="getRandomFood">아몰랑</button>  
      </div>
      <button class="button is-danger randomButton is-block-mobile is-hidden-tablet" @click="getRandomFood">아몰랑</button>
      </div>
        <b-pagination
            :total="total"
            :per-page="perPage"
            :current.sync="page"
            :order="order"
            :size="size"
            :simple="isSimple"
            @change="onPageChange"
            >
        </b-pagination>
              <hr>        
        <b-table
        :data="isEmpty ? [] : foodLists"
        backend-sorting
        @sort="onSort"        
        >
            <template scope="props">
                <b-table-column field="place_name" label="음식점명" sortable width="200">
                    {{ props.row.place_name }}
                </b-table-column>
                <b-table-column  label="카테고리" width="400">
                    {{ props.row.category_name }}
                </b-table-column>
                <b-table-column label="주소" width="300">
                    {{ props.row.address }}
                </b-table-column>
                <b-table-column field="likeCount" label="좋아요 수" sortable centered width="150">
                    {{ props.row.likeCount }}
                </b-table-column>
                <b-table-column field="like" label="좋아요" width="100" centered>
                    <button class="button is-warning" v-if="!props.row.like" @click="toggle('like', props.row)">
                      <b-icon
                        icon="favorite_border"
                        size="is-medium">
                      </b-icon>
                    </button>
                    <button class="button is-warning"v-else @click="toggle('unlike', props.row)">
                      <b-icon
                        icon="favorite"
                        size="is-medium">
                      </b-icon>
                    </button>
                </b-table-column>
                <b-table-column field="hate" label="싫어요" width="100" centered>
                    <button class="button is-warning"v-if="!props.row.hate" @click="toggle('hate', props.row)">
                        <b-icon
                          icon="remove_circle_outline"
                          size="is-medium">
                        </b-icon>
                      </button>        
                    <button class="button is-warning" v-else @click="toggle('unhate', props.row)">
                        <b-icon
                          icon="remove_circle"
                          size="is-medium">
                        </b-icon>
                      </button>  
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
  name: 'search',
  data() {
    return {
      search: '',
      foodList: [],
      isEmpty: null,
      isLoading: true,
      searchLoading: false,
      hasMobileCards: true,
      searchTotal: 0,
      defaultSortDirection: 'asc',
      perPage: 10,
      sortField: 'likeCount',
      sortOrder: 'asc',
      defaultSortOrder: 'asc',
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
    this.fetchFoodList()
  },
  computed: {
    foodLists() {
      this.searchTotal = 0
      return this.foodList.filter((food, i, array) => {
        if(food.place_name.toLowerCase().indexOf(this.search.toLowerCase())>=0) {
          this.searchTotal += 1
          return food
        } else {
          this.searchTotal = 1
        }
      }).filter((food, i) => {
        return (this.page - 1) * this.perPage <= i && i < (this.page) * this.perPage
      })
    },
    total() {
      if(this.searchTotal != 0) {
        return this.searchTotal
      } else {
        return this.foodList.length
      }
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
      'fetchFoods',
      'addToast',
      'closeToast',
    ]),
       getRandomFood() {
      let randomFoods = this.foodList.filter((food) => {
        return !food.hate
      })
      let randomFood = randomFoods[Math.floor(Math.random()*randomFoods.length)]
      if(randomFood != undefined) {
        this.$dialog.alert({
          title: '아몰랑',
          message: 
          `  <div data-v-48c898da="" class="b-table">
      <div class="table-wrapper">
        <table class="table has-mobile-cards">
          <thead>
            <tr>
              <th style="width: 200px;">
                <div class="th-wrap">음식점명
                  <span class="icon is-small" style="display: none;">
                    <i class="mdi">arrow_upward</i>
                  </span>
                </div>
              </th>
              <th class="" style="width: 400px;">
                <div class="th-wrap">카테고리
                  <span class="icon is-small" style="display: none;">
                    <i class="mdi">arrow_upward</i>
                  </span>
                </div>
              </th>
              <th class="" style="width: 300px;">
                <div class="th-wrap">주소
                  <span class="icon is-small" style="display: none;">
                    <i class="mdi">arrow_upward</i>
                  </span>
                </div>
              </th>
              <th style="width: 150px;">
                <div class="th-wrap is-centered">좋아요 수
                  <span class="icon is-small" style="display: none;">
                    <i class="mdi">arrow_upward</i>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="">
              <td data-v-48c898da="" data-label="음식점명" class="">
                <span>
                  ${randomFood.place_name}
                </span>
              </td>
              <td data-v-48c898da="" data-label="카테고리" class="">
                <span>
                  ${randomFood.category_name}
                </span>
              </td>
              <td data-v-48c898da="" data-label="주소" class="">
                <span>
                  ${randomFood.address}
                </span>
              </td>
              <td data-v-48c898da="" data-label="좋아요 수" class="has-text-centered">
                <span>
                  ${randomFood.likeCount}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`,
          confirmText: '닫기',
        })
      } else {
        this.$dialog.alert({
          title: '아몰랑',
          message: '검색결과가 존재하지 않습니다',
          confirmText: '닫기',
        })
      }
    },
    fetchFoodList() {
      this.isLoading = true
      this.fetchFoods()
      .then(() => {
      this.foodList = this.getFoodLists
      if(this.sortField == "place_name") {
        this.foodList = this.foodList.sort((a, b) => {
          if(this.sortOrder == "asc") {
            return a.place_name > b.place_name ? 1 : a.place_name < b.place_name ? -1 : 0
          } else if(this.sortOrder == "desc") {
            return a.place_name < b.place_name ? 1 : a.place_name > b.place_name ? -1 : 0
          }
        })
      } else if(this.sortField == "likeCount") {
        this.foodList = this.foodList.sort((a, b) => {
          return a.place_name > b.place_name ? 1 : a.place_name < b.place_name ? -1 : 0
        }).sort((a, b) => {
          if(this.sortOrder == "asc") {
              return a.likeCount < b.likeCount ? 1 : -1
          } else if(this.sortOrder == "desc") {
              return a.likeCount > b.likeCount ? 1 : -1    
          }
        })
      }
      this.isLoading = false      
    })
    .catch(() => {
      this.isLoading = false      
    })
    },
    onPageChange(page) {
      this.page = page
      this.fetchFoodList()
    },
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.fetchFoodList()
    },
    searching(search) {
      this.search = search.target.value
    },
    toggle(type, food) {
      this.closeToast()
      if (type == "like") {
        this.LIKE(food.id)
        this.addToast(this.$snackbar.open({
          message: `${food.place_name} 음식점 좋아요`,
          duration: 1000,          
          type: 'is-success',
          position: 'is-bottom-right',
          actionText: '취소하기',
          onAction: () => {
              this.UNLIKE(food.id)
          }
        }))
      } else if(type == "unlike") {
        this.UNLIKE(food.id)
        this.addToast(this.$snackbar.open({
          message: `${food.place_name} 음식점 좋아요 취소`,
          duration: 1000,          
          type: 'is-warning',
          position: 'is-bottom-right',
          actionText: '취소하기',
          onAction: () => {
              this.LIKE(food.id)
          }
        }))
      } else if (type == "hate") {
        this.HATE(food.id)
        this.addToast(this.$snackbar.open({
          message: `${food.place_name} 음식점 싫어요`,
          duration: 1000,          
          type: 'is-success',
          position: 'is-bottom-right',
          actionText: '취소하기',
          onAction: () => {
              this.UNHATE(food.id)
          }
        }))
      } else if (type == "unhate") {
        this.UNHATE(food.id)
        this.addToast(this.$snackbar.open({
          message: `${food.place_name} 음식점 싫어요 취소`,
          duration: 1000,
          type: 'is-warning',
          position: 'is-bottom-right',
          actionText: '취소하기',
          onAction: () => {
              this.HATE(food.id)
          }
        }))
      }
    }
  }
}
</script>
<style src="../../assets/css/search.scss" scoped>

</style>


            