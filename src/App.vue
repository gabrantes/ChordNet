<template>
  <div id="app">
    <h1><b>CHORD</b>NET</h1>
    <ProgressionDisplay 
      :inputChord="curChordDisplay"/>
    <MasterInput 
      @send:cur-chord-display="toCurDisplay"/>
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
  margin-top: 60px;
}
</style>
