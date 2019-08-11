<template>
  <b-container>
    <h4>Key Signature</h4>
    <b-row align-h="center">

      <b-col sm="2">
        <label>Major / Minor</label>
        <b-form-select 
          v-model="selectedMode" 
          :options="modeOptions"
          @change="sendMode"
          :disabled="disabled"/>
      </b-col>

      <b-col sm="2">
        <label>Key</label>
        <b-form-select 
          v-model="selectedKey" 
          :options="keyOptions[keyIndex]"
          @change="sendKey"
          :disabled="disabled || (selectedMode === null)"/>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'KeyInput',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      selectedKey: null,

      keyOptions: [
        [
          {value: null, text: 'Select a key', disabled: true},
          {value: {num: 9, str: 'Am'},  text: 'Am'},
          {value: null, text: ' --- ', disabled: true},
          {value: {num: 2, str: 'Dm'},  text: 'Dm'},
          {value: {num: 7, str: 'Gm'},  text: 'Gm'},
          {value: {num: 0, str: 'Cm'},  text: 'Cm'},
          {value: {num: 5, str: 'Fm'},  text: 'Fm'},   
          {value: {num: 10, str: 'Bbm'}, text: 'Bbm'},
          {value: {num: 3, str: 'Ebm'},  text: 'Ebm'},
          {value: {num: 8, str: 'Abm'},  text: 'Abm'},
          {value: null, text: ' --- ', disabled: true},
          {value: {num: 4, str: 'Em'},  text: 'Em'},
          {value: {num: 11, str: 'Bm'}, text: 'Bm'},
          {value: {num: 6, str: 'F#m'},  text: 'F#m'},
          {value: {num: 1, str: 'C#m'},  text: 'C#m'},
          {value: {num: 8, str: 'G#m'},  text: 'G#m'},
          {value: {num: 3, str: 'D#m'},  text: 'D#m'},
          {value: {num: 10, str: 'A#m'}, text: 'A#m'}, 
        ],
        [
          {value: null, text: 'Select a key', disabled: true},
          {value: {num: 0, str: 'C'},  text: 'C'},
          {value: null, text: ' --- ', disabled: true},
          {value: {num: 5, str: 'F'},  text: 'F'},
          {value: {num: 10, str: 'Bb'}, text: 'Bb'},
          {value: {num: 3, str: 'Eb'},  text: 'Eb'},
          {value: {num: 8, str: 'Ab'},  text: 'Ab'},   
          {value: {num: 1, str: 'Db'},  text: 'Db'},
          {value: {num: 6, str: 'Gb'},  text: 'Gb'},
          {value: {num: 11, str: 'Cb'}, text: 'Cb'},
          {value: null, text: ' --- ', disabled: true},
          {value: {num: 7, str: 'G'},  text: 'G'},
          {value: {num: 2, str: 'D'},  text: 'D'},
          {value: {num: 9, str: 'A'},  text: 'A'},
          {value: {num: 4, str: 'E'},  text: 'E'},
          {value: {num: 11, str: 'B'}, text: 'B'},
          {value: {num: 6, str: 'F#'},  text: 'F#'},
          {value: {num: 1, str: 'C#'},  text: 'C#'},       
        ],        
      ],

      selectedMode: null,
      modeOptions: [
        {value: null, text: 'Select a mode', disabled: true},
        {value: 1, text: 'Major'},
        {value: 0, text: 'Minor'},
      ],
    }
  },

  watch: {
    selectedMode: function() {
      this.selectedKey = null;
    }
  },

  computed: {
    keyIndex: function() {
      if (this.selectedMode === null) {
        return 1;
      } else {
        return this.selectedMode;
      }
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

