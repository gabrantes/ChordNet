<template>
  <b-container>
    <b-row>
      <b-col v-for="voice in voiceInputs" :key="voice.id" sm="1">
        <VoiceInput
          :id="voice.id"
          :label="voice.label"
          :begin-note="voice.beginNote"
          :end-note="voice.endNote"
          :error-state="errorArr[voice.id]"
          @send:voice="setVoice"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VoiceInput from './VoiceInput'

export default {
  name: 'ChordInput',

  props: {
    category: {
      type: String,
      required: true,
    }
  },

  components: {
    VoiceInput
  },

  data() {
    return {
      // Settings for each VoiceInput component
      voiceInputs: [
        {
          id: 0,
          label: 'Soprano',
          beginNote: 'C4',
          endNote: 'G5',
        },
        {
          id: 1,
          label: 'Alto',
          beginNote: 'G3',
          endNote: 'D5',
        },
        {
          id: 2,
          label: 'Tenor',
          beginNote: 'C3',
          endNote: 'G4',
        },
        {
          id: 3,
          label: 'Bass',
          beginNote: 'E2',
          endNote: 'C4',
        }
      ],

      // chord voicing data
      voices: [
        {
          id: 0,
          note: null,
          noteInt: null,
          withinRange: null,
        },
        {
          id: 1,
          note: null,
          noteInt: null,
          withinRange: null,
        },
        {
          id: 2,
          note: null,
          noteInt: null,
          withinRange: null,
        },
        {
          id: 3,
          note: null,
          noteInt: null,
          withinRange: null,
        },
      ]
    }
  },

  methods: {
    /**
     * Event handler for data emitted by VoiceInputs
     * @param {Object} emitted The object emitted from the event
     */
    setVoice: function(emitted) {
      this.voices[emitted.id].note = emitted.note;
      this.voices[emitted.id].noteInt = emitted.noteInt;
      this.voices[emitted.id].withinRange = emitted.withinRange;
    }
  },

  computed: {
    /**
     * @return {Boolean} true if all 4 VoiceInputs have noteInts
     */
    allEntered: function () {
      let allEntered = this.voices.reduce(
        (acc, voice) => acc && (voice.noteInt || voice.noteInt === 0), true
      );
      return Boolean(allEntered)
    },

    /**
     * @return {Boolean} true if each noteInt is within its respective range
     */
    allWithinRange: function() {
      if (!this.allEntered) return null;

      const allWithinRange = this.voices.reduce(
        (acc, voice) => acc && voice.withinRange, true
      );
      return allWithinRange;
    },

    /**
     * For each voice, check if it overlaps with any neighboring voices
     * @return {Array.<Boolean>} ith element is true if ith voice has voice overlap
     */
    voiceOverlapArr: function() {
      if (!this.allEntered) return [null, null, null, null];

      let arr = [false, false, false, false];
      for (let i = 0; i < 4; ++i) {
        if (i < 3) {
          if (this.voices[i].noteInt < this.voices[i+1].noteInt) {
            arr[i] = true;
            arr[i+1] = true;
          }
        }
      }

      return arr;
    },

    /**
     * @return {Boolean} true if any voice overlaps are present, false otherwise
     */
    voiceOverlap: function() {
      if (!this.allEntered) return null;

      const voiceOverlap = this.voiceOverlapArr.reduce(
        (acc, overlap) => acc || overlap, false
      );
      return voiceOverlap;
    },    

    /**
     * For the 3 upper voices, check for any spacing errors
     * (Spacing error = more than 1 octave between voices)
     * @return {Array.<Boolean>} ith element is true if ith voice has spacing error
     */
    spacingErrorArr: function() {
      if (!this.allEntered) return [null, null, null];

      let arr = [false, false, false];
      for (let i = 0; i < 2; ++i) {
        if (this.voices[i].noteInt - this.voices[i+1].noteInt > 12) {
          arr[i] = true;
          arr[i+1] = true;
        }
      }

      return arr;
    },

    /**
     * @return {Boolean} true if any spacing errors are present, false otherwise
     */
    spacingError: function() {
      if (!this.allEntered) return null;

      const spacingError = this.spacingErrorArr.reduce(
        (acc, spacing) => acc || spacing, false
      )
      return spacingError;
    },

    /**
     * Used in setting display state of VoiceInputs
     * @return {Array.<Boolean>} ith element is true if ith voice has any type of error
     */
    errorArr: function() {
      if (!this.allEntered) return [null, null, null, null];

      let errorArr = this.voiceOverlapArr;
      errorArr = errorArr.map(
        (err, idx) => {
          if (idx < this.spacingErrorArr.length)
            return (err || this.spacingErrorArr[idx]);
          return err;
        }
      )
      return errorArr;
    },

    /**
     * Check if chord is valid: (1) all notes in range, (2) no errors
     * @return {Boolean} true if chord is valid
     */
    isValid: function() {
      if (!this.allEntered) return null;
      
      const isValid = this.allWithinRange && !this.voiceOverlap && !this.spacingError;
      if (isValid) {
        // send chord data
        this.$emit(
          'send:chord',
          this.voices.map(
            (voice) => {
              return {
                'id': voice.id,
                'note': voice.note,
                'noteInt': voice.noteInt
                };
            }
          )
        );
      }
      return isValid;
    },
  }

}
</script>

