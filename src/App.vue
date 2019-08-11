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

    requestBackend: function(req) {
      this.disableInputs = true;

      // simulate timing
      setTimeout(() => {this.disableInputs = false;}, 2000);

      // TODO: send req to backend
      return;
    }
  }
}
</script>

<style>

#app {
  width: 100vw;
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  width: 100%;
  z-index: 1;
  padding-bottom: 20px;
}
</style>
