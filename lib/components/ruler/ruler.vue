<template>
  <div :style="rulerStyle" ref="ruler">
    <div :style="wrapperStyle"
      ref="wrapper"
      @click="onClick"
      @mousemove="onMouseMove"
    >
      <div v-for="idx in Array(parsedLength + 1).keys()"
        :key="idx"
        :style="getStyle(idx)"
        :title="getLabel(idx)"
        class="scale"
      >
        <div style="width: 100%; height: 100%;">
          <div v-if="showLable(idx)" :style="getLabelStyle(idx)">
            {{getLabel(idx)}}
          </div>
          <div :style="getScaleStyle(idx)" v-if="!isHighlightStart(idx) && !isHighlightEnd(idx)" />
          <img src="./assets/left.png" v-if="isHighlightStart(idx)"
            :style="leftBracketStyle" />
          <img src="./assets/right.png" v-if="isHighlightEnd(idx)"
            :style="rightBracketStyle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fc-ruler',
  props: {
    height: {type: Number, default: 80},
    rulerThickness: {type: Number, default: 2},
    rulerHeight: {type: Number, default: 20},
    rulerStep: {type: Number, default: 10},
    background: {type: String, default: 'black'},
    currentBG: {type: String, default: 'red'},
    highlightBG: {type: String, default: 'orange'},
    labelFormatter: {type: Function},
    valueFormatter: {type: Function},
    length: {type: [String, Number], default: 100},
    current: {type: [String, Number], default: 0},
    highlights: {type: Array},
  },
  data() {
    let parsedHighlights = [];
    if (Array.isArray(this.highlights)) {
      parsedHighlights = this.highlights.map(h => {
        return {
          start: this.formatValue(h.start),
          end: this.formatValue(h.end),
        };
      });
    }
    return {
      parsedHighlights,
      dragging: null,
    };
  },
  computed: {
    rulerStyle() {
      return {
        'overflow-x': 'auto',
        'overflow-y': 'hidden',
        'height': `${this.height}px`,
        'width': '100%',
      };
    },
    wrapperStyle() {
      return {
        'position': 'relative',
        'display': 'flex',
        'flex-direction': 'row',
        'width': `${(this.parsedLength + 2) * this.rulerStep}px`,
        'height': '100%',
      };
    },
    parsedLength() {
      return this.formatValue(this.length);
    },
    parsedCurrent() {
      return this.formatValue(this.current);
    },
    leftBracketStyle() {
      return {
        'width': 'auto',
        'height': '35%',
        'object-fit': 'contain',
        'cursor': 'col-resize',
        'position': 'absolute',
        'bottom': '-5px',
        'left': `${(this.rulerStep - this.rulerThickness) / 2}px`,
      };
    },
    rightBracketStyle() {
      return {
        'width': 'auto',
        'height': '35%',
        'object-fit': 'contain',
        'cursor': 'col-resize',
        'position': 'absolute',
        'bottom': '-5px',
        'left': `1px`,
      };
    },
  },
  watch: {
    highlights(val) {
      if (Array.isArray(val)) {
        this.parsedHighlights = this.highlights.map(h => {
          return {
            start: this.formatValue(h.start),
            end: this.formatValue(h.end),
          };
        });
      } else {
        this.parsedHighlights = [];
      }
    },
  },
  methods: {
    isCurrent(idx) {
      return idx == this.parsedCurrent;
    },
    isHighlightStart(idx) {
      for (let i=0, l=this.parsedHighlights.length; i<l; i++) {
        const val = this.parsedHighlights[i].start;
        if (val == idx) {
          return true;
        }
      }

      return false;
    },
    isHighlightEnd(idx) {
      for (let i=0, l=this.parsedHighlights.length; i<l; i++) {
        const val = this.parsedHighlights[i].end;
        if (val == idx) {
          return true;
        }
      }

      return false;
    },
    isHighlight(idx) {
      for (let i=0, l=this.parsedHighlights.length; i<l; i++) {
        const start = this.parsedHighlights[i].start;
        const end = this.parsedHighlights[i].end;
        if (idx >= start && idx <= end) {
          return true;
        }
      }

      return false;
    },
    getStyle(idx) {
      let obj = {
        width: `${this.rulerStep}px`,
        height: `${this.height}px`,
        position: 'absolute',
        left: `${this.rulerStep * idx}px`,
        bottom: '5px',
      };

      return obj;
    },
    getScaleStyle(idx) {
      let obj = {
        'position': 'absolute',
        'bottom': '2px',
        'left': `${(this.rulerStep - this.rulerThickness) / 2}px`,
        'width': `${this.rulerThickness}px`,
        'background': this.isCurrent(idx) ? this.currentBG :
          (this.isHighlight(idx) ? this.highlightBG : this.background),
      };

      if (idx % 10 == 0 || this.isCurrent(idx)) {
        obj['height'] = `${this.rulerHeight}px`;
      } else if (idx % 5 == 0) {
        obj['height'] = `${this.rulerHeight * 0.75}px`;
      } else {
        obj['height'] = `${this.rulerHeight * 0.5}px`;
      }

      return obj;
    },
    getLabelStyle(idx) {
      if (this.isCurrent(idx)) {
        return {
          'position': 'absolute',
          'bottom': `${this.rulerHeight + 15}px`,
          'color': this.currentBG,
        };
      } else {
        return {
          'position': 'absolute',
          'bottom': `${this.rulerHeight}px`,
        };
      }
    },
    formatValue(val) {
      if (this.valueFormatter) {
        return this.valueFormatter(val);
      } else {
        if (Number(val)) {
          return val;
        } else {
          const list = String(val).split(':');
          if (list.length < 3) {
            console.log('invalid value');
            return -1;
          }

          return Number(list[2]) + Number(list[1]) * 60 + Number(list[0]) * 3600;
        }
      }
    },
    showLable(idx) {
      return (idx % 10 == 0) || this.isCurrent(idx);
    },
    getLabel(idx) {
      if (this.labelFormatter) {
        return this.labelFormatter(idx);
      } else {
        const s = idx % 60;
        const m = Math.floor(idx / 60);
        const h = Math.floor(idx / 3600);
        return `${h < 10 ? '0'+h : h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
      }
    },
    getScaleElement(ele) {
      if (!ele) {
        return null;
      } else if (ele.className == 'scale') {
        return ele;
      } else {
        return this.getScaleElement(ele.parentElement || ele.parentNode);
      }
    },
    onClick(event) {
      if (this.dragging) {
        this.dragging = null;
        return;
      }

      const ele = this.getScaleElement(event.target);
      if (!ele) {
        return;
      }
      const idx = Math.floor(ele.offsetLeft / this.rulerStep);

      for (let i=0, l=this.parsedHighlights.length; i<l; i++) {
        if (idx == this.parsedHighlights[i].start) {
          this.dragging = {
            highlight: this.parsedHighlights[i],
            entity: 'start',
            min: 0,
            max: this.parsedHighlights[i].end - 1,
          };
        } else if (idx == this.parsedHighlights[i].end) {
          this.dragging = {
            highlight: this.parsedHighlights[i],
            entity: 'end',
            min: this.parsedHighlights[i].start + 1,
            max: this.parsedLength,
          };
        }
      }
    },
    onMouseMove(event) {
      const ele = this.getScaleElement(event.target);
      if (!this.dragging || !ele) {
        return;
      }

      const idx = Math.floor(ele.offsetLeft / this.rulerStep);
      this.dragging.highlight[this.dragging.entity] = Math.max(this.dragging.min, Math.min(idx, this.dragging.max));
    },
  },
}
</script>
