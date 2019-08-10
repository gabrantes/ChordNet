<template>
  <div>
    <div id="display"/>
    <!-- <b-button @click="drawChord">Add Notes</b-button>
    <b-button variant="danger" @click="drawEmptySystem">Clear System</b-button> -->
  </div>  
</template>

<script>
import Vex from 'vexflow/src/index.js'

export default {

  props: {
    inputChord: {
      type: Array,
    }
  },

  data() {
    return {
      vf: null,
      context: null,
      chord: {
        soprano: {
          note: {clef: 'treble', keys: [null], duration: 'q', stem_direction: 1},
          err: false,
        },
        alto: {
          note: {clef: 'treble', keys: [null], duration: 'q', stem_direction: -1},
          err: false,
        },
        tenor: {
          note: {clef: 'bass', keys: [null], duration: 'q', stem_direction: 1},
          err: false,
        },
        bass: {
          note: {clef: 'bass', keys: [null], duration: 'q', stem_direction: -1},
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

  watch: {
    chord: {
      handler() {
        this.drawChord();
      },
      deep: true,
    },

    inputChord: {
      handler(val) {
        const voice_dict = {0: 'soprano', 1: 'alto', 2: 'tenor', 3: 'bass'};
        for (let voice of val) {
          const key = voice_dict[voice.id];
          if (voice.note) {
            const note = voice.note.slice(0, -1) + '/' + voice.note.slice(-1);
            this.chord[key].note.keys = [note];
          } else {
            this.chord[key].note.keys = null;
          }
          this.chord[key].err = voice.err;
        }
      },
      deep: true,
    }
   
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
          const note = this.createNote(this.chord[voice]);
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

    createNote: function(voiceObject) {
      let VF = this.vf;
      let note = new VF.StaveNote(voiceObject.note);
      const noteStr = voiceObject.note.keys[0];

      // check for accidentals
      if (noteStr.length > 3) {
        const accidental = noteStr.slice(1, -2);
        note.addAccidental(0, new VF.Accidental(accidental));
      }

      // check for errors
      if (voiceObject.err) {
        note.setStyle({fillStyle: 'red', strokeStyle: 'red'});
      }
      return note;
    }

  },
  
}
</script>