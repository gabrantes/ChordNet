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
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Poppins|Raleway|Roboto&display=swap');
#bar {
  /* background-image: radial-gradient( circle 760px at 50.7% 60.5%,  rgba(76,120,183,1) 0%, rgba(34,70,122,1) 90% ); */
  background-image: linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%);  
}

#title {
  font-family: 'Raleway', sans-serif;
  font-size: 2rem;
}
</style>