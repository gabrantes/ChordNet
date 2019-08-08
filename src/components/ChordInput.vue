<template>
  <b-container>
    <b-row>
      <b-col v-for="voice in voiceInputs" :key="voice.id" sm="3">
        <VoiceInput
          :id="voice.id"
          :label="voice.label"
          :category="category"
          :begin-note="voice.beginNote"
          :end-note="voice.endNote"
          :error-state="errorArr[voice.id]"
          @set:voice="setVoice"
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
    setVoice: function(emitted) {
      this.voices[emitted.id].note = emitted.note
      this.voices[emitted.id].noteInt = emitted.noteInt
      this.voices[emitted.id].withinRange = emitted.withinRange
    }
  },

  computed: {
    allEntered: function () {
      let allEntered = this.voices.reduce(
        (acc, voice) => acc && (voice.noteInt || voice.noteInt === 0), true
      )
      return Boolean(allEntered)
    },

    allWithinRange: function() {
      if (!this.allEntered) return null
      const allWithinRange = this.voices.reduce(
        (acc, voice) => acc && voice.withinRange, true
      )
      return allWithinRange;
    },

    voiceOverlapArr: function() {
      if (!this.allEntered) return [null, null, null, null]

      let arr = [false, false, false, false]
      for (let i = 0; i < 4; ++i) {
        if (i < 3) {
          if (this.voices[i].noteInt < this.voices[i+1].noteInt) {
            arr[i] = true
            arr[i+1] = true
          }
        } else {
          if (this.voices[i].noteInt > this.voices[i-1].noteInt) {
            arr[i] = true
            arr[i-1] = true
          }
        }
      }

      return arr
    },

    voiceOverlap: function() {
      const voiceOverlap = this.voiceOverlapArr.reduce(
        (acc, overlap) => acc || overlap, false
      )
      return voiceOverlap
    },    

    spacingErrorArr: function() {
      if (!this.allEntered) return [null, null, null]

      let arr = [false, false, false]
      for (let i = 0; i < 2; ++i) {
        if (this.voices[i].noteInt - this.voices[i+1].noteInt > 12) {
          arr[i] = true
          arr[i+1] = true
        }
      }

      return arr
    },

    spacingError: function() {
      const spacingError = this.spacingErrorArr.reduce(
        (acc, spacing) => acc || spacing, false
      )
      return spacingError
    },

    errorArr: function() {
      if (!this.allEntered) return [null, null, null, null]

      let errorArr = this.voiceOverlapArr
      errorArr = errorArr.map(
        (err, idx) => {
          if (idx < this.spacingErrorArr.length)
            return (err || this.spacingErrorArr[idx])
          return err
        }
      )
      return errorArr
    },

    isValid: function() {
      if (!this.allEntered) return null
      
      return (this.allWithinRange && !this.voiceOverlap && !this.spacingError)
    },
  }

}
</script>

