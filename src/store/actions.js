import * as types from './mutation-types'
import api from '../api/'


/**Search @property
 * category_group_code : 카테고리 코드
 * location : 좌표
 * radius : 반경 m (default 5000, 0~20000)
 * sort : 정렬 (default ACCURACY, ACCURACY - 정확도순 or DISTANCE - 거리순 )
 * Search @param
 * keyword : 키워드 (string)
 * callback : 결과 받는 콜백 함수
 */
export const CATEGORY_SEARCH = ({
  getters
}, callback) => {
  const LatLng = getters.getLatLng
  const places = new daum.maps.services.Places()
  const coords = new daum.maps.LatLng(LatLng.lat, LatLng.lng)

  places.categorySearch("FD6", callback, {
    location: new daum.maps.LatLng(LatLng.lat, LatLng.lng),
    radius: 500,
    sort: daum.maps.services.SortBy.DISTANCE,
  })
}

export const KEYWORD_SEARCH = ({
  getters
}, arg) => {
  const places = new daum.maps.services.Places()
  if (arg.global) {
    places.keywordSearch(arg.keyword, arg.callback, {
      category_group_code: "FD6",
      useMapCenter: true,
      radius: 500
    })
  } else {
    const LatLng = getters.getLatLng
    const coords = new daum.maps.LatLng(LatLng.lat, LatLng.lng)
    places.keywordSearch(arg.keyword, arg.callback, {
      category_group_code: "FD6",
      location: new daum.maps.LatLng(LatLng.lat, LatLng.lng),
      // radius: 500,
      sort: daum.maps.services.SortBy.DISTANCE,
    })
  }
}
export const fetchFoods = ({
  state,
  commit
}) => {
  return new Promise((resolve, reject) => {
  api.get('/food')
    .then((res) => {
      const email = state.auth.info.email
      api.get(`/users/search/${email}`)
        .then((user) => {
          const data = {
            foods: res.data.foods,
            rating: user.data.user.rating
          }
          commit(types.FETCH, data)
          resolve()
        })
    })
  })
}
export const LIKE = ({
  state,
  commit
}, id) => {
  api.get(`/food/like/${id}`)
    .then((res) => {
      const email = state.auth.info.email
      api.get(`/users/like/${email}/${id}`)
        .then(() => {
          commit(types.LIKE, res.data.food)
        })
    })
}
export const UNLIKE = ({
  state,
  commit
}, id) => {
  return new Promise((resolve, reject) => {
  api.delete(`/food/like/${id}`)
    .then((res) => {
      const email = state.auth.info.email
      api.delete(`/users/like/${email}/${id}`)
        .then(() => {
          commit(types.UNLIKE, res.data.food)
          resolve()
        })
    })
  })
}
export const HATE = ({
  state,
  commit
}, id) => {
  api.get(`/food/hate/${id}`)
  .then((res) => {
  const email = state.auth.info.email
  api.get(`/users/hate/${email}/${id}`)
    .then(() => {
      commit(types.HATE, res.data.food)
    })
  })
}
export const UNHATE = ({
  state,
  commit
}, id) => {
  api.delete(`/food/hate/${id}`)
  .then((res) => {
  const email = state.auth.info.email
  api.delete(`/users/hate/${email}/${id}`)
    .then(() => {
      commit(types.UNHATE, res.data.food)
    })
  })
}

export const addToast = ({
  state,
  commit
}, toast) => {
  commit('addToast', toast)
}

export const closeToast = ({
  state,
  commit
}) => {
  if(state.toast != null ) {
    state.toast.close()
  }
  commit('clearToast')
}