
import * as types from '../mutation-types'
const state = {
  LatLng : {
    lat: 0,
    lng: 0
  },
  CurLatLng: {
    lat: 0,
    lng: 0
  }
}

const getters = {
  getLatLng: state => state.LatLng,
  getCurLatLng: state => state.CurLatLng
}

const mutations = {
  [types.UPDATE_LOCATION] (state, CurLatLng) {
    return state.CurLatLng = CurLatLng
  },
  [types.SET_LOCATION] (state, LatLng) {
    return state.LatLng = LatLng
  }
}

const actions = {
  [types.UPDATE_LOCATION] ({state, commit}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('gps가 지원되지 않습니다')
      }
      navigator.geolocation.getCurrentPosition((pos) => {
        const CurLatLng = {
          lat : pos.coords.latitude,
          lng : pos.coords.longitude
        }
        commit(types.UPDATE_LOCATION, CurLatLng)
        resolve(CurLatLng)
      }, (err) => {
        reject(err)
      })
    })
  },
  [types.SET_LOCATION] ({commit}, LatLng) {
    commit(types.SET_LOCATION, LatLng)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}