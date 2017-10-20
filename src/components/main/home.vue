<template>
  <div id="home">
    <button @click="updateLocation">현재위치</button>    
    키워드<input type="text" v-model="keyword">    
    <button @click="keywordSearch(keyword)">keywordsearch</button>
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
        map: null,
        markers: [],
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
      this.UPDATE_LOCATION()
      .then((CurLatLng) => {
        this.CurLatLng = CurLatLng
        this.LatLng = this.getLatLng
        this.updateMap()
        this.categorySearch()
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
        'FOOD_LIST'
      ]),
      updateLocation() {
      this.UPDATE_LOCATION()
        .then((CurLatLng) => {
          this.CurLatLng = CurLatLng
          const center = new daum.maps.LatLng(this.CurLatLng.lat, this.CurLatLng.lng)
          this.map.panTo(center)                            
        })
        .catch((err) => {
          console.log(err)
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
      moveCenter() {
        const center = new daum.maps.LatLng(this.LatLng.lat, this.LatLng.lng)
        this.map.setLevel(2) // 지도 레벨 변경
        this.map.panTo(center) // 자도 중심으로 부드럽게 이동
      },
      keywordSearch(keyword) {
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
                console.log(this.map.getCenter())
                const LatLng = {
                  lat : this.map.getCenter().getLat(),
                  lng : this.map.getCenter().getLng()
                }
                this.SET_LOCATION(LatLng)
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

<style scoped>
  #map {
    width: 500px;
    height: 400px;
  }
</style>

