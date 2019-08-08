<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <b-form-input 
      v-model="val"
      :state="withinRange"
    />
    <div v-if="withinRange === false">
      <p>Note out of range.</p>
      <p>Range is between {{ beginNote }} and {{ endNote }}.</p>
    </div>
    <p>{{ note }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: String,
    label: String,
    beginNote: {
      type: String,
      required: true,
    },
    endNote: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      val: '',
      beginInt: this.convertValToInt(this.beginNote),
      endInt: this.convertValToInt(this.endNote),
    }
  },

  methods: {
    convertValToInt: function(val) {
      const note_dict = {
        'Cbb': -2,    'Cb': -1,    'C': 0,     'C#': 1,     'C##': 2,
        'Dbb': 0,     'Db': 1,     'D': 2,     'D#': 3,     'D##': 4,
        'Ebb': 2,     'Eb': 3,     'E': 4,     'E#': 5,     'E##': 6,
        'Fbb': 3,     'Fb': 4,     'F': 5,     'F#': 6,     'F##': 7,
        'Gbb': 5,     'Gb': 6,     'G': 7,     'G#': 8,     'G##': 9,
        'Abb': 7,     'Ab': 8,     'A': 9,     'A#': 10,    'A##': 11,
        'Bbb': 9,     'Bb': 10,    'B': 11,    'B#': 12,    'B##': 13
      };

      if (!val) return null;

      const octave = Number(val[val.length - 1]);
      const note_name = val.slice(0, val.length - 1);

      if (isNaN(octave) || note_dict[note_name] === undefined) {
        return null;
      } else {
        return note_dict[note_name] + (12 * octave);
      }
    }

  },
  
  computed: {
    note: function() {
      const note = this.convertValToInt(this.val);
      this.$store.dispatch("setCurNote", {"id": this.id, "val": this.val, "note": note})
      return note;
    },

    withinRange: function() {
      if (this.note || this.note === 0) {
        return (this.note >= this.beginInt) && (this.note <= this.endInt);
      } else {
        return null;
      }
    },
  }

}
</script>
