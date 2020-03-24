<template>
  <div>
    <fc-fullscreen>
      <img src="/favicon.ico" />
    </fc-fullscreen>

    <fc-fullscreen>
      <img src="/favicon.ico" />
      <div slot="fullscreen" class="fullscreen">fullscreen</div>
    </fc-fullscreen>
  </div>
</template>

<script>
import FcFullscreen from '../../../lib/components/fullscreen/fullscreen'

export default {
  components: {
    FcFullscreen,
  },
}
</script>

<style scoped>
.fullscreen {
  text-align: center;
  color: red;
}
</style>