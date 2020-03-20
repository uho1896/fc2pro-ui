<template>
  <div>
    <fc-loadmore
      :topMethod="topMethod"
      :bottomMethod="bottomMethod"
      :allLoaded="count > 20"
    >
      <div v-for="d in data" :key="d" style="height: 100px;">{{d}}</div>
    </fc-loadmore>
  </div>
</template>

<script>
import FcLoadmore from '../../../lib/components/loadmore/loadmore'

export default {
  components: {
    FcLoadmore,
  },
  data() {
    return {
      count: 0,
      data: [],
    };
  },
  methods: {
    topMethod() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.data.unshift(this.count++);
          return resolve();
        }, 2000);
      });
    },
    bottomMethod() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.data.push(this.count++);
          return resolve();
        }, 1000);
      });
    },
  },
}
</script>