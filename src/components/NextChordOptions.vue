<template>
  <b-container class="centered">
    <h4>Next Chord Options</h4>
    <b-row align-h="center">

      <b-col sm="2">
        <label>Degree</label>
        <b-form-select
          v-model="selectedDegree"
          :options="degreeOptions[mode]"
          @change="sendDegree">
        </b-form-select>
      </b-col>

      <b-col sm="2">
        <label>Inversion</label>
        <b-form-select
          v-model="selectedInversion"
          :options="inversionOptions"
          @change="sendInversion">
        </b-form-select>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'NextChordOptions',

  props: {
    mode: {
      // 0 for minor keys, 1 for major keys
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      selectedDegree: null,
      degreeOptions: [
        [
          // chords in minor key
          {value: null, text: 'Select degree', disabled: true},
          {value: 1, text: 'i'},          
          {value: 2, text: 'ii\xB0'},                    
          {value: 3, text: 'III'},                    
          {value: 4, text: 'iv'},                    
          {value: 5, text: 'V'},                    
          {value: 6, text: 'VI'},                    
          {value: 7, text: 'vii\xB0'},
        ],
        [
          // chords in major key
          {value: null, text: 'Select degree', disabled: true},
          {value: 1, text: 'I'},          
          {value: 2, text: 'ii'},                    
          {value: 3, text: 'iii'},                    
          {value: 4, text: 'IV'},                    
          {value: 5, text: 'V'},                    
          {value: 6, text: 'vi'},                    
          {value: 7, text: 'vii\xB0'},
        ],
      ],

      selectedInversion: null,
      inversionOptions: [
        {value: null, text: 'Select inversion', disabled: true},
        {value: {inv: 0, sev: 0}, text: 'Root Position'},
        {value: {inv: 1, sev: 0}, text: '1st Inversion'},
        {value: {inv: 2, sev: 0}, text: '2nd Inversion'},
        {value: null, text: ' --- ', disabled: true},
        {value: {inv: 0, sev: 1}, text: 'Root Position + 7th'},
        {value: {inv: 1, sev: 1}, text: '1st Inversion + 7th'},
        {value: {inv: 2, sev: 1}, text: '2nd Inversion + 7th'},
        {value: {inv: 3, sev: 1}, text: '3rd Inversion + 7th'},
      ],
    }
  },

  methods: {
    sendDegree: function() {
      this.$emit('send:degree', this.selectedDegree);
    },

    sendInversion: function() {
      this.$emit('send:inversion', this.selectedInversion);
    }
  },

}
</script>

<style scoped>
.centered {
  margin: auto;
}
</style>
