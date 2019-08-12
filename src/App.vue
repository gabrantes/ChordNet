<template>
  <div id="app">
    <MyNavBar class="shadow"/>
    <ProgressionDisplay
      id="display"
      :inputCurChord="curChordDisplay"
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
// import axios from 'axios'
import MyNavBar from './components/MyNavBar.vue'
import ProgressionDisplay from './components/ProgressionDisplay.vue'
import MasterInput from './components/MasterInput.vue'

export default {
  name: 'app',

  components: {
    MyNavBar,
    ProgressionDisplay,
    MasterInput,
  },

  data() {
    return {
      curChordDisplay: null,
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
      console.log(modelInputs);

      // simulate backend request
      setTimeout(() => {this.disableInputs = false;}, 2000);

      /* AXIOS
      const url = 'https://ml.googleapis.com/v1/projects/chordnet-backend/models/chordnet_verbose/versions/slim_custom_v6:predict';
      const reqBody = {
        'instances': [
          modelInputs
        ]
      };
      
      axios.post(url, reqBody)
        .then(response => {
          console.log(response);
          this.disableInputs = false;
          })
        .catch(e => {
          console.log(e);
          this.disableInputs = false;
          });
      */

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
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
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
