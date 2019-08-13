<template>
  <div class="aboutPage">
    <h1>About</h1>
    <hr>

    <h3 id="myHeader">
    ChordNet uses a 
      <a href="https://en.wikipedia.org/wiki/Random_forest" target="_blank">
        random forest
      </a> 
    to predict chord voicings.
    </h3>

    <p>
      In traditional music theory, there are many rules, guidelines, 
      and exceptions when writing chord progressions for four 
      voice parts, also referred to as 
      <a href="https://en.wikipedia.org/wiki/Four-part_harmony" target="_blank">
        four-part harmony</a>.
      ChordNet applies a random forest to solve this problem.
      It was trained on example chord progressions
      from <i>Tonal Harmony (Kostka &amp; Payne)</i>, a music theory textbook.
    </p>
    <p>
      Read more about model training and prediction on
      <a href="https://github.com/gabrantes/ML-Chord-Progressions" target="_blank">
        GitHub</a>.
    </p>

    <br>
    <br>

    <h5>Technologies</h5>
    <p class="indent">
      <a href="https://vuejs.org/" target="blank_">
        Vue.js
      </a>
        — Frontend 
      <br>
      <a href="https://palletsprojects.com/p/flask/" target="blank_">
        Flask
      </a>
        — REST Backend 
      <br>
      <a href="https://scikit-learn.org/stable/" target="blank_">
        Scikit-Learn
      </a>
        — Random Forest 
      <br>
    </p>

    <br>

    <h5>GitHub Links</h5>
    <p class="indent">
      <a href="https://github.com/gabrantes/chordnet" target="_blank">
        Frontend
      </a>
      <br>
      <a href="https://github.com/gabrantes/ML-Chord-Progressions" target="_blank">
        Backend / Model
      </a>
    </p>

  </div>
</template>

<script>
export default {
  name: 'AboutPage',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins|Montserrat&display=swap');

.aboutPage {
  height: 100vh;
  padding: 25px;
}

@media only screen and (max-width: 660px) {
  .aboutPage {
    height: 100vh;
    padding: 15px;
  }
}

h1 {
  font-family: 'Poppins', sans-serif;
}

#myHeader {
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 20px;
}

.indent {
  margin-left: 15px;
}
</style>
