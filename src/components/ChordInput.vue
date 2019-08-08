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
    }
  }

}
</script>

