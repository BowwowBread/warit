import api from '../../api/'
import * as types from '../mutation-types'
const state = {
  info: {
    email: null,
    username: null,
    auth_provider: null,
    profile_image: null,
    token: null,
  }
}

const getters = {
  getInfo: (state) => {
    return new Promise((resolve, reject) => {
      if(state.info.token != null) {
        resolve(state.info)
      } else {
        reject()
      }
    })
  }
}

const mutations = {
  [types.TOKEN_AUTH](state, info) {
    state.info = info
    return state.info = info
  },
  [types.LOAOUT_AUTH](state) {
    return state.info = null
  },
  [types.UNREGISTER](state) {
    return state.info = null
  }
}

const actions = {
  [types.TOKEN_AUTH]({
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      api.defaults.headers.common.Authorization = token
      api.get('/auth')
        .then((res) => {
          const info = {
            email: res.data.userInfo.email,
            username: res.data.userInfo.username,
            auth_provider: res.data.userInfo.auth_provider,
            profile_image: res.data.userInfo.profile_image,
            token,
          }
          commit(types.TOKEN_AUTH, info)
          resolve(info)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [types.LOAOUT_AUTH]({
    commit
  }) {
    return new Promise((resolve, reject) => {
      api.get('/auth/logout')
        .then((res) => {
          commit(types.LOAOUT_AUTH)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [types.UNREGISTER]({commit}, email) {
    return new Promise((resolve, reject) => {
      api.delete(`/users/${email}`)
        .then((res) => {
          commit(types.UNREGISTER)
          resolve(res)
        })
        .catch((err) => {
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