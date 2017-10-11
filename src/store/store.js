import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import latlng from './modules/latlng'
import map from './modules/map'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    latlng,
    map
  },
  actions,
})

