import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'
import * as dataActions from './data/actions'
import * as dataGetters from './data/getters'

Vue.use(Vuex)

const modules = {data}
const actions = Object.assign(dataActions)
const getters = Object.assign(dataGetters)
const store = new Vuex.Store({
  actions,
  getters,
  modules
})

Vue.use(store)

export default store
