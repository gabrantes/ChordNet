<template>
  <div>
    <div id="display"/>
    <b-button @click="addNotes"></b-button>
    <b-button variant="danger" @click="drawEmptySystem()"></b-button>
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
    this.drawEmptySystem();
  },

  methods: {
    cleanDisplay: function() {
      let div = document.getElementById("display");
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      return;
    },

    drawEmptySystem: function() {
      this.cleanDisplay();
      let context = this.createContext(); // NEW renderer/context

      let trebleStave = this.getTrebleStave();
      trebleStave.setContext(context).draw()

      let bassStave = this.getBassStave();
      bassStave.setContext(context).draw()
    },

    createContext: function() {
      let VF = this.vf;
      let div = document.getElementById("display");
      let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      renderer.resize(250, 300);
      this.context = renderer.getContext();
      this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
      return this.context;
    },

    getContext: function() {
      if (this.context == null) {
        this.context = this.createContext();
      }      
      return this.context;
    },

    getTrebleStave: function() {
      if (this.trebleStave === null) {
        let VF = this.vf;
        this.trebleStave = new VF.Stave(10, 40, 200);
        this.trebleStave.addClef("treble");
      }
      return this.trebleStave;
    },

    getBassStave: function() {
      if (this.bassStave === null) {
        let VF = this.vf;
        this.bassStave = new VF.Stave(10, 120, 200);
        this.bassStave.addClef("bass");
      }
      return this.bassStave;
    },

    addNotes: function() {
      let VF = this.vf;
      let notes = this.notes.map((note) => new VF.StaveNote(note));
      let voice = new VF.Voice({num_beats: 3, beat_value: 4});
      voice.addTickables(notes);
      // eslint-disable-next-line
      let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);
      // draw on current renderer/context
      voice.draw(this.getContext(), this.getTrebleStave());
    }
  }
}
</script>