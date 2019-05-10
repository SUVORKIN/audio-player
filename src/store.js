import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    volume: 0.3
  },
  mutations: {
    set (state, { type, val }) {
      state[type] = val
    }
  },
  actions: {
    updateVolume ({ commit }, volume) {
      commit('set', { type: 'volume', val: volume })
    }
  },
  getters: {
    volume (state) {
      return state.volume
    }
  }
})
