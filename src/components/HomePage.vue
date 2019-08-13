<template>
  <div id="app">
    <ProgressionDisplay
      id="display"
      :inputCurChord="curChordDisplay"
      :inputNextChord="nextChordDisplay"
      :keySignature="keyStr"/>
    <MasterInput 
      :disabled="disableInputs"
      @send:cur-chord-display="toCurDisplay"
      @send:key-display="toKeyDisplay"
      @request:backend="requestBackend"
      id="inputs"/>
  </div>
</template>

<script>
import axios from 'axios'
import ProgressionDisplay from './ProgressionDisplay.vue'
import MasterInput from './MasterInput.vue'

export default {
  name: 'HomePage',

  components: {
    ProgressionDisplay,
    MasterInput,
  },

  data() {
    return {
      curChordDisplay: null,
      nextChordDisplay: null,
      keyStr: 'C',
      disableInputs: false,
    }
  },

  methods: {
    toCurDisplay: function(curChordDisplay) {
      this.curChordDisplay = curChordDisplay;
    },

    toKeyDisplay: function(keyStr) {
      this.keyStr = keyStr;
    },

    requestBackend: function(modelInputs) {
      this.disableInputs = true;

      const url = 'api/predict';
      const reqBody = {
        'instances': [
          modelInputs
        ]
      };
      
      axios.post(url, reqBody)
        .then(response => {
          this.nextChordDisplay = response.data.predictions[0];
          this.disableInputs = false;
          })
        .catch(e => {
          console.log(e);
          this.disableInputs = false;
          });

      return;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
#app {
  width: 100%;
  min-width: 360px;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
  padding-bottom: 20px;
}

#display {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 2;
  max-width: 360px;
  margin: auto;
  margin-top: 10px;
  border-radius: 6px;
}

#inputs {
  margin: auto;
  height: calc(50vh + 25%);
  overflow: auto;
  z-index: 1;
  padding-bottom: 20px;
  /* border: 5px solid #2c3e50;
  border-radius: 6px 6px 0px 0px; */
}
</style>
