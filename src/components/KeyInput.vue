<template>
  <b-container>
    <b-row>
      <b-col sm="2">
        <label>Key</label>
        <b-form-select v-model="selectedKey" :options="keyOptions"></b-form-select>
      </b-col>
      <b-col sm="2">
        <label>Major / Minor</label>
        <b-form-select v-model="selectedMode" :options="modeOptions"></b-form-select>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'KeyInput',

  props: {},

  components: {},

  data() {
    return {
      selectedKey: null,
      keyOptions: [
        {value: null, text: 'Select a key', disabled: true},
        {value: 0,  text: 'C'},
        {value: 1,  text: 'C# / Db'},
        {value: 2,  text: 'D'},
        {value: 3,  text: 'D# / Eb'},
        {value: 4,  text: 'E'},
        {value: 5,  text: 'F'},
        {value: 6,  text: 'F#'},
        {value: 7,  text: 'G'},
        {value: 8,  text: 'G# / Ab'},
        {value: 9,  text: 'A'},
        {value: 10, text: 'A# / Bb'},
        {value: 11, text: 'B'},
      ],

      selectedMode: null,
      modeOptions: [
        {value: null, text: 'Select a mode', disabled: true},
        {value: 1, text: 'Major'},
        {value: 0, text: 'Minor'},
      ],
    }
  },

  methods: {},

  computed: {}

}
</script>

