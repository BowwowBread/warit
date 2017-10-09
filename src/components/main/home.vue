<template>
  <div id="home">
    <button @click="moveCenter">go center</button>
    <button @click="coord2RegionCode">search</button>
    <button @click="keywordSearch">keywordsearch</button>
    <button @click="categorySearch">categorysearch</button>
    <div id="map"></div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        map: null,
        markers: [],
      }
    },
    props: [
      'latlng'
    ],
    watch: {
      'latlng': 'updateMap'
    },
    created() {
      this.updateMap();
      console.log('created')
    },
    computed: {
  
    },
    methods: {
      updateMap() {
        this.$nextTick(() => { // ui 렌더링 후 데이터 갱신
          const container = document.getElementById('map');
          const options = {
            center: new daum.maps.LatLng(this.latlng.lat, this.latlng.lng), // 중심 좌표
            level: 3 // 확대 수준
          };
          this.map = new daum.maps.Map(container, options);
          this.map.setCopyrightPosition(daum.maps.CopyrightPosition.BOTTOMRIGHT, true); // copyright 위치 오른쪽으로
        });
      },
      moveCenter() {
        const center = new daum.maps.LatLng(this.latlng.lat, this.latlng.lng);
        this.map.setLevel(3); // 지도 레벨 변경
        this.map.panTo(center); // 자도 중심으로 부드럽게 이동
      },
      coord2RegionCode() {
        const geocoder = new daum.maps.services.Geocoder();
        const coords = new daum.maps.LatLng(this.latlng.lat, this.latlng.lng)
  
        /**@argument
         * result[0] : 법정동
         * result[1] : 행정동
         */
        const callback = (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            console.log(result[1].address_name);
          } else if (status === daum.maps.services.Status.ERROR) {
            console.log('err')
          }
        }
  
        // 좌표 -> 행정구역정보 변환
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
      },
  
  
      /**Search @property
       * category_group_code : 카테고리 코드
       * location : 좌표
       * radius : 반경 m (default 5000, 0~20000)
       * sort : 정렬 (default ACCURACY, ACCURACY - 정확도순 or DISTANCE - 거리순 )
       * Search @param
       * keyword : 키워드 (string)
       * callback : 결과 받는 콜백 함수
       */
      keywordSearch() {
        const places = new daum.maps.services.Places();
        const coords = new daum.maps.LatLng(this.latlng.lat, this.latlng.lng)
  
        this.clearMarker();

        const callback = (result, status, pagination) => {
          if (status === daum.maps.services.Status.OK) {
            const bounds = new daum.maps.LatLngBounds();
            result.forEach((data) => {
              this.displayMarker(data);
              bounds.extend(new daum.maps.LatLng(data.y, data.x))
            })
            this.map.setBounds(bounds)
          }
        }
  
        places.keywordSearch("강북구 수유2동", callback, {
          category_group_code: "FD6",
          location: new daum.maps.LatLng(this.latlng.lat, this.latlng.lng),
          radius: 1000,
          sort: daum.maps.services.SortBy.DISTANCE,
        })
      },
      categorySearch() {
        const places = new daum.maps.services.Places();
        const coords = new daum.maps.LatLng(this.latlng.lat, this.latlng.lng)
  
        this.clearMarker();

        const callback = (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            const bounds = new daum.maps.LatLngBounds();            
            result.forEach((data) => {
              this.displayMarker(data);
              bounds.extend(new daum.maps.LatLng(data.y, data.x))
            })
            this.map.setBounds(bounds)
          }
        }
  
        places.categorySearch("FD6", callback, {
          location: new daum.maps.LatLng(this.latlng.lat, this.latlng.lng),
          radius: 1000,
          sort: daum.maps.services.SortBy.DISTANCE,
        })
      },
      displayMarker(place) {
        const infowindow = new daum.maps.InfoWindow({
          zIndex: 1,
          content: place.place_name
        })
        const marker = new daum.maps.Marker({
          map: this.map,
          position: new daum.maps.LatLng(place.y, place.x)
        });

        this.markers.push(marker);
  
        daum.maps.event.addListener(marker, 'click', () => {
          infowindow.open(this.map, marker);
        })
        daum.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(this.map, marker);
        })
        daum.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close(this.map, marker);
        })
        daum.maps.event.addListener(marker, 'dragstart', () => {
          infowindow.close(this.map, marker);
        })
      },
      clearMarker() {
        this.markers.forEach((marker) => {
          marker.setMap(null);
        })
        this.markers = [];
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

