<template>
  <div>
    <b-navbar id="bar" type="dark">
      <b-navbar-brand tag="h1" id="title">
        <b>CHORD</b>NET
      </b-navbar-brand>
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

#title {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
}
</style>