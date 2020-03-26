<template>
  <div>
    <fc-timeline
      :data="data" direction="horizontal" :filling="filling"
    />

    <fc-timeline
      :data="data" direction="vertical" :filling="filling"
      v-slot="slot"
    >
      <div class="content">{{`日期: ${slot.data.content}`}}</div>
    </fc-timeline>
  </div>
</template>

<script>
import FcTimeline from '../../../lib/components/timeline/timeline'

export default {
  components: {
    FcTimeline,
  },
  data() {
    return {
      data: [
        {
          title: '春节',
          content: '2020-01-25'
        },
        {
          title: '元宵',
          content: '2020-02-08'
        },
        {
          title: '雨水',
          content: '2020-02-19'
        },
        {
          title: '惊蛰',
          content: '2020-03-05'
        },
      ],
      direction: 'horizontal',
      filling: 30,
    }
  },
}
</script>

<style scoped>
.content {
  word-break: keep-all;
  font-size: 2vw;
}
</style>
