<template>
  <div id="home">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <div class="form is-hidden-mobile">
      <div class="level">
        <div class="level-left">
          <button class="button is-primary is-outlined" @click="updateLocation">내 위치</button>    
          <button class="button is-primary is-outlined" @click="categorySearch">주변 검색하기</button>        
          </div>
        <div class="level-right">
          <b-field class="is-primary" @keydown.native.enter="keywordSearch(keyword)">
            <b-input  v-if="!loading"v-model="keyword" placeholder="키워드 검색 (500m 이내)" type="search" icon="search" style="margin-top: 0 !important"></b-input>
            <b-input v-else v-model="keyword" placeholder="검색중..." loading type="search" icon="search" style="margin-top: 0 !important"></b-input>        
            <p class="control" style="margin-top: 0 !important">
              <button v-if="!loading" class="button is-primary is-outlined" @click="keywordSearch(keyword)" >검색</button>
              <button v-else class="button is-primary is-outlined is-loading" @click="keywordSearch(keyword)" >검색중</button>
            </p>
          </b-field>
       </div>
      </div>
    </div>
    <div class="form is-inline-mobile is-hidden-tablet">
      <div class="columns is-multiline is-mobile">
        <div class="column is-half">
          <button style="width:100%" class="button is-primary is-outlined" @click="updateLocation">내 위치</button>    
        </div>
        <div class="column is-half">
          <button style="width:100%" class="button is-primary is-outlined" @click="categorySearch">주변 검색하기</button>        
        </div>
        <div class="column">
          <b-field class="is-primary" @keydown.native.enter="keywordSearch(keyword)">
            <b-input v-if="!loading"v-model="keyword" placeholder="키워드 검색 (500m 이내)" type="search" icon="search" style="margin-top: 0 !important; width:100%"></b-input>
            <b-input v-else v-model="keyword" placeholder="검색중..." loading type="search" icon="search" style="margin-top: 0 !important; width:100%"></b-input>        
            <p class="control" style="margin-top: 0 !important">
              <button v-if="!loading" class="button is-primary is-outlined" @click="keywordSearch(keyword)" >검색</button>
              <button v-else class="button is-primary is-outlined is-loading" @click="keywordSearch(keyword)" >검색중</button>
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
      const sign = this.$cookie.get('sign')
      const token = this.$cookie.get('token')
      if(token != null) {

      if(sign == "login") {
        this.$toast.open({
            duration: 2000,
            message: `로그인 성공!`,
            position: 'is-top',
            type: 'is-success'
        })
      } else if(sign == "signup") {
        this.$toast.open({
            duration: 2000,
            message: `회원가입 성공!`,
            position: 'is-top',
            type: 'is-success'
        })
      }
      this.$cookie.delete('sign')      
      this.isLoading = true
      this.addToast(this.$toast.open({
        duration: 3000,
        message: `내 위치를 검색중입니다`,
        position: 'is-bottom',
        type: 'is-black'
      }))
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
      .catch((err) => {
        this.addToast(this.$toast.open({
          duration: 3000,
          message: `위치 정보를 확인할 수 없습니다.`,
          position: 'is-bottom',
          type: 'is-warning'
        }))
        this.isLoading = false
      })
      }
    },
    computed: {
        ...mapGetters([
        'getLatLng',
        'getCurLatLng',
        'getFoodLists',
        'getToast'
      ]),
    },
    methods: {
      ...mapActions([
        'UPDATE_LOCATION',
        'SET_LOCATION',
        'CATEGORY_SEARCH',
        'KEYWORD_SEARCH',
        'FOOD_LIST',
        'fetchFoods',
        'addToast',
        'closeToast',
      ]),
      updateLocation() {
        this.closeToast()
        this.isLoading = true
        this.addToast(this.$toast.open({
          duration: 3000,
          message: `내 위치를 검색중입니다`,
          position: 'is-bottom',
          type: 'is-black'
        }))
        this.UPDATE_LOCATION()
          .then((CurLatLng) => {
            this.CurLatLng = CurLatLng
            const center = new daum.maps.LatLng(this.CurLatLng.lat, this.CurLatLng.lng)
            this.LatLng = CurLatLng
            this.map.setLevel(2)          
            this.map.panTo(center)             
            this.isLoading = false       
        })
      },
      moveCurLatLng() {
        const center = new daum.maps.LatLng(this.CurLatLng.lat, this.CurLatLng.lng)
        this.map.setLevel(2)          
        this.map.panTo(center)      
      },
      updateMap() {
          const container = document.getElementById('map')
          const options = {
            center: new daum.maps.LatLng(this.CurLatLng.lat, this.CurLatLng.lng), 
            level: 3 
          }
          this.map = new daum.maps.Map(container, options)
          this.map.setCopyrightPosition(daum.maps.CopyrightPosition.BOTTOMRIGHT, true) 

          var marker = new daum.maps.Marker({
              map: this.map,
              position: options.center
          })
          var customOverlay = new daum.maps.CustomOverlay({
              map: this.map,
              clickable: true,
              content: '<span class="tag is-info is-small is-rounded">'+'현재위치'+'</span>',
              position: options.center,
              yAnchor: 3,
              zIndex: 5
          });
          customOverlay.setMap(this.map)
          daum.maps.event.addListener(this.map, 'dragend', () => {        
    
            const LatLng = {
              lat : this.map.getCenter().getLat(),
              lng : this.map.getCenter().getLng()
            }
            this.LatLng = LatLng
          });
      },
      keywordSearch(keyword) {
        this.closeToast()        
        if(keyword == "") {
          this.addToast(this.$toast.open({
            duration: 1500,
            message: `검색어를 입력해주세요`,
            position: 'is-bottom',
            type: 'is-danger'
          }))
          return
        }
        this.addToast(this.$toast.open({
          duration: 2000,
          message: `${keyword} 주변 음식점을 검색합니다`,
          position: 'is-bottom',
          type: 'is-success'
        }))
        this.isLoading = true
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
                this.isLoading = false                
              })
              .catch((err) => {
                console.log(err)
                this.loading = false
                this.isLoading = false                
              })
            }
          } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            this.addToast(this.$toast.open({
              duration: 2000,
              message: `검색결과가 존재하지 않습니다!`,
              position: 'is-bottom',
              type: 'is-danger'
            }))
            this.loading = false
            this.isLoading = false            
            return
          } else if (status === daum.maps.services.Status.ERROR) {
            this.addToast(this.$toast.open({
              duration: 2000,
              message: `검색결과 중 오류가 발생했습니다!`,
              position: 'is-bottom',
              type: 'is-danger'
            }))
            this.loading = false            
            this.isLoading = false            
            return
          } else {
            this.addToast(this.$toast.open({
              duration: 2000,
              message: `검색결과 중 오류가 발생했습니다!`,
              position: 'is-bottom',
              type: 'is-danger'
            }))            
            this.loading = false
            this.isLoading = false            
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
        this.closeToast()        
        this.addToast(this.$toast.open({
          duration: 2000,
          message: `주변 음식점을 검색합니다`,
          position: 'is-bottom',
          type: 'is-success'
        }))
        this.SET_LOCATION(this.LatLng)        
        this.isLoading = true        
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
                this.loading = false
                this.isLoading = false
              })
              .catch((err) => {
                this.loading = false
                this.isLoading = false                
                console.log(err)
              })
            }
           } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            this.addToast(this.$toast.open({
              duration: 2000,
              message: `검색결과가 존재하지 않습니다!`,
              position: 'is-bottom',
              type: 'is-danger'
            }))
            this.loading = false
            this.isLoading = false            
            return
          } else if (status === daum.maps.services.Status.ERROR) {
            this.addToast(this.$toast.open({
              duration: 2000,
              message: `검색결과 중 오류가 발생했습니다!`,
              position: 'is-bottom',
              type: 'is-danger'
            }))
            this.loading = false            
            this.isLoading = false            
            return
          } else {
            this.addToast(this.$toast.open({
              duration: 2000,
              message: `검색결과 중 오류가 발생했습니다!`,
              position: 'is-bottom',
              type: 'is-danger'
            }))            
            this.loading = false
            this.isLoading = false            
            return
          }
        }
        this.CATEGORY_SEARCH(callback)
      },
      displayMarker(place) {
        var customOverlay = new daum.maps.CustomOverlay({
          map: this.map,
          content: '<span class="tag is-danger is-small is-rounded">' + place.place_name + '</span>',
          position: new daum.maps.LatLng(place.y, place.x),
          yAnchor: 3,
          zIndex: 5
        });
        const marker = new daum.maps.Marker({
          map: this.map,
          position: new daum.maps.LatLng(place.y, place.x)
        })
        customOverlay.setMap(null)
        this.markers.push(marker)
  
        daum.maps.event.addListener(marker, 'click', () => {
          customOverlay.setMap(this.map)
        })
        daum.maps.event.addListener(marker, 'mouseover', () => {
          customOverlay.setMap(this.map)
        })
        daum.maps.event.addListener(marker, 'mouseout', () => {
          customOverlay.setMap(null)
        })
        daum.maps.event.addListener(marker, 'dragstart', () => {
          customOverlay.setMap(null)
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

</style>

