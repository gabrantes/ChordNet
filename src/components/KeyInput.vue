<template>
  <b-container>
    <h4>Key Signature</h4>
    <b-row align-h="center">

      <b-col sm="2">
        <label>Key</label>
        <b-form-select 
          v-model="selectedKey" 
          :options="keyOptions"
          @change="sendKey">
        </b-form-select>
      </b-col>

      <b-col sm="2">
        <label>Major / Minor</label>
        <b-form-select 
          v-model="selectedMode" 
          :options="modeOptions"
          @change="sendMode">
        </b-form-select>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'KeyInput',

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

  methods: {
    sendMode: function() {
      this.$emit('send:mode', this.selectedMode);
    },

    sendKey: function() {
      this.$emit('send:key', this.selectedKey);
    }
  },

}
</script>

