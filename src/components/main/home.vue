<template>
  <div id="home">
    <button @click="updateLocation">현재위치</button>    
    키워드<input type="text" v-model="keyword">    
    <button @click="keywordSearch(keyword)">keywordsearch</button>
    <button @click="categorySearch">categorysearch</button>
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
        keyword: "",
      }
    },
    created() {
      this.updateLocation()
    },
    computed: {
        ...mapGetters([
        'getLatLng',
        'getFoodLists'
      ]),
    },
    watch: {
      LatLng(newVal, oldVal) {
        if(newVal.lat == oldVal.lat && newVal.lng == oldVal.lng) {
          this.moveCenter()                        
        } else {
          this.updateMap()
          this.categorySearch()
        }
      }
    },
    methods: {
      ...mapActions([
        'UPDATE_LOCATION',
        'CATEGORY_SEARCH',
        'KEYWORD_SEARCH',
        'FOOD_LIST'
      ]),
      updateLocation() {
        this.UPDATE_LOCATION()
          .then((res) => {
            this.LatLng = this.getLatLng
            console.log(this.LatLng)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      updateMap() {
          const container = document.getElementById('map')
          const options = {
            center: new daum.maps.LatLng(this.LatLng.lat, this.LatLng.lng), // 중심 좌표
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
        this.clearMarker()

        const callback = (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            const bounds = new daum.maps.LatLngBounds()            
            result.forEach((data) => {
              this.displayMarker(data)
              bounds.extend(new daum.maps.LatLng(data.y, data.x))
            }) 
            this.map.setBounds(bounds)
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
          global: true
        })
      },
      categorySearch() {
        this.clearMarker()
        let foodList = []      
        const callback = (result, status, pagination) => {
          if (status === daum.maps.services.Status.OK) {
            foodList.push(result)
            if (pagination.hasNextPage) {
              pagination.nextPage()
            } else {
            this.FOOD_LIST(foodList)
              .then((res) => {
                const bounds = new daum.maps.LatLngBounds()                        
                foodList = this.getFoodLists
                foodList.forEach((foodData) => {
                  foodData.forEach((food) => {
                    this.displayMarker(food)
                    bounds.extend(new daum.maps.LatLng(food.y, food.x))
                  })
                })
                this.map.setBounds(bounds)
              })
              .catch((err) => {
                console.log(err)
              })
            }
          }
        }
        // const callback = (result, status) => {
        //   if (status === daum.maps.services.Status.OK) {
        //     const bounds = new daum.maps.LatLngBounds()            
        //     result.forEach((data) => {
        //       this.displayMarker(data)
        //       bounds.extend(new daum.maps.LatLng(data.y, data.x))
        //     }) 
        //     this.map.setBounds(bounds)
        //   } else if (status === daum.maps.services.Status.ZERO_RESULT) {
        //       console.log('검색 결과가 존재하지 않습니다.')
        //       return
        //   } else if (status === daum.maps.services.Status.ERROR) {
        //       console.log('검색 결과 중 오류가 발생했습니다.')
        //       return
        //   }
        // }
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

