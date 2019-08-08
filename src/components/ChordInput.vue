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
        />
        <!-- TODO: Change category prop from hard-coded to a prop in VoicingsForm -->
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
          endNote: 'G5'
        },
        {
          id: 1,
          label: 'Alto',
          beginNote: 'G3',
          endNote: 'D5'
        },
        {
          id: 2,
          label: 'Tenor',
          beginNote: 'C3',
          endNote: 'G4'
        },
        {
          id: 3,
          label: 'Bass',
          beginNote: 'E2',
          endNote: 'C4'
        }
      ]
    }
  },

  computed: {
    voices: function() {
      if (this.category === "currentVoices")
        return this.$store.getters.getCurrentVoices;
      return null
    },

    allEntered: function () {
      const allEntered = this.voices.reduce(
        (acc, voice) => acc && (voice.note || voice.note === 0), true
      )
      return allEntered
    },

    allWithinRange: function() {
      if (!this.allEntered) return null
      const allWithinRange = this.voices.reduce(
        (acc, voice) => acc && voice.withinRange, true
      )
      return allWithinRange;
    },

    voiceOverlap: function() {
      if (!this.allEntered) return null
      const voiceOverlap = this.voices.reduce(
        (acc, voice, idx, arr) => {
          if (idx < 3) {
            return acc || (voice.note < arr[idx + 1].note)
          } else {
            return acc
          }
        }, false
      )
      return voiceOverlap
    },    

    isValid: function() {
      if (!this.allEntered) return null
      return (this.allWithinRange && !this.voiceOverlap)
    },
  }

}
</script>

