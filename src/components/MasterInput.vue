<template>
  <b-container>
      <KeyInput 
        class="sub" 
        @send:key="setKey"
        @send:mode="setMode"/>
      <CurrentChordInput
        class="sub"
        @send:chord="setCurrentChord"/>
      <NextChordOptions
        class="sub"
        :mode="this.mode"
        @send:degree="setNextDegree"
        @send:inversion="setNextInversion"/>
  </b-container>
</template>

<script>
import KeyInput from './KeyInput.vue'
import CurrentChordInput from './CurrentChordInput.vue'
import NextChordOptions from './NextChordOptions.vue'

export default {
  name: 'MasterInput',

  components: {KeyInput, CurrentChordInput, NextChordOptions},

  props: {},

  data() {
    return {
      key: null,
      mode: 1,
      currentChord: [
        {
          id: 0,
          note: null,
          noteInt: null,
        },
        {
          id: 1,
          note: null,
          noteInt: null,
        },
        {
          id: 2,
          note: null,
          noteInt: null,
        },
        {
          id: 3,
          note: null,
          noteInt: null,
        },
      ],
      nextDegree: null,
      nextInversion: null,
      nextSeventh: null,
    }
  },

  methods: {
    setMode: function(emittedMode) {
      this.mode = emittedMode;
    },

    setKey: function(emittedKey) {
      this.key = emittedKey;
    },

    setCurrentChord: function(emittedChord) {
      this.currentChord = emittedChord;
    },

    setNextDegree: function(emittedDegree) {
      this.nextDegree = emittedDegree;
    },

    setNextInversion: function(emitted) {
      this.nextInversion = emitted.inv;
      this.nextSeventh = emitted.sev;
    },
  },

  computed: {}

}
</script>

<style scoped>
.sub {
  padding: 10px 10px 10px 10px;
}
</style>
