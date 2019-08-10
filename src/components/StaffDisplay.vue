<template>
  <div>
    <div id="display"/>
    <b-button @click="drawChord">Add Notes</b-button>
    <b-button variant="danger" @click="drawEmptySystem">Clear System</b-button>
  </div>  
</template>

<script>
import Vex from 'vexflow/src/index.js'

export default {

  data() {
    return {
      vf: null,
      context: null,
      chord: {
        soprano: {
          note: {clef: 'treble', keys: ['A/4'], duration: 'q', stem_direction: 1},
          err: true,
        },
        alto: {
          note: {clef: 'treble', keys: ['C#/4'], duration: 'q', stem_direction: -1},
          err: false,
        },
        tenor: {
          note: {clef: 'bass', keys: ['E/3'], duration: 'q', stem_direction: 1},
          err: false,
        },
        bass: {
          note: {clef: 'bass', keys: ['A/2'], duration: 'q', stem_direction: -1},
          err: false,
        },
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
      trebleStave.addClef('treble');
      return trebleStave;
    },

    createBassStave: function() {
      let VF = this.vf;
      let bassStave = new VF.Stave(10, 150, 100); // (x, y, width)
      bassStave.addClef('bass');
      return bassStave;
    },

    createContext: function() {
      let VF = this.vf;
      let div = document.getElementById('display');
      let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      renderer.resize(150, 300);  // (width, height)
      let context = renderer.getContext();
      context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
      return context;
    },
    
    drawEmptySystem: function() {
      this.cleanDisplay();
      this.context = this.createContext(); // NEW renderer/context
      this.trebleStave.setContext(this.context).draw()
      this.bassStave.setContext(this.context).draw()
    },  

    cleanDisplay: function() {
      let div = document.getElementById('display');
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    },

    drawChord: function() {
      let VF = this.vf;
      this.drawEmptySystem();
      let formatter = new VF.Formatter();   
      
      const voice_settings = {num_beats: 1, beat_value: 4};
      let voices = [];
      
      for (let voice in this.chord) {
        if (this.chord[voice]['note']['keys'] !== null) {
          let staveVoice = new VF.Voice(voice_settings);
          let note = new VF.StaveNote(this.chord[voice]['note']);

          if (this.chord[voice]['err']) {
            note.setStyle({fillStyle: 'red', strokeStyle: 'red'});
          }

          staveVoice.addTickables([note]);

          if (voice === 'soprano' || voice === 'alto') {
            staveVoice.setStave(this.trebleStave);
          }
          if (voice === 'tenor' || voice === 'bass') {
            staveVoice.setStave(this.bassStave);
          }

          formatter.joinVoices([staveVoice]);
          voices.push(staveVoice);
        }
      }
      
      if (voices.length > 0) {
        formatter.format(voices, 50);

        // draw each voice onto current renderer/context
        for (let voice of voices) {
          voice.setContext(this.context).draw();
        }
      }
    },

  },
  
}
</script>