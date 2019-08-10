<template>
  <div id="app">
    <h1><b>CHORD</b>NET</h1>
    <ChordDisplay 
      :inputChord="displayChord"/>
    <MasterInput 
      @send:display-chord="toDisplay"/>
  </div>
</template>

<script>
import ChordDisplay from './components/ChordDisplay.vue'
import MasterInput from './components/MasterInput.vue'

export default {
  name: 'app',

  components: {
    ChordDisplay,
    MasterInput,
  },

  data() {
    return {
      displayChord: null,
    }
  },

  methods: {
    toDisplay: function(displayChord) {
      this.displayChord = displayChord;
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
