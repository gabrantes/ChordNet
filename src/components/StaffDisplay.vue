<template>
  <div id="display">
  </div>
</template>

<script>
// import _ from 'vexflow/releases/vexflow-debug.js'
import Vex from 'vexflow/src/index.js'

export default {

  data() {
    return {
      vf: null,
      context: null,
      notes: [
        {clef: "treble", keys: ["c/4"], duration: "q"},
        {clef: "treble", keys: ["e/4"], duration: "q"},
        {clef: "treble", keys: ["g/4"], duration: "q"},
        {clef: "treble", keys: ["c/5", "e/4", "g/4"], duration: "q"},
      ],
    }
  },

  mounted() {
    this.init();
    let VF = this.vf;
    let stave = this.new_stave();
    stave.draw();
    let notes = this.add_notes(this.notes);
    let voice = this.new_voice(notes);
    voice.draw(this.context, stave);
  },

  methods: {
    init: function() {
      let VF = Vex.Flow;
      this.vf = VF;
      let div = document.getElementById("display");
      let renderer = new VF.Renderer(div,VF.Renderer.Backends.SVG);
      renderer.resize(500, 500);
      let context = renderer.getContext();
      context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
      this.context = context;
    },

    new_stave: function() {
      let VF = this.vf;
      // Create a stave of width 400 at position 10, 40 on the canvas.
      let stave = new VF.Stave(10, 40, 400);
      // Add a clef and time signature.
      //stave.addClef("treble").addTimeSignature("4/4");
      stave.addClef("treble");
      // Connect it to the rendering context and draw!
      return stave.setContext(this.context);
    },

    new_voice: function(notes) {
      let VF = this.vf;
      // Create a voice in 4/4 and add above notes
      let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
      voice.addTickables(notes);
      // Format and justify the notes to 400 pixels.
      let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
      // Render voice
      return voice;
    },

    add_notes: function(note_data) {
      let VF = this.vf;
      let notes = [];
      for (var n in note_data) {
        let note = new VF.StaveNote(note_data[n]);
        notes.push(note);
      }
      return notes;
    }
},

  updated() {
    this.init()
  },

}
</script>