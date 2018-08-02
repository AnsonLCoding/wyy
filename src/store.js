import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicData:{}
  },
  getters: {
    getMusicDate(state) {
      return state.musicData;
    }
  },
  mutations: {
    setMusicData(state, data) {
      state.musicData = data
    }
  },
  actions: {

  }
})