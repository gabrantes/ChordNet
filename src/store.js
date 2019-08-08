import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentVoices: [
      {'val': null, 'note': null, 'withinRange': null, 'error': null},
      {'val': null, 'note': null, 'withinRange': null, 'error': null},
      {'val': null, 'note': null, 'withinRange': null, 'error': null},
      {'val': null, 'note': null, 'withinRange': null, 'error': null},
    ]
  },

  getters: {
    getCurrentVoices: state => state.currentVoices,
    getVoiceError: state => index => state.currentVoices[index].error,
  },

  mutations: {
    SET_CURNOTE: (state, payload) => {
      state.currentVoices[payload.id].val = payload.val
      state.currentVoices[payload.id].note = payload.note
      state.currentVoices[payload.id].withinRange = payload.withinRange
    },
    SET_CURERROR: (state, payload) => {
      state.currentVoices = state.currentVoices.map(
        (voice, idx) => {
          voice.error = payload[idx]
          return voice
        }
      )
    }
  },

  actions: {
    setCurNote: (context, payload) => {
      if (payload.id >= 0 && payload.id < 4)
        context.commit("SET_CURNOTE", payload)
    },
    setCurError: (context, payload) => {
      context.commit("SET_CURERROR", payload)
    }
  }
  })