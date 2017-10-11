
import * as types from '../mutation-types'
const state = {
  LatLng : {
    lat: 0,
    lng: 0
  }
}

const getters = {
  getLatLng: state => state.LatLng
}

const mutations = {
  [types.UPDATE_LOCATION] (state, LatLng) {
    return state.LatLng = LatLng
  }
}

const actions = {
  [types.UPDATE_LOCATION] ({commit}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('gps가 지원되지 않습니다')
      }
      navigator.geolocation.getCurrentPosition((pos) => {
        const LatLng = {
          lat : pos.coords.latitude,
          lng : pos.coords.longitude
        }
        commit(types.UPDATE_LOCATION, LatLng)
        resolve(LatLng)
      }, (err) => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}