<template>
  <b-container>
      <KeyInput class="sub"/>
      <CurrentChordInput class="sub" />
      <NextChordOptions class="sub" :mode="1" />
  </b-container>
</template>

<script>
import KeyInput from './KeyInput.vue'
import CurrentChordInput from './CurrentChordInput.vue'
import NextChordOptions from './NextChordOptions.vue'

export default {
  name: 'MasterInput',

  components: {KeyInput, CurrentChordInput, NextChordOptions},

  props: {},

  data() {
    return null;
  },

  methods: {},

  computed: {}

}
</script>

<style scoped>
.sub {
  padding: 10px 10px 10px 10px;
}
</style>
