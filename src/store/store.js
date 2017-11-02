import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import auth from './modules/auth'
import latlng from './modules/latlng'
import map from './modules/map'



Vue.use(Vuex)

const state = {
  toast: []
}

export default new Vuex.Store({
  modules: {
    auth,
    latlng,
    map
  },
  state,
  mutations,
  getters,
  actions,
})

