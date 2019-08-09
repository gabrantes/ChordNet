<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <b-form-input 
      v-model="note"
      :state="inputState"
    />
    <div v-if="withinRange === false">
      <p>Note out of range.</p>
      <p>Range is between {{ beginNote }} and {{ endNote }}.</p>
    </div>
    <p>{{ noteInt }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },

    label: String,

    beginNote: {
      // first note of valid range, inclusive
      type: String,
      required: true,
    },

    endNote: {
      // last note of valid range, inclusive
      type: String,
      required: true,
    },

    // Note: endNote must be a higher pitch than beginNote

    errorState: {
      // Used in determining display state of text input
      type: Boolean,
    }
  },

  data() {
    return {
      note: '', // Value in text input -- a pitch represented as a string
      beginInt: this.convertNoteToInt(this.beginNote),
      endInt: this.convertNoteToInt(this.endNote),
    }
  },

  methods: {
    /**
     * Convert a musical pitch from string representation to an integer.
     * @param {String} note The string representation of a musical pitch, e.g. 'C4'.
     * @return {Number} The corresponding integer of the pitch.
     */
    convertNoteToInt: function(note) {
      if (!note) return null;

      const note_dict = {
        'Cbb': -2,    'Cb': -1,    'C': 0,     'C#': 1,     'C##': 2,
        'Dbb': 0,     'Db': 1,     'D': 2,     'D#': 3,     'D##': 4,
        'Ebb': 2,     'Eb': 3,     'E': 4,     'E#': 5,     'E##': 6,
        'Fbb': 3,     'Fb': 4,     'F': 5,     'F#': 6,     'F##': 7,
        'Gbb': 5,     'Gb': 6,     'G': 7,     'G#': 8,     'G##': 9,
        'Abb': 7,     'Ab': 8,     'A': 9,     'A#': 10,    'A##': 11,
        'Bbb': 9,     'Bb': 10,    'B': 11,    'B#': 12,    'B##': 13
      };      

      const octave = Number(note[note.length - 1]);
      const note_name = note.slice(0, note.length - 1);

      if (isNaN(octave) || !(note_name in note_dict)) {
        // unable to convert note
        return null;
      } else {
        return note_dict[note_name] + (12 * octave);
      }
    }

  },
  
  computed: {
    /**
     * Convert value in text input (this.note) to an integer representation
     * @return {Number} integer representation of this.note
     */
    noteInt: function() {
      return this.convertNoteToInt(this.note);
    },

    /**
     * Check if noteInt is within the valid range of the voice
     * @return {Boolean} true if noteInt is within range, false otherwise
     */
    withinRange: function() {
      if (this.noteInt || this.noteInt === 0) {
        const withinRange = (this.noteInt >= this.beginInt)
                          && (this.noteInt <= this.endInt);

        // send voice data
        this.$emit(
          'send:voice', 
          {
            'id': this.id, 
            'note': this.note, 
            'noteInt': this.noteInt, 
            'withinRange': withinRange
          }
        );  
      
        return withinRange;
      } else {
        // Invalid input
        return null;
      }
    },

    /**
     * Determine display state of text input, shows errors if any
     * @return {Boolean}
     */
    inputState: function() {
      if (this.noteInt && this.errorState !== null)
        return !this.errorState;
      else
        return null;
    }
  }

}
</script>
