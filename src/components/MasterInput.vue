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
      @send:chord-display="sendCurChordDisplay"
      :disabled="disabled"/>
    <NextChordOptions
      class="sub"
      :mode="this.mode"
      @send:degree="setNextDegree"
      @send:inversion="setNextInversion"
      :disabled="disabled"/>
    <b-button
      pill 
      id="button"
      variant="primary"
      @click="requestFromBackend"
      :disabled="!ready || disabled">
        Submit
    </b-button>
  </b-container>
</template>

<script>
import KeyInput from './KeyInput.vue'
import CurrentChordInput from './CurrentChordInput.vue'
import NextChordOptions from './NextChordOptions.vue'

export default {
  name: 'MasterInput',

  components: {KeyInput, CurrentChordInput, NextChordOptions},

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      key: {
        num: 0,
        str: 'C',
      },
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
    }
  },

  methods: {
    setMode: function(emittedMode) {
      this.mode = emittedMode;
    },

    setKey: function(emittedKey) {
      this.key.num = emittedKey.num;
      this.key.str = emittedKey.str;
      this.$emit('send:key-display', emittedKey.str);
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

    sendCurChordDisplay: function(chordDisplay) {
      this.$emit('send:cur-chord-display', chordDisplay);
    },

    // or possibly do this in App.vue?
    requestFromBackend: function() {
      let body = [];
      body.push(this.key.num);
      body.push(this.mode);
      body = body.concat(this.currentChord.map((voice) => voice.noteInt));
      body.push(this.nextDegree);
      body.push(this.nextSeventh);
      body.push(this.nextInversion);
      
      // send [body] to the backend API
      this.$emit('request:backend', [body]);
    }
  },

  computed: {
    ready: function() {
      let ready = true;
      for (let key in this.$data) {
        if (key === 'key') {
          ready = ready && (!!this.key.num || this.key.num === 0) && !!this.key.str;
          continue;
        }
        if (key === 'currentChord') {
          for (let voice of this.currentChord) {
            ready = ready && (!!voice.noteInt || voice.noteInt === 0);
          }
          continue;
        }
        ready = ready && (!!this.$data[key] || this.$data[key] === 0);
      }
      return ready;
    }
  }

}
</script>

<style scoped>
.sub {
  padding: 10px 10px 10px 10px;
}

#button {
  margin-top: 20px;
}
</style>
