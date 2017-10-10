import * as types from './mutation-types'


/**Search @property
 * category_group_code : 카테고리 코드
 * location : 좌표
 * radius : 반경 m (default 5000, 0~20000)
 * sort : 정렬 (default ACCURACY, ACCURACY - 정확도순 or DISTANCE - 거리순 )
 * Search @param
 * keyword : 키워드 (string)
 * callback : 결과 받는 콜백 함수
 */
export const CATEGORY_SEARCH = ({ getters }, callback) => {
  const LatLng = getters.getLatLng;
  const places = new daum.maps.services.Places();
  const coords = new daum.maps.LatLng(LatLng.lat, LatLng.lng);

  places.categorySearch("FD6", callback, {
    location: new daum.maps.LatLng(LatLng.lat, LatLng.lng),
    radius: 500,
    sort: daum.maps.services.SortBy.DISTANCE,
  })
}

export const KEYWORD_SEARCH = ({ getters }, arg) => {
  const places = new daum.maps.services.Places();
  if(arg.global) {
    places.keywordSearch(arg.keyword, arg.callback, {
      category_group_code: "FD6",
      useMapCenter: true,
      radius: 500
    })
  } else {
    const LatLng = getters.getLatLng;
    const coords = new daum.maps.LatLng(LatLng.lat, LatLng.lng);
    places.keywordSearch(arg.keyword, arg.callback, {
      category_group_code: "FD6",
      location: new daum.maps.LatLng(LatLng.lat, LatLng.lng),
      radius: 500,
      sort: daum.maps.services.SortBy.DISTANCE,
    })
  }
}