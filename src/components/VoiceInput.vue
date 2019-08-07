<template>
  <div>
    <b-form-input v-model="val"></b-form-input>
    <p>{{ note }}</p>
  </div>
</template>

<script>
export default {
  name: 'VoiceInput',

  props: {
    name: String,
    label: String,
    beginRange: {
      type: Number,
      required: true,
    },
    endRange: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      val: ''
    }
  },
  
  computed: {
    note: function(){
      const note_dict = {
        'Cbb': -2,    'Cb': -1,    'C': 0,     'C#': 1,     'C##': 2,
        'Dbb': 0,     'Db': 1,     'D': 2,     'D#': 3,     'D##': 4,
        'Ebb': 2,     'Eb': 3,     'E': 4,     'E#': 5,     'E##': 6,
        'Fbb': 3,     'Fb': 4,     'F': 5,     'F#': 6,     'F##': 7,
        'Gbb': 5,     'Gb': 6,     'G': 7,     'G#': 8,     'G##': 9,
        'Abb': 7,     'Ab': 8,     'A': 9,     'A#': 10,    'A##': 11,
        'Bbb': 9,     'Bb': 10,    'B': 11,    'B#': 12,    'B##': 13
      };

      if (this.val.length < 1) return "";

      const octave = Number(this.val[this.val.length - 1]);
      const note_name = this.val.slice(0, this.val.length - 1);

      if (isNaN(octave) || note_dict[note_name] === undefined) {
        console.log("Invalid input encountered!")
        return "";
      } else {
        const ret = note_dict[note_name] + (12 * octave);
        console.log("Converted " + this.val + " into " + ret);
        return ret;
      }
    }
  }
}
</script>
