<template>
  <div id="app">
    <h1><b>CHORD</b>NET</h1>
    <StaffDisplay />
    <!-- <MasterInput /> -->
  </div>
</template>

<script>
// import MasterInput from './components/MasterInput.vue'
import StaffDisplay from './components/StaffDisplay.vue'

export default {
  name: 'app',
  components: {
    StaffDisplay,
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
