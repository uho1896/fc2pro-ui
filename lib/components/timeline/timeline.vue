<template>
  <div class="box">
    <div :style="styleTimeLine">
      <div v-for="(d, idx) in data" :key="idx" :style="styleTimelineItem">
        <div :style="styleTitle">
          {{d.title}}
        </div>
        <div :style="styleContent"
          :class="getContentClass(idx)"
        >
          <slot :data="d">{{d.content}}</slot>
        </div>
      </div>
    </div>
    <div :style="styleLine"></div>
    <div :style="styleFilling"></div>
  </div>
</template>

<script>
export default {
  name: 'fc-timeline',
  props: {
    data: {tyep: Array, required: true},
    direction: {type: String, default: 'vertical'},
    filling: {type: Number, default: 0},
    color: {type: Object, default: () => ({
      title: '#F7941D',
      content: '#F7941D',
      node: '#F7941D',
      line: '#F7941D',
      filling: 'black',
      nodeFilling: 'black',
    })},
    fromStart: {type: Boolean, default: false},
  },
  computed: {
    isHorizontal() {
      return /horizontal/i.test(this.direction);
    },
    styleTimeLine() {
      let common = {
        'display': 'flex',
        'justify-content': this.fromStart ? 'space-between' : 'space-evenly',
      };

      if (this.isHorizontal) {
        return Object.assign({
          'flex-direction': 'row',
          'width': '100%',
        }, common);
      }

      return Object.assign({
        'flex-direction': 'column',
        'height': '100%',
      }, common);
    },
    styleTimelineItem() {
      let common = {
        'display': 'flex',
        'align-items': 'center',
      };

      if (this.isHorizontal) {
        return Object.assign({
        'flex-direction': 'column',
        'margin': '0 1%',
        }, common);
      }

      return Object.assign({
        'flex-direction': 'row',
        'margin': '1% 0',
      }, common);
    },
    styleTitle() {
      let common = {
        'color': this.color.title,
        'word-break': 'break-word',
      };

      if (this.isHorizontal) {
        return Object.assign({
          'height': '50%',
          'text-align': 'left',
          'margin-bottom': '10px',
        }, common);
      }

      return Object.assign({
        'width': '50%',
        'text-align': 'right',
        'margin-right': '10px',
      }, common);
    },
    styleContent() {
      let common = {
        'color': this.color.content,
        'word-break': 'break-word',
        'position': 'relative',
        '--nodeColor': this.color.node,
        '--nodeFillingColor': this.color.nodeFilling || this.color.filling,
      };

      if (this.isHorizontal) {
        return Object.assign({
          'height': '50%',
          'text-align': 'left',
          'margin-top': '10px',
        }, common);
      }

      return Object.assign({
        'width': '50%',
        'text-align': 'left',
        'margin-left': '10px',
      }, common);
    },
    styleLine() {
      let common = {
        'position': 'absolute',
        'background': this.color.line,
        'z-index': '1',
      };

      if (this.isHorizontal) {
        return Object.assign({
          'height': '2px',
          'top': 'calc(50% - 1px)',
          'left': '0',
          'right': '0',
          'margin': '0 1%',
        }, common);
      }

      return Object.assign({
        'width': '2px',
        'left': 'calc(50% - 1px)',
        'top': '0',
        'bottom': '0',
        'margin': '1% 0',
      }, common);
    },
    styleFilling() {
      let common = {
        'position': 'absolute',
        'background': this.color.filling,
        'z-index': '2',
      };

      if (this.isHorizontal) {
        return Object.assign({
          'height': '2px',
          'top': 'calc(50% - 1px)',
          'left': '0',
          'right': `${Math.min(100, Math.max(0, 100 - this.filling))}%`,
          'margin': '0 1%',
        }, common);
      }

      return Object.assign({
        'width': '2px',
        'left': 'calc(50% - 1px)',
        'top': '0',
        'bottom': `${Math.min(100, Math.max(0, 100 - this.filling))}%`,
        'margin': '1% 0',
      }, common);
    },
  },
  methods: {
    getContentClass(idx) {
      let cls = [];

      if (this.isHorizontal) {
        cls.push('content-horizontal');
      } else {
        cls.push('content-vertical');
      }

      if (this.data.length > 0 && (100 * (idx + 1) / this.data.length) <= this.filling) {
        cls.push('content-filling');
      }

      return cls.join(' ');
    },
  },
}
</script>

<style scoped>
.box {
  position: relative;
  width: 100%;
}
.content-vertical:after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -17px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 2px solid var(--nodeColor);
  background-color: var(--nodeColor);
}
.content-horizontal:after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 23px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 2px solid var(--nodeColor);
  background-color: var(--nodeColor);
}
.content-filling:after {
  border: 2px solid var(--nodeFillingColor);
  background-color: var(--nodeFillingColor);
}
</style>
