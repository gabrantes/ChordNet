<template>
  <b-container>
    <KeyInput 
      class="sub" 
      @send:key="setKey"
      @send:mode="setMode"
      :disabled="disabled"/>
    <CurrentChordInput
      class="sub"
      @send:chord="setCurrentChord"
      @send:display-chord="sendDisplayChord"
      :disabled="disabled"/>
    <NextChordOptions
      class="sub"
      :mode="this.mode"
      @send:degree="setNextDegree"
      @send:inversion="setNextInversion"
      :disabled="disabled"/>
    <b-button pill @click="requestFromBackend">Submit</b-button>
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
      nextSeventh: null,
      nextInversion: null,

      disabled: false,
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

    sendDisplayChord: function(displayChord) {
      this.$emit('send:display-chord', displayChord);
    },

    // or possibly do this in App?
    requestFromBackend: function() {
      let body = [];
      body.push(this.key);
      body.push(this.mode);
      body.concat(this.currentChord.map((voice) => voice.noteInt));
      body.push(this.nextDegree);
      body.push(this.nextSeventh);
      body.push(this.nextInversion);

      // send [body] to the backend API
      return [body];
    }
  },

  computed: {}

}
</script>

<style scoped>
.sub {
  padding: 10px 10px 10px 10px;
}
</style>
