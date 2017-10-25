<template>
  <div id="home">
    <b-loading :active.sync="isLoading" :canCancel="true"></b-loading>
    <div class="form">
      <div class="level">
        <div class="level-left">
    <button class="button is-primary" @click="updateLocation">현재위치</button>    
    </div>
    <div class="level-right">
      <b-field @keydown.native.enter="keywordSearch(keyword)">
        <b-input v-if="!loading"v-model="keyword" placeholder="지역 검색" type="search" icon="search"></b-input>
        <b-input v-else v-model="keyword" placeholder="검색중..." loading type="search" icon="search"></b-input>        
        <p class="control">
          <button class="button is-primary" @click="keywordSearch(keyword)" >검색</button>
        </p>
      </b-field>
    </div>
    </div>
    </div>
    <div id="map"></div>
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
        isLoading: false,
        map: null,
        markers: [],
        loading: false,
        LatLng: {
          lat: 0,
          lng: 0,
        },
        CurLatLng: {
          lat: 0,
          lng: 0,
        },
        keyword: "",
      }
    },
    created() {
      this.isLoading = true
      this.UPDATE_LOCATION()
      .then((CurLatLng) => {
        this.CurLatLng = CurLatLng
        this.LatLng = this.getLatLng
        this.updateMap()        
        if(this.CurLatLng.lat == this.LatLng.lat) {
        this.categorySearch()
        } else {
          const bounds = new daum.maps.LatLngBounds()                        
          const foodList = this.getFoodLists
          foodList.forEach((foodData) => {
            this.displayMarker(foodData)
            bounds.extend(new daum.maps.LatLng(foodData.y, foodData.x))
          })
          this.map.setBounds(bounds)
        }
       this.isLoading = false        
      })
    },
    computed: {
        ...mapGetters([
        'getLatLng',
        'getCurLatLng',
        'getFoodLists'
      ]),
    },
    methods: {
      ...mapActions([
        'UPDATE_LOCATION',
        'SET_LOCATION',
        'CATEGORY_SEARCH',
        'KEYWORD_SEARCH',
        'FOOD_LIST',
        'fetchFoods'
      ]),
      updateLocation() {
      this.UPDATE_LOCATION()
        .then((CurLatLng) => {
          this.CurLatLng = CurLatLng
          const center = new daum.maps.LatLng(this.CurLatLng.lat, this.CurLatLng.lng)
          this.map.setLevel(2)          
          this.map.panTo(center)                    
          console.log(this.map.getLevel())
        })
      },
      updateMap() {
          const container = document.getElementById('map')
          const options = {
            center: new daum.maps.LatLng(this.CurLatLng.lat, this.CurLatLng.lng), // 중심 좌표
            level: 3 // 확대 수준
          }
          this.map = new daum.maps.Map(container, options)
          this.map.setCopyrightPosition(daum.maps.CopyrightPosition.BOTTOMRIGHT, true) // copyright 위치 오른쪽으로

          const infowindow = new daum.maps.InfoWindow({
            zIndex: 1,
            content: '<div class="marker current">현재 위치</div>'
          })
          var marker = new daum.maps.Marker({
              map: this.map,
              position: options.center
          })

          infowindow.open(this.map, marker)
      },
      keywordSearch(keyword) {
        let foodList = []      
        this.loading = true        
        const callback = (result, status, pagination) => {
          if (status === daum.maps.services.Status.OK) {
            this.clearMarker()            
            foodList.push(result)
            if (pagination.hasNextPage) {
              pagination.nextPage()
            } else {
            this.FOOD_LIST(foodList)
              .then((res) => {
                const bounds = new daum.maps.LatLngBounds()                        
                foodList = this.getFoodLists
                foodList.forEach((foodData) => {
                    this.displayMarker(foodData)
                    bounds.extend(new daum.maps.LatLng(foodData.y, foodData.x))
                })
                this.map.setBounds(bounds)
                const LatLng = {
                  lat : this.map.getCenter().getLat(),
                  lng : this.map.getCenter().getLng()
                }
                this.SET_LOCATION(LatLng)
                this.loading = false
              })
              .catch((err) => {
                console.log(err)
                this.loading = false
              })
            }
          } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            console.log('검색 결과가 존재하지 않습니다.')
            this.loading = false
            return
          } else if (status === daum.maps.services.Status.ERROR) {
            console.log('검색 결과 중 오류가 발생했습니다.')
            this.loading = false            
            return
          } else {
            console.log('검색 결과 중 오류가 발생했습니다.')            
            this.loading = false
            return
          }
        }
        this.KEYWORD_SEARCH({
          callback,
          keyword,
          global: false
        })
      },
      categorySearch() {
        let foodList = []      
        const callback = (result, status, pagination) => {
          if (status === daum.maps.services.Status.OK) {
            this.clearMarker()            
            foodList.push(result)
            if (pagination.hasNextPage) {
              pagination.nextPage()
            } else {
            this.FOOD_LIST(foodList)
              .then((res) => {
                const bounds = new daum.maps.LatLngBounds()                        
                foodList = this.getFoodLists
                foodList.forEach((foodData) => {
                    this.displayMarker(foodData)
                    bounds.extend(new daum.maps.LatLng(foodData.y, foodData.x))
                })
                this.map.setBounds(bounds)
              })
              .catch((err) => {
                this.loading = false
                console.log(err)
              })
            }
          } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            console.log('검색 결과가 존재하지 않습니다.')
            this.loading = false
            return
          } else if (status === daum.maps.services.Status.ERROR) {
            console.log('검색 결과 중 오류가 발생했습니다.')
            this.loading = false            
            return
          }
        }
        this.CATEGORY_SEARCH(callback)
      },
      displayMarker(place) {
        const infowindow = new daum.maps.InfoWindow({
          zIndex: 1,
          content: '<div class="marker">' + place.place_name + ": " + place.category_name+ '</div>'
        })
        const marker = new daum.maps.Marker({
          map: this.map,
          position: new daum.maps.LatLng(place.y, place.x)
        })

        this.markers.push(marker)
  
        daum.maps.event.addListener(marker, 'click', () => {
          infowindow.open(this.map, marker)
        })
        daum.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(this.map, marker)
        })
        daum.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close(this.map, marker)
        })
        daum.maps.event.addListener(marker, 'dragstart', () => {
          infowindow.close(this.map, marker)
        })
      },
      clearMarker() {
        this.markers.forEach((marker) => {
          marker.setMap(null)
        })
        this.markers = []
      }
    },
  }
</script>

<style src="../../assets/css/home.scss" scoped>

