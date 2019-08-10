<template>
  <div id="app">
    <h1><b>CHORD</b>NET</h1>
    <ChordDisplay />
    <!-- <MasterInput /> -->
  </div>
</template>

<script>
// import MasterInput from './components/MasterInput.vue'
import ChordDisplay from './components/ChordDisplay.vue'

export default {
  name: 'app',
  components: {
    ChordDisplay,
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
