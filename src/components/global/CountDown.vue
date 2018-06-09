<template lang="pug">
  div
    .row
      .col-xs-12
        h1(v-text="days")
        h1(v-text="hours")
        h1(v-text="minutes")
        h1(v-text="seconds")
</template>

<script>
export default {
  props: ["date", "hour"],
  name: "CountDown",
  data() {
    return {
      report: null,
      deadline: null,
      now: null,
      remainTime: null
    };
  },
  mounted() {
    this.getDeadline();
    this.ready();
  },
  methods: {
    getDeadline() {
      // this.deadline = new Date(`${this.date}T${this.hour}`);
      this.deadline = new Date("2018-06-08T20:49:00");
    },
    ready() {
      const timerUpdate = setInterval(() => {
        this.now = new Date();
        this.remainTime = (new Date(this.deadline) - this.now + 1000) / 1000;

        if (this.remainTime <= 1) {
          clearInterval(this.ready());
          console.log('qwerty');
        }
      }, 1000);
    }
  },
  computed: {
    seconds() {
      return ('0' + Math.floor(this.remainTime % 60)).slice(-2);
    },
    minutes() {
      return ('0' + Math.floor(this.remainTime / 60 % 60)).slice(-2);
    },
    hours() {
      return ('0' + Math.floor(this.remainTime / 3600 % 24)).slice(-2);
    },
    days() {
      return Math.floor(this.remainTime / (3600 * 24));
    },

    endTime() {
      if (this.remainTime <= 1) {
        
      }
    }
  }
};
</script>
