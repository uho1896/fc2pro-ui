<template>
  <div :style="styleBox" ref="box"
    @mousemove="onMoving" @mousedown="onMouseRelease" @mouseleave="onMouseRelease"
  >
    <div :style="styleAlpha"><slot name="alpha"></slot></div>
    <div :style="styleLine" @mousedown="onMouseDown"></div>
    <div :style="styleBeta"><slot name="beta"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'fc-container',
  props: {
    direction: {type: String, default: 'vertical'},
    minAlpha: {type: Number, default: 10},
    minBeta: {type: Number, default: 10},
    line: {type: Object, default: () => ({
      weight: '3px',
      color: '#F7941D',
      position: 50,
    })},
  },
  data() {
    return {
      linePosition: this.line.position,
      mouseDown: false,
    };
  },
  computed: {
    isHorizontal() {
      return /horizontal/i.test(this.direction);
    },
    styleBox() {
      let common = {
        'display': 'flex',
      };

      if (this.isHorizontal) {
        return Object.assign({
          'flex-direction': 'row',
        }, common);
      }

      return Object.assign({
        'flex-direction': 'column',
      }, common);
    },
    styleLine() {
      let common = {
        'background': this.line.color,
        'z-index': '1',
      };

      if (this.isHorizontal) {
        return Object.assign({
          'width': this.line.weight,
          'top': '0',
          'bottom': '0',
          'cursor': 'col-resize',
        }, common);
      }

      return Object.assign({
        'height': this.line.weight,
        'left': '0',
        'right': '0',
        'cursor': 'row-resize',
      }, common);
    },
    styleAlpha() {
      if (this.isHorizontal) {
        return {
          'width': `${this.linePosition}%`,
          'margin-right': this.line.weight,
        };
      }

      return {
        'height': `${this.linePosition}%`,
        'margin-bottom': this.line.weight,
      };
    },
    styleBeta() {
      if (this.isHorizontal) {
        return {
          'width': `${100 - this.linePosition}%`,
          'margin-left': this.line.weight,
        };
      }

      return {
        'height': `${100 - this.linePosition}%`,
        'margin-top': this.line.weight,
      };
    },
  },
  methods: {
    onMouseDown(event) {
      event.stopPropagation();
      this.mouseDown = !this.mouseDown;
    },
    onMouseRelease() {
      this.mouseDown = false;
    },
    onMoving(event) {
      if (!this.mouseDown) {
        return;
      }

      let total = this.$refs.box.clientHeight;
      let pos = Math.max(0, event.clientY - this.$refs.box.offsetTop);

      if (this.isHorizontal) {
        total = this.$refs.box.clientWidth;
        pos = Math.max(0, event.clientX - this.$refs.box.offsetLeft);
      }

      if (total && pos ) {
        let linePosition = (pos * 100 / total).toFixed(2);
        this.linePosition = Math.min(Math.max(linePosition, this.minAlpha), (100 - this.minBeta));
      }
    },
  },
}
</script>
