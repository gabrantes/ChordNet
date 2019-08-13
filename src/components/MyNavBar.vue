<template>
  <div>
    <b-navbar id="bar" type="dark">
      <b-navbar-brand tag="h1" class="navText" id="title">
        <router-link to="/">
          <b>CHORD</b>NET
        </router-link>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto navText">
        <router-link to="/about">
          About
        </router-link>
      </b-navbar-nav>      
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'MyNavBar',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
#bar {
  background-image: linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%);
}

.navText {
  font-family: 'Poppins', sans-serif;
}

#title {  
  font-size: 2rem;
}
</style>