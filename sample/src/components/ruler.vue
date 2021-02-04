<template>
  <div style="margin: auto; width:800px;">
    <fc-ruler :current="current" :highlights="highlights" />
  </div>
</template>

<script>
import FcRuler from '../../../lib/components/ruler/ruler'

export default {
  components: {
    FcRuler,
  },
  data() {
    return {
      current: '00:01:05',
      highlights: [
        {start: '00:00:06', end: '00:00:10'},
        {start: '00:01:07', end: '00:01:20'},
      ],
    };
  },
  methods: {
    formatLabel(idx) {
      return idx;
    },
  },
}
</script>

<style>

</style>