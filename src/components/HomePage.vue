<template>
  <div id="main" class="animated fadeIn faster">
    <ProgressionDisplay
      id="display"
      :inputCurChord="curChordDisplay"
      :inputNextChord="nextChordDisplay"
      :keySignature="keyStr"
      :resetToggle="resetToggle"/>
    <MasterInput 
      :disabled="disableInputs"
      @send:cur-chord-display="toCurDisplay"
      @send:key-display="toKeyDisplay"
      @request:backend="requestBackend"
      @reset:next-display="handleReset"
      id="inputs"/>
  </div>
</template>

<script>
import 'animate.css'
import axios from 'axios'
import ProgressionDisplay from './ProgressionDisplay.vue'
import MasterInput from './MasterInput.vue'

const axiosInstance = axios.create({
  baseURL: 'https://chordnet-backend.herokuapp.com/',
  timeout: 10000,
  headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'}
});

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
      resetToggle: false,
    }
  },

  mounted() {
    // wake up the (possibly sleeping) Heroku backend
    axiosInstance.get('api/wakeup');
  },

  methods: {
    handleReset: function() {
      this.resetToggle= !this.resetToggle;
    },

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
      
      axiosInstance.post(url, reqBody)
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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
#main {
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
  padding: 0;
}

#inputs {
  margin: auto;
  height: calc(50vh + 25%);
  overflow: auto;
  z-index: 1;
  padding-bottom: 20px;
}
</style>
