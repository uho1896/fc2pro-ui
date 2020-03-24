<template>
  <div :style="styleBox" @click="toggle" @touchend="toggle">
    <slot v-if="isFullscreen" name="fullscreen"></slot>
    <slot v-if="!isFullscreen || !hasFullscreenSlot"></slot>
  </div>
</template>

<script>
import * as utils from './utils'

export default {
  name: 'fc-fullscreen',
  props: {
    background: {type: String, default: '#333333'},
  },
  data() {
    let supportFullScreen = utils.supportFullScreen();
    let isFullscreen = utils.fullScreenStatus();
    let hasFullscreenSlot = !!this.$slots.fullscreen;

    return {
      supportFullScreen,
      isFullscreen,
      hasFullscreenSlot,
    };
  },
  computed: {
    styleBox() {
      if (this.isFullscreen) {
        return {
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'bottom': '0',
          'right': '0',
          'background': this.background,
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'z-index': '9999',
        };
      }

      return {};
    }
  },
  methods: {
    fullScreenCallback() {
      this.isFullscreen = utils.fullScreenStatus();

      if (!this.isFullscreen) {
        utils.offFullScreenEvent(this.fullScreenCallback);
      }
    },
    enter() {
      if (!this.supportFullScreen || utils.fullScreenStatus()) {
        return;
      }
      utils.onFullScreenEvent(this.fullScreenCallback);
      utils.requestFullscreen(document.body);
    },
    exit() {
      if (!this.supportFullScreen || !utils.fullScreenStatus()) {
        return;
      }

      utils.exitFullscreen();
    },
    toggle() {
      if (utils.fullScreenStatus()) {
        this.exit();
      } else {
        this.enter();
      }
    },
  },
}
</script>