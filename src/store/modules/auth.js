import api from '../../api/'
import * as types from '../mutation-types'
const state = {
  info: {
    email: null,
    token: null
  }
}

const getters = {
  getInfo: state => state.info,
}

const mutations = {
  [types.tokenauth](state, info) {
    state.info = info
    return state.info = info
  },
  [types.logoutAuth](state) {
    return state.info = null
  }
}

const actions = {
  [types.tokenauth]({
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      api.defaults.headers.common.Authorization = token;
      api.get('/auth')
        .then((res) => {
          const info = {
            email: res.data.email,
            token,
          }
          commit(types.tokenauth, info)
          resolve(info)
        })
        .catch((err) => {
          reject(err)
        })
    });
  },
  [types.logoutAuth]({
    commit
  }) {
    return new Promise((resolve, reject) => {
      api.get('/auth/logout')
        .then((res) => {
          commit(types.logoutAuth)
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