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
    inputCurChord: {
      type: Array,
    },
    keySignature: {
      type: String,
      default: 'A',
    }
  },

  data() {
    return {
      // keySignature: 'A',
      context: null,
      cur: {
        chord: {
          soprano: {
            note: {clef: 'treble', keys: null, duration: 'q', stem_direction: 1},
            err: false,
          },
          alto: {
            note: {clef: 'treble', keys: null, duration: 'q', stem_direction: -1},
            err: false,
          },
          tenor: {
            note: {clef: 'bass', keys: null, duration: 'q', stem_direction: 1},
            err: false,
          },
          bass: {
            note: {clef: 'bass', keys: null, duration: 'q', stem_direction: -1},
            err: false,
          },
        },
        stave: {
          treble: null,
          bass: null,
        }
      },
      next: {
        chord: {
          soprano: {
            note: {clef: 'treble', keys: null, duration: 'q', stem_direction: 1},
            err: false,
          },
          alto: {
            note: {clef: 'treble', keys: null, duration: 'q', stem_direction: -1},
            err: false,
          },
          tenor: {
            note: {clef: 'bass', keys: null, duration: 'q', stem_direction: 1},
            err: false,
          },
          bass: {
            note: {clef: 'bass', keys: null, duration: 'q', stem_direction: -1},
            err: false,
          },
        },
        stave: {
          treble: null,
          bass: null,
        }
      }
    }
  },

  computed: {
    curChord() {
      return this.cur.chord;
    },
    
    nextChord() {
      return this.next.chord;
    },
  },

  watch: {
    curChord: {
      handler() {
        this.drawChord();
      },
      deep: true,
    },

    inputCurChord: {
      handler(val) {
        // !!!
        // MODULARIZE / GENERALIZE ME FOR inputNextChord
        // !!!
        const voice_dict = {0: 'soprano', 1: 'alto', 2: 'tenor', 3: 'bass'};
        for (let voice of val) {
          const voiceKey = voice_dict[voice.id];
          if (voice.noteInt) {
            // if valid note
            const note = voice.note.slice(0, -1) + '/' + voice.note.slice(-1);
            this.cur.chord[voiceKey].note.keys = [note];
          } else {
            this.cur.chord[voiceKey].note.keys = null;
          }
          if (voice.err) {
            this.cur.chord[voiceKey].err = voice.err;
          }          
        }
      },
      deep: true,
    },

    keySignature: {
      handler() {
        this.drawChord();
      },
      deep: true,
    }
  },
  
  mounted() {    
    this.drawEmptySystem();
  }, 
  
  methods: {
    createStave: function(type, x, y) {
      return new VF.Stave(x, y, 200).addClef(type);
    },

    createContext: function() {
      let div = document.getElementById('display');
      let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      renderer.resize(360, 200);  // (width, height)
      let context = renderer.getContext();
      context.setFont('Arial', 10, '');
      context.scale(0.7, 0.7);

      this.cur.stave.treble = this.createStave('treble', 20, 10);
      this.cur.stave.bass = this.createStave('bass', 20, 120);
      this.next.stave.treble = this.createStave('treble', 300, 10);
      this.next.stave.bass = this.createStave('bass', 300, 120);

      return context;
    },

    connectStaves: function(stave1, stave2) {
      let connector = new VF.StaveConnector(stave1, stave2);
      let line = new VF.StaveConnector(stave1, stave2);
      connector.setType(VF.StaveConnector.type.BRACKET);
      connector.setContext(this.context);
      line.setType(VF.StaveConnector.type.SINGLE);
      connector.setContext(this.context);
      line.setContext(this.context);
      connector.draw();
      line.draw();
    },
    
    drawEmptySystem: function() {
      this.cleanDisplay();
      this.context = this.createContext(); // NEW renderer/context

      this.cur.stave.treble.addKeySignature(this.keySignature);
      this.next.stave.treble.addKeySignature(this.keySignature);
      this.cur.stave.bass.addKeySignature(this.keySignature);
      this.next.stave.bass.addKeySignature(this.keySignature);

      this.cur.stave.treble.setContext(this.context);      
      this.cur.stave.bass.setContext(this.context);
      this.next.stave.treble.setContext(this.context);      
      this.next.stave.bass.setContext(this.context);
      
      this.cur.stave.treble.draw();
      this.cur.stave.bass.draw();
      this.next.stave.treble.draw();
      this.next.stave.bass.draw();

      this.connectStaves(this.cur.stave.treble, this.cur.stave.bass);
      this.connectStaves(this.next.stave.treble, this.next.stave.bass);
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
      
      let trebleVoices = [];
      let bassVoices = [];
      let voices = [];
      
      const curVoices = this.createVoicesFromChord(this.cur.chord);
      trebleVoices = trebleVoices.concat(curVoices.treble);
      bassVoices = bassVoices.concat(curVoices.bass);
      voices = voices.concat(curVoices.all);

      const nextVoices = this.createVoicesFromChord(this.next.chord);
      trebleVoices = trebleVoices.concat(nextVoices.treble);
      bassVoices = bassVoices.concat(nextVoices.bass);
      voices = voices.concat(nextVoices.all);
      
      if (voices.length > 0) {
        VF.Accidental.applyAccidentals(voices, this.keySignature);
        if (trebleVoices.length > 0) {
          formatter.joinVoices(trebleVoices);
        }
        if (bassVoices.length > 0) {
          formatter.joinVoices(bassVoices);
        }
        formatter.format(voices, 50);

        // draw each voice onto current renderer/context
        for (let voice of voices) {
          voice.setContext(this.context).draw();
        }
      }
    },

    createVoicesFromChord: function(chordObject) {
      let voices = [];
      let trebleVoices = [];
      let bassVoices = [];

      const voice_settings = {num_beats: 1, beat_value: 4};

      for (let voice in chordObject) {
        if (chordObject[voice]['note']['keys'] !== null) {
          let staveVoice = new VF.Voice(voice_settings);
          const note = this.createNote(chordObject[voice]);
          staveVoice.addTickables([note]);

          if (voice === 'soprano' || voice === 'alto') {
            staveVoice.setStave(this.cur.stave.treble);
            trebleVoices.push(staveVoice);
          }
          if (voice === 'tenor' || voice === 'bass') {
            staveVoice.setStave(this.cur.stave.bass);
            bassVoices.push(staveVoice);
          }          
          voices.push(staveVoice);
        }
      }

      return {
        'all': voices,
        'treble': trebleVoices,
        'bass': bassVoices
      };
    },

    createNote: function(voiceObject) {
      let note = new VF.StaveNote(voiceObject.note);
      
      // check for errors
      if (voiceObject.err) {
        note.setStyle({fillStyle: 'red', strokeStyle: 'red'});
      }
      return note;
    }

  },
  
}
</script>

<style scoped>
</style>