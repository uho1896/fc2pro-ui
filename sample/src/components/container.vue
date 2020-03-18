<template>
  <div>
    <fc-container direction="horizontal" class="horizontal">
      <template v-slot:alpha><div>alpha</div></template>
      <template v-slot:beta>
        <fc-container direction="vertical" class="inner-vertical">
          <template v-slot:alpha><div>alpha</div></template>
          <template v-slot:beta><div>beta</div></template>
        </fc-container>
      </template>
    </fc-container>
  </div>
</template>

<script>
import FcContainer from '../../../lib/components/container/container'

export default {
  components: {
    FcContainer,
  },
}
</script>

<style scoped>
.horizontal {
  height: 400px;
  background: lightblue;
  margin: 1%;
}
.inner-vertical {
  height: 100%;
  background: lightpink;
}
</style>