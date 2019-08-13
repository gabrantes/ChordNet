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
    inputNextChord: {
      type: Array,
    },
    keySignature: {
      type: String,
      default: 'C',
    }
  },

  data() {
    return {
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
        this.drawSystem();
      },
      deep: true,
    },

    nextChord: {
      handler() {
        this.drawSystem();
      },
      deep: true,
    },

    inputCurChord: {
      handler(val) {
        const voice_dict = {0: 'soprano', 1: 'alto', 2: 'tenor', 3: 'bass'};
        let invalid = false;
        for (let voice of val) {
          const voiceKey = voice_dict[voice.id];
          if (voice.noteInt) {
            // if valid note
            const note = voice.note.slice(0, -1) + '/' + voice.note.slice(-1);
            this.cur.chord[voiceKey].note.keys = [note];
          } else {
            this.cur.chord[voiceKey].note.keys = null;
            invalid = true;
          }

          if (voice.err !== null) {
            this.cur.chord[voiceKey].err = voice.err;
            invalid = true;
          }

          if (invalid) {
            // reset next-chord-display
            for (let voice in this.next.chord) {
              this.next.chord[voice].note.keys = null;
            }
          }          
        }
      },
      deep: true,
    },

    inputNextChord: {
      handler(val) {
        const voice_dict = {0: 'soprano', 1: 'alto', 2: 'tenor', 3: 'bass'};
        for (let id in val) {
          const voiceKey = voice_dict[id];
          const note = val[id].slice(0, -1) + '/' + val[id].slice(-1);
          this.next.chord[voiceKey].note.keys = [note];
        }
      },
      deep: true,
    },

    keySignature: {
      handler() {
        this.drawSystem();
      },
      deep: true,
    }
  },
  
  mounted() {    
    this.drawEmptySystem();
  }, 
  
  methods: {
    cleanDisplay: function() {
      let div = document.getElementById('display');
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    },

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

      // create all staves
      this.cur.stave.treble = this.createStave('treble', 20, 10);
      this.cur.stave.bass = this.createStave('bass', 20, 120);
      this.next.stave.treble = this.createStave('treble', 300, 10);
      this.next.stave.bass = this.createStave('bass', 300, 120);

      return context;
    },

    connectStaves: function(stave1, stave2) {
      let bracket = new VF.StaveConnector(stave1, stave2);      
      bracket.setType(VF.StaveConnector.type.BRACKET);
      bracket.setContext(this.context);

      let line = new VF.StaveConnector(stave1, stave2);
      line.setType(VF.StaveConnector.type.SINGLE);
      line.setContext(this.context);

      bracket.draw();
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

    drawSystem: function() {
      this.drawEmptySystem();
      this.drawChord(this.cur.chord, this.cur.stave);
      this.drawChord(this.next.chord, this.next.stave);
    },

    drawChord: function(chordObject, staveObject) {      
      let formatter = new VF.Formatter();
      let voices = this.createVoicesFromChord(chordObject, staveObject);
      
      if (voices.all.length > 0) {
        VF.Accidental.applyAccidentals(voices.all, this.keySignature);
        if (voices.treble.length > 0) {
          formatter.joinVoices(voices.treble);
        }
        if (voices.bass.length > 0) {
          formatter.joinVoices(voices.bass);
        }
        formatter.format(voices.all, 50);

        // draw each voice onto current renderer/context
        for (let voice of voices.all) {
          voice.setContext(this.context).draw();
        }
      }
    },

    createVoicesFromChord: function(chordObject, staveObject) {
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
            staveVoice.setStave(staveObject.treble);
            trebleVoices.push(staveVoice);
          }
          if (voice === 'tenor' || voice === 'bass') {
            staveVoice.setStave(staveObject.bass);
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