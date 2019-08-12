<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <b-form-input 
      class="vInput"
      v-model="note"
      :placeholder="placeholder"
      :state="inputState"
      @input="handleInput"
      :disabled="disabled"/>
    <small 
      class="redtext"
      v-show="inRange === false">
        Range is between {{ beginNote }} and {{ endNote }}.
    </small>
    <!-- <p>{{ noteInt }}</p> -->
  </div>
</template>

<script>
export default {
  name: 'VoiceInput',
  
  props: {
    id: {
      type: Number,
      required: true,
    },

    label: String,
    placeholder: String,

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
    },

    disabled: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      note: '', // Value in text input -- a pitch represented as a string
      noteInt: null,
      beginInt: this.convertNoteToInt(this.beginNote),
      endInt: this.convertNoteToInt(this.endNote),
      inRange: null,
    }
  },

  methods: {
    /**
     * Event handler when text input changes
     */
    handleInput: function() {
      // update component data
      this.noteInt = this.convertNoteToInt(this.note);
      this.inRange = this.checkRange();

      // send voice data
        this.$emit(
          'send:voice', 
          {
            'id': this.id, 
            'note': this.note, 
            'noteInt': this.noteInt, 
            'inRange': this.inRange
          }
        );

      // if (this.noteInt || this.noteInt === 0) {
          
      // }      
      return;
    },

    /**
     * Convert a musical pitch from string representation to an integer.
     * @param {String} note The string representation of a musical pitch, e.g. 'C4'.
     * @return {Number} The corresponding integer of the pitch.
     */
    convertNoteToInt: function(note) {
      if (!note) return null;

      const note_dict = {
        'cbb': -2,    'cb': -1,    'c': 0,     'c#': 1,     'c##': 2,
        'dbb': 0,     'db': 1,     'd': 2,     'd#': 3,     'd##': 4,
        'ebb': 2,     'eb': 3,     'e': 4,     'e#': 5,     'e##': 6,
        'fbb': 3,     'fb': 4,     'f': 5,     'f#': 6,     'f##': 7,
        'gbb': 5,     'gb': 6,     'g': 7,     'g#': 8,     'g##': 9,
        'abb': 7,     'ab': 8,     'a': 9,     'a#': 10,    'a##': 11,
        'bbb': 9,     'bb': 10,    'b': 11,    'b#': 12,    'b##': 13
      };      

      const octave = Number(note[note.length - 1]);
      const note_name = note.slice(0, note.length - 1);

      if (isNaN(octave) || !(note_name.toLowerCase() in note_dict)) {
        // unable to convert note
        return null;
      } else {
        return note_dict[note_name.toLowerCase()] + (12 * octave);
      }
    },

    /**
     * Check if this.noteInt is within the valid range of the voice
     * @return {Boolean} true if this.noteInt is within range, false otherwise
     */
    checkRange: function() {
      if (this.noteInt || this.noteInt === 0) {
        const inRange = (this.noteInt >= this.beginInt)
                          && (this.noteInt <= this.endInt);      
        return inRange;
      } else {
        // Invalid input
        return null;
      }
    },   

  },
  
  computed: {
    /**
     * Determine display state of text input, shows errors if any
     * @return {Boolean}
     */
    inputState: function() {
      if (this.noteInt && this.errorState !== null)
        return (!this.errorState && this.inRange);
      else
        return null;
    }
  }

}
</script>

<style scoped>
.redtext {
  color: #dc3545;
}

.vInput {
  width: 100%;
}
</style>
