<template>
  <div id="app">
    <h1><b>CHORD</b>NET</h1>
    <ProgressionDisplay
      id="display"
      :inputCurChord="curChordDisplay"/>
    <MasterInput 
      @send:cur-chord-display="toCurDisplay"
      id="inputs"/>
  </div>
</template>

<script>
import ProgressionDisplay from './components/ProgressionDisplay.vue'
import MasterInput from './components/MasterInput.vue'

export default {
  name: 'app',

  components: {
    ProgressionDisplay,
    MasterInput,
  },

  data() {
    return {
      curChordDisplay: null,
    }
  },

  methods: {
    toCurDisplay: function(curChordDisplay) {
      this.curChordDisplay = curChordDisplay;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#display {
  position: sticky;
  top: 0;
  background-color: white;
  border-style: solid;
  border-color: black;
  border-width: 2px 2px 2px 2px;
  border-radius: 6px;
  z-index: 2;
  max-width: 360px;
  margin: auto;
}

#inputs {
  z-index: 1;
}
</style>
