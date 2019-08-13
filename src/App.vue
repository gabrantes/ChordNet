<template>
  <div id="app">
    <MyNavBar class="shadow"/>
    <HomePage />
  </div>
</template>

<script>
import MyNavBar from './components/MyNavBar.vue'
import HomePage from './components/HomePage.vue'

export default {
  name: 'app',

  components: {
    MyNavBar,
    HomePage,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
