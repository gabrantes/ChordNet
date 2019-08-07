<template>
  <b-container>
    <b-row>
      <b-col v-for="voice in voices" :key="voice.id" sm="2">
        <p>{{ voice.label }}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="voice in voices" :key="voice.id" sm="2">
        <b-form-input :id="voice.name" v-model="voice.val"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'VoicingsForm',

  data() {
    return {
      voices: [
        {
          id: 0,
          name: 'soprano',
          label: 'Current Soprano',
          val: '',
          note: ''
        },
        {
          id: 1,
          name: 'alto',
          label: 'Current Alto',
          val: '',
          note: ''
        },
        {
          id: 2,
          name: 'tenor',
          label: 'Current Tenor',
          val: '',
          note: ''
        },
        {
          id: 3,
          name: 'bass',
          label: 'Current Bass',
          val: '',
          note: ''
        }
      ]
    }
  },

  methods: {
    convertValToNote(val) {
      const note_dict = {
        'Cbb': -2,    'Cb': -1,    'C': 0,     'C#': 1,     'C##': 2,
        'Dbb': 0,     'Db': 1,     'D': 2,     'D#': 3,     'D##': 4,
        'Ebb': 2,     'Eb': 3,     'E': 4,     'E#': 5,     'E##': 6,
        'Fbb': 3,     'Fb': 4,     'F': 5,     'F#': 6,     'F##': 7,
        'Gbb': 5,     'Gb': 6,     'G': 7,     'G#': 8,     'G##': 9,
        'Abb': 7,     'Ab': 8,     'A': 9,     'A#': 10,    'A##': 11,
        'Bbb': 9,     'Bb': 10,    'B': 11,    'B#': 12,    'B##': 13
      };

      const octave = Number(val[val.length - 1]);
      const note_name = val.slice(0, val.length - 1);

      if (isNaN(octave) || note_dict[note_name] === undefined) {
        console.log("Invalid input encountered!")
        return null;
      } else {
        const note = note_dict[note_name] + (12 * octave);
        console.log("Converted " + val + " into " + note)
        return note;
      }
    }
  },

  computed: {
    convertFormInput() {
      for (let voice in this.voices) {
        console.log("Inside for loop: " + voice.name);
        let converted_val = this.convertValToNote(voice.val);
        console.log(converted_val);
        if (converted_val != null) {
          voice.note = converted_val
        }
      }
      return null;
    }
  }

}
</script>

