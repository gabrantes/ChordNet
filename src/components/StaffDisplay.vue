<template>
  <div>
    <div id="display"/>
    <b-button @click="drawNotes">Add Notes</b-button>
    <b-button variant="danger" @click="drawEmptySystem">Clear System</b-button>
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
      ],
      trebleStave: null,
      bassStave: null,
    }
  },
  
  mounted() {
    this.vf = Vex.Flow;
    this.trebleStave = this.createTrebleStave();
    this.bassStave = this.createBassStave();
    this.drawEmptySystem();
  },

  methods: {
    createTrebleStave: function() {
      let VF = this.vf;
      let trebleStave = new VF.Stave(10, 40, 200);
      trebleStave.addClef("treble");
      return trebleStave;
    },

    createBassStave: function() {
      let VF = this.vf;
      let bassStave = new VF.Stave(10, 120, 200);
      bassStave.addClef("bass");
      return bassStave;
    },

    createContext: function() {
      let VF = this.vf;
      let div = document.getElementById("display");
      let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      renderer.resize(250, 300);
      let context = renderer.getContext();
      context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
      return context;
    },
    
    drawEmptySystem: function() {
      this.cleanDisplay();
      this.context = this.createContext(); // NEW renderer/context
      this.trebleStave.setContext(this.context).draw()
      this.bassStave.setContext(this.context).draw()
    },  

    cleanDisplay: function() {
      let div = document.getElementById("display");
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      return;
    },

    drawNotes: function() {
      let VF = this.vf;
      this.drawEmptySystem();
      let notes = this.notes.map((note) => new VF.StaveNote(note));
      let voice = new VF.Voice({num_beats: 3, beat_value: 4});
      voice.addTickables(notes);
      // eslint-disable-next-line
      let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);
      // draw on current renderer/context
      voice.draw(this.context, this.trebleStave);
    }
  }
}
</script>