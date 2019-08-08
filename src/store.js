import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curSoprano: {'val': null, 'note': null},
    curAlto: {'val': null, 'note': null},
    curTenor: {'val': null, 'note': null},
    curBass: {'val': null, 'note': null},
  },

  getters: {
    getCurSoprano: state => state.curSoprano.note,
    getCurAlto: state => state.curAlto.note,
    getCurTenor: state => state.curTenor.note,
    getCurBass: state => state.curBass.note,
  },

  mutations: {
    SET_CURSOPRANO: (state, payload) => {
      state.curSoprano.val = payload.val
      state.curSoprano.note = payload.note
    },
    SET_CURALTO: (state, payload) => {
      state.curAlto.val = payload.val
      state.curAlto.note = payload.note
    },
    SET_CURTENOR: (state, payload) => {
      state.curTenor.val = payload.val
      state.curTenor.note = payload.note
    },
    SET_CURBASS: (state, payload) => {
      state.curBass.val = payload.val
      state.curBass.note = payload.note
    }
  },

  actions: {
    setCurNote: (context, payload) => {
      switch (payload.id) {
        case 0:
          context.commit("SET_CURSOPRANO", payload)
          break;
        case 1:
          context.commit("SET_CURALTO", payload)
          break;
        case 2:
          context.commit("SET_CURTENOR", payload)
          break;
        case 3:
          context.commit("SET_CURBASS", payload)
          break;
      }
    }
  }
  })