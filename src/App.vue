<template>
  <div id="app">
    <MyNavBar class="shadow"/>
    <ProgressionDisplay
      id="display"
      :inputCurChord="curChordDisplay"
      :keySignature="keyStr"/>
    <MasterInput 
      @send:cur-chord-display="toCurDisplay"
      @send:key-display="toKeyDisplay"
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
    }
  },

  methods: {
    toCurDisplay: function(curChordDisplay) {
      this.curChordDisplay = curChordDisplay;
    },
    toKeyDisplay: function(keyStr) {
      this.keyStr = keyStr;
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
