<template>
  <div>
    <div id="display"/>
  </div>  
</template>

<script>
import Vex from 'vexflow/src/index.js'
let VF = Vex.Flow;

export default {
  name: 'ProgressionDisplay',

  props: {
    inputChord: {
      type: Array,
    }
  },

  data() {
    return {
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
      curStave: {
        treble: null,
        bass: null,
      },
      nextStave: {
        treble: null,
        bass: null,
      }
    }
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
  
  mounted() {
    this.curStave.treble = this.createStave('treble', 10, 40);
    this.curStave.bass = this.createStave('bass', 10, 150);
    this.nextStave.treble = this.createStave('treble', 275, 40);
    this.nextStave.bass = this.createStave('bass', 275, 150);
    this.drawEmptySystem();
  }, 
  
  methods: {
    createStave: function(type, x, y) {
      return new VF.Stave(x, y, 100).addClef(type);
    },

    createContext: function() {
      let div = document.getElementById('display');
      let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      renderer.resize(400, 300);  // (width, height)
      let context = renderer.getContext();
      context.setFont('Arial', 10, '');
      return context;
    },
    
    drawEmptySystem: function() {
      this.cleanDisplay();
      this.context = this.createContext(); // NEW renderer/context
      this.curStave.treble.setContext(this.context).draw();
      this.curStave.bass.setContext(this.context).draw();
      this.nextStave.treble.setContext(this.context).draw();
      this.nextStave.bass.setContext(this.context).draw();
    },  

    cleanDisplay: function() {
      let div = document.getElementById('display');
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    },

    drawChord: function() {
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
            staveVoice.setStave(this.curStave.treble);
          }
          if (voice === 'tenor' || voice === 'bass') {
            staveVoice.setStave(this.curStave.bass);
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