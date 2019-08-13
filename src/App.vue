<template>
  <div id="app">
    <MyNavBar class="shadow"/>
    <router-view></router-view>
  </div>
</template>

<script>
import MyNavBar from './components/MyNavBar.vue'

export default {
  name: 'app',

  components: {
    MyNavBar,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav a {  
  color: white;
}

nav a:hover {  
  color: white;
}

nav .router-link-active {
  color: white;
}

nav .router-link-exact-active {
  color: white;
}
</style>
