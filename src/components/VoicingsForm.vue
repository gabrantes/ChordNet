<template>
  <b-container>
    <b-row>
      <b-col v-for="voice in voices" :key="voice.id" sm="3">
        <VoiceInput
          :label="voice.label"
          :begin-note="voice.beginNote"
          :end-note="voice.endNote"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VoiceInput from './VoiceInput'

export default {
  name: 'VoicingsForm',

  components: {
    VoiceInput
  },

  data() {
    return {
      voices: [
        {
          id: 0,
          name: 'soprano',
          label: 'Soprano',
          beginNote: 'C4',
          endNote: 'G5'
        },
        {
          id: 1,
          name: 'alto',
          label: 'Alto',
          beginNote: 'G3',
          endNote: 'D5'
        },
        {
          id: 2,
          name: 'tenor',
          label: 'Tenor',
          beginNote: 'C3',
          endNote: 'G4'
        },
        {
          id: 3,
          name: 'bass',
          label: 'Bass',
          beginNote: 'E2',
          endNote: 'C4'
        }
      ]
    }
  },

}
</script>

