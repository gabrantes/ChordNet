<template>
  <b-container class="box">    
    <b-row align-h="center" class="subInput">
      <h4>Current Chord Voicings</h4>
    </b-row>    

    <b-row
      align-h="end"
      v-for="(voice, index) in voiceInputs" 
      :key="voice.id">
      <b-col>
        <div class="inputGroup">
          <VoiceInput
            class="subInput"
            :id="voice.id"
            :label="voice.label"
            :placeholder="voice.placeholder"
            :begin-note="voice.beginNote"
            :end-note="voice.endNote"
            :error-state="errorArr[voice.id]"
            :disabled="disabled"
            @send:voice="setVoice"/>
          <div class="messages">
            <small
              class="redtext" 
              v-show="spacingErrorArr[index]">
                Spacing Error
            </small>
            <small 
              class="redtext" 
              v-show="voiceOverlapArr[index]">
                Voice Overlap
            </small>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VoiceInput from './VoiceInput'

export default {
  name: 'CurrentChordInput',

  components: {
    VoiceInput
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // Settings for each VoiceInput component
      voiceInputs: [
        {
          id: 0,
          label: 'Soprano',
          placeholder: 'e.g. "C5"',
          beginNote: 'C4',
          endNote: 'G5',
        },
        {
          id: 1,
          label: 'Alto',
          placeholder: 'e.g. "E4"',
          beginNote: 'G3',
          endNote: 'D5',
        },
        {
          id: 2,
          label: 'Tenor',
          placeholder: 'e.g. "G3"',
          beginNote: 'C3',
          endNote: 'G4',
        },
        {
          id: 3,
          label: 'Bass',
          placeholder: 'e.g. "C3"',
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
          inRange: null,
        },
        {
          id: 1,
          note: null,
          noteInt: null,
          inRange: null,
        },
        {
          id: 2,
          note: null,
          noteInt: null,
          inRange: null,
        },
        {
          id: 3,
          note: null,
          noteInt: null,
          inRange: null,
        },
      ],

      isValid: null,
    }
  },

  methods: {
    /**
     * Event handler for data emitted by VoiceInputs
     * @param {Object} emitted The object emitted from the event
     */
    setVoice: function(emitted) {
      // update component data
      this.voices[emitted.id].note = emitted.note;
      this.voices[emitted.id].noteInt = emitted.noteInt;
      this.voices[emitted.id].inRange = emitted.inRange;

      const chordDisplay = this.voices.map(
        (voice, index) => {
          return {
            'id': voice.id,
            'note': voice.note,
            'noteInt': voice.noteInt,
            'err': this.errorArr[index],
          }
        } 
      )
      this.$emit('send:chord-display', chordDisplay);

      if (this.allEntered()) {
        if (this.validate()) {
          // get only relevant chord data
          const chord = this.voices.map(
            (voice) => {
              return {
                'id': voice.id,
                'note': voice.note,
                'noteInt': voice.noteInt
                };
            }
          );

          // send chord data
          this.$emit('send:chord', chord);
        }
      }
    },

    /**
     * @return {Boolean} true if all 4 VoiceInputs have noteInts
     */
    allEntered: function () {
      const allEntered = this.voices.reduce(
        (acc, voice) => acc && (voice.noteInt || voice.noteInt === 0), true
      );
      return !!allEntered;
    },

    /**
     * @return {Boolean} true if each noteInt is within its respective range
     */
    allInRange: function() {
      if (!this.allEntered()) {
        return null;
      }

      const allInRange = this.voices.reduce(
        (acc, voice) => acc && voice.inRange, true
      );
      return allInRange;
    },    

    /**
     * @return {Boolean} true if any voice overlaps are present, false otherwise
     */
    voiceOverlap: function() {
      if (!this.allEntered()) {
        return null;
      }

      const voiceOverlap = this.voiceOverlapArr.reduce(
        (acc, overlap) => acc || overlap, false
      );
      return voiceOverlap;
    },    

    /**
     * @return {Boolean} true if any spacing errors are present, false otherwise
     */
    spacingError: function() {
      if (!this.allEntered()) {
        return null;
      }

      const spacingError = this.spacingErrorArr.reduce(
        (acc, spacing) => acc || spacing, false
      );
      return spacingError;
    },

    /**
     * Check if chord is valid: (1) all notes in range, (2) no errors
     * @return {Boolean} true if chord is valid
     */
    validate: function() {
      if (!this.allEntered()) {
        return null;
      }
      
      const isValid = this.allInRange() && !this.voiceOverlap() && !this.spacingError();
      
      return isValid;
    },


  },

  computed: {
    /**
     * For each voice, check if it overlaps with any neighboring voices
     * @return {Array.<Boolean>} ith element is true if ith voice has voice overlap
     */
    voiceOverlapArr: function() {
      let arr = [false, false, false, false];
      for (let i = 0; i < 3; ++i) {
        let curVoiceEntered = (this.voices[i].noteInt || this.voices[i].noteInt === 0);
        let nextVoiceEntered = (this.voices[i+1].noteInt || this.voices[i+1].noteInt === 0);

        if (curVoiceEntered && nextVoiceEntered) {
          if (this.voices[i].noteInt < this.voices[i+1].noteInt) {
            // overlap detected
            arr[i] = true;
            arr[i+1] = true;
          }
        }
      }
      return arr;
    },
    
    /**
     * For the 3 upper voices, check for any spacing errors
     * (Spacing error = more than 1 octave between voices)
     * @return {Array.<Boolean>} ith element is true if ith voice has spacing error
     */
    spacingErrorArr: function() {
      let arr = [false, false, false, undefined];
      for (let i = 0; i < 2; ++i) {
        let curVoiceEntered = (this.voices[i].noteInt || this.voices[i].noteInt === 0);
        let nextVoiceEntered = (this.voices[i+1].noteInt || this.voices[i+1].noteInt === 0);

        if (curVoiceEntered && nextVoiceEntered) {
          if (this.voices[i].noteInt - this.voices[i+1].noteInt > 12) {
            // spacing error detected
            arr[i] = true;
            arr[i+1] = true;
          }
        }        
      }
      return arr;
    },

    /**
     * Used in setting display state of VoiceInputs
     * @return {Array.<Boolean>} ith element is true if ith voice has any type of error
     */
    errorArr: function() {
      // errorArr is voiceOverlapArr OR'd with spacingErrorArr element-wise
      const errorArr = this.voiceOverlapArr.map(
        (err, idx) => {
          if (idx < this.spacingErrorArr.length) {
            return (err || this.spacingErrorArr[idx]);
          }
          return err;
        }
      );
      return errorArr;
    },

  }

}
</script>

<style scoped>
.redtext {
  color: #dc3545;
}

.messages {
  margin-left: auto;
  max-width: 400px;
}

.inputGroup {
  margin-bottom: 25px;
}

.subInput {
  margin-left: auto;
  width: 100%;
  max-width: 400px;
}

@media only screen and (max-width: 660px) {
  .subInput {
    margin: auto;
    width: 100%;
    max-width: 400px;
  }

  .messages {
    margin: auto;
    max-width: 400px;
  }
}
</style>
