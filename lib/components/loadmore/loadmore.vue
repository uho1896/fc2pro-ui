<template>
  <div class="box">
    <div :style="styleContent">
      <div :style="styleTop" v-if="topMethod">
        <slot name="top">
          <img class="loading" :src="require('../../assets/loading.gif')">
        </slot>
      </div>
      <slot></slot>
      <div :style="styleBottom" v-if="bottomMethod">
        <slot name="bottom">
          <img class="loading" :src="require('../../assets/loading.gif')">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fc-loadmore',
  props: {
    topMethod: {type: Function},
    topHeight: {type: Number, default: 50},
    bottomMethod: {type: Function},
    bottomHeight: {type: Number, default: 50},
    allLoaded: {type: Boolean, default: false},
    autoFill: {type: Boolean, default: true},
    distanceIndex: {type: Number, default: 2},
    maxDistance: {type: Number, default: 0},
    bottomOffset: {type: Number, default: 10},
  },
  data() {
    let scrollEventTarget = this.getScrollEventTarget(this.$el);

    return {
      scrollEventTarget,
      topStatus: 'pull',
      bottomStatus: 'pull',
      translate: 0,
      direction: '',
      startY: 0,
      startScrollTop: 0,
      currentY: 0,
      topDropped: false,
      bottomDropped: false,
    };
  },
  computed: {
    styleContent() {
      let common = {
        'transform': `translate3d(0, ${this.translate}px, 0)`,
      };

      if (this.topDropped || this.bottomDropped) {
        return Object.assign({
          'transition': '.6s',
        }, common);
      }

      return common;
    },
    styleTop() {
      return {
        'height': `${this.topHeight}px`,
        'line-height': `${this.topHeight}px`,
        'margin-top': `-${this.topHeight}px`,
      };
    },
    styleBottom() {
      return {
        'height': `${this.bottomHeight}px`,
        'line-height': `${this.bottomHeight}px`,
        'margin-bottom': `-${this.bottomHeight}px`,
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    getScrollEventTarget(element) {
      let currentNode = element;
      while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
          return currentNode;
        }
        currentNode = currentNode.parentNode;
      }

      return window;
    },
    getScrollTop(element) {
      if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
      } else {
        return element.scrollTop;
      }
    },
    fillContainer() {
      if (this.autoFill && typeof this.bottomMethod == 'function') {
        this.$nextTick(async () => {
          let containerFilled;
          if (this.scrollEventTarget === window) {
            containerFilled = (this.$el.clientHeight + this.$el.clientTop) >=
              (document.documentElement.clientHeight + document.documentElement.clientTop);
          } else {
            containerFilled = (this.$el.clientHeight + this.$el.clientTop) >=
              (this.scrollEventTarget.clientHeight + this.scrollEventTarget.clientTop);
          }

          if (!containerFilled) {
            this.bottomStatus = 'loading';
            try {
              await this.bottomMethod();
              this.onBottomLoaded();
            } catch (e) {
              // failing silently
              this.onBottomLoaded();
            }
          }
        });
      }
    },
    checkBottomReached() {
      if (this.scrollEventTarget === window) {
        return (document.body.scrollTop + document.documentElement.clientHeight + this.bottomOffset) >= document.body.scrollHeight;
      } else {
        return (this.scrollEventTarget.getBoundingClientRect().bottom + this.bottomOffset) >= this.$el.getBoundingClientRect().bottom;
      }
    },
    bindTouchEvents() {
      this.$el.addEventListener('touchstart', this.handleTouchStart);
      this.$el.addEventListener('touchmove', this.handleTouchMove);
      this.$el.addEventListener('touchend', this.handleTouchEnd);
    },
    onTopLoaded() {
      this.translate = 0;
      this.topStatus = 'pull';
      this.topDropped = false;
      this.direction = '';
    },
    onBottomLoaded() {
      this.translate = 0;
      this.bottomStatus = 'pull';
      this.bottomDropped = false;
      this.direction = '';
      this.$nextTick(() => {
        // show newly loaded data
        if (this.scrollEventTarget === window) {
          document.body.scrollTop += 50;
        } else {
          this.scrollEventTarget.scrollTop += 50;
        }
      });

      if (!this.allLoaded) {
        // continue fill container if autoFill is true
        this.fillContainer();
      }
    },
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
      if (this.topStatus !== 'loading') {
        this.topStatus = 'pull';
        this.topDropped = false;
      }
      if (this.bottomStatus !== 'loading') {
        this.bottomStatus = 'pull';
        this.bottomDropped = false;
      }
    },
    handleTouchMove(event) {
      if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
        return;
      }

      this.currentY = event.touches[0].clientY;
      let distance = (this.currentY - this.startY) / this.distanceIndex;
      this.direction = distance > 0 ? 'down' : 'up';

      // move down refresh
      if (typeof this.topMethod === 'function' && this.direction === 'down' &&
        this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading'
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (this.maxDistance >= this.topHeight) {
          this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
        } else {
          this.translate = distance - this.startScrollTop;
        }
        this.translate = Math.max(0, this.translate);
        this.topStatus = (this.translate >= this.topHeight) ? 'drop' : 'pull';
      }

      // move up load
      if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
        this.checkBottomReached() && this.bottomStatus !== 'loading' && !this.allLoaded
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (this.maxDistance > this.bottomHeight) {
          this.translate = Math.abs(distance) <= this.maxDistance
            ? (this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance) : this.translate;
        } else {
          this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
        }
        this.translate = Math.min(0, this.translate);
        this.bottomStatus = (-this.translate >= this.bottomHeight) ? 'drop' : 'pull';
      }
    },
    async handleTouchEnd() {
      if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
        if (this.topStatus === 'drop' && typeof this.topMethod == 'function') {
          this.translate = this.topHeight;
          this.topStatus = 'loading';
          this.topDropped = true;
          try {
            await this.topMethod();
            this.onTopLoaded();
          } catch (e) {
            // failing silently
            this.onTopLoaded();
          }
        } else {
          this.translate = 0;
          this.topStatus = 'pull';
        }
      }

      if (this.direction === 'up' && this.checkBottomReached() && this.translate < 0) {
        if (this.bottomStatus === 'drop' && typeof this.bottomMethod == 'function') {
          this.translate = -this.bottomHeight;
          this.bottomStatus = 'loading';
          this.bottomDropped = true;
          try {
            await this.bottomMethod();
            this.onBottomLoaded();
          } catch (e) {
            // failing silently
            this.onBottomLoaded();
          }
        } else {
          this.translate = 0;
          this.bottomStatus = 'pull';
        }
      }
    },
    init() {
      if (typeof this.topMethod == 'function' || typeof this.bottomMethod == 'function') {
        this.bindTouchEvents();
        this.fillContainer();
      }
    },
  },
}
</script>

<style scoped>
.box {
  overflow: hidden;
}
.loading {
  height: 60%;
  min-height: 20px;
  max-height: 40px;
  width: auto;
}
</style>