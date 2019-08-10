<template>
  <div>
    <div id="display"/>
    <b-button @click="drawChord">Add Notes</b-button>
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
      chord: [
        {
          id: 0,
          note: 'A4',
        },
        {
          id: 1,
          note: 'C#4',
        },
        {
          id: 2,
          note: 'E3',
        },
        {
          id: 3,
          note: 'A2',
        },
      ],
      vfNotes: [
        {clef: "treble", keys: ["A/4"], duration: "q", stem_direction: 1},
        {clef: "treble", keys: ["C#/4"], duration: "q", stem_direction: -1},
        {clef: "bass", keys: ["E/3"], duration: "q", stem_direction: 1},
        {clef: "bass", keys: ["A/2"], duration: "q", stem_direction: -1},
      ],
      mNotes: {
        treble: [
          {clef: "treble", keys: ["A/4"], duration: "q"},
          {clef: "treble", keys: ["C#/4"], duration: "q"},
        ],
        bass: [
          {clef: "bass", keys: ["E/3"], duration: "q"},
          {clef: "bass", keys: ["A/2"], duration: "q"},
        ]
      },
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
      let trebleStave = new VF.Stave(10, 40, 100); // (x, y, width)
      trebleStave.addClef("treble");
      return trebleStave;
    },

    createBassStave: function() {
      let VF = this.vf;
      let bassStave = new VF.Stave(10, 150, 100); // (x, y, width)
      bassStave.addClef("bass");
      return bassStave;
    },

    createContext: function() {
      let VF = this.vf;
      let div = document.getElementById("display");
      let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      renderer.resize(150, 300);  // (width, height)
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

    drawChord: function() {
      let VF = this.vf;
      this.drawEmptySystem();   
      
      let voice_settings = {num_beats: 1, beat_value: 4};
      let voices = [];
      for (let i = 0; i < 4; ++i) {
        voices.push(new VF.Voice(voice_settings));
      }
      
      let notes = this.vfNotes.map((note) => new VF.StaveNote(note));
      voices = voices.map(
        (voice, index) => {
          let stave = (index < 2) ? this.trebleStave : this.bassStave;
          voice.addTickables([notes[index]]).setStave(stave);
          return voice;
        }
      )

      let formatter = new VF.Formatter();
      for (let i = 0; i < 4; ++i) {
        formatter.joinVoices([voices[i]]);
      }
      formatter.format(voices, 50);

      // draw on current renderer/context
      for (let i = 0; i < 4; ++i) {
        voices[i].setContext(this.context).draw();
      }
    },
  }
}
</script>