<template lang="pug">
  div
    .row
      .col-xs-12
        span 1d:04h:15m:00s
</template>

<script>
export default {
  props: ['date', 'hour'],
  name: 'CountDown',
  data() {
    return {
      report: null,
      deadline: null,
    }
  },
  mounted() {
    this.getDeadline();
  },
  methods: {
    getDeadline() {
      this.deadline = new Date(`${this.date}T${this.hour}`);
    },
    getRemainTime(deadline) {
      let now = new Date(),
          remainTime = (new Date(deadline) - now + 1000) / 1000,
          remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
          remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
          remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
          remainDays = Math.floor(remainTime / (3600 * 24));
      return {
        remainTime,
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDays,
      }
    },
    countdown(deadline, elem, finalMessage) {
      const el = document.getElementById(elem);
      const timerUpdate = setInterval(()=> {
        let t = this.getRemainTime(deadline);
        this.report = {
          days: t.remainDays,
          hours: t.remainHours,
          minutes: t.remainMinutes,
          seconds: t.remainSeconds,
        }
      })
    }
  },
}
</script>
