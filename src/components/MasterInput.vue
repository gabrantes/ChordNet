<template>
  <b-container fluid>
    <b-row align-h="center" class="justify-content-md-center">
      <KeyInput 
        class="sub" 
        @send:key="setKey"
        @send:mode="setMode"
        :disabled="disabled"/>
    </b-row>
    <br/>
    <b-row align-h="center" class="justify-content-md-center">
      <b-col col lg>
        <CurrentChordInput
          class="sub doubleColumn"
          @send:chord="setCurrentChord"
          @send:chord-display="sendCurChordDisplay"
          :disabled="disabled"/>
      </b-col>

      <b-col col lg>
        <NextChordOptions
          class="sub doubleColumn"
          :mode="this.mode"
          @send:degree="setNextDegree"
          @send:inversion="setNextInversion"
          :disabled="disabled"/>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col>
        <p 
          v-show="!ready && showError"
          class="redtext">
          Please fill out all fields.
        </p>
        <b-button
          pill 
          id="myButton"
          variant="primary"
          @click="requestFromBackend"
          v-show="!disabled">
            Submit
        </b-button>   
        <b-spinner
          id="mySpinner"
          variant="primary" 
          v-show="disabled"/>   
      </b-col>
    </b-row>
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
      showError: false,
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
      if (!this.ready) {
        this.showError = true;
        return;
      }
      let modelInputs = [];
      modelInputs.push(this.key.num);
      modelInputs.push(this.mode);
      modelInputs = modelInputs.concat(this.currentChord.map((voice) => voice.noteInt));
      modelInputs.push(this.nextDegree);
      modelInputs.push(this.nextSeventh);
      modelInputs.push(this.nextInversion);
      
      // send [body] to the backend API
      this.$emit('request:backend', modelInputs);
    }
  },

  computed: {
    ready: function() {
      let ready = true;
      for (let key in this.$data) {
        if (key === 'showError') {
          continue;
        }
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
.redtext {
  color: #dc3545;
  padding-top: 10px;
}

.sub {
  margin-top: 10px;
  padding: 10px 20px 10px 20px;
}

.doubleColumn {
  min-width: 300px;
}

#myButton {
  margin-top: 20px;
}

#mySpinner {
  margin-top: 25px;
}
</style>
