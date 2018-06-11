<template lang="pug">
  div
    .row
      template(v-if="days")
        .col-xs-12
          template(v-if="finalMessage && status > 0")
            strong(:class="getClassStatus()") {{finalMessage}}
          template(v-else)
            strong.yellow Quedan 
            strong(v-text="days").yellow
            strong.yellow d:
            strong(v-text="hours").yellow
            strong.yellow h:
            strong(v-text="minutes").yellow
            strong.yellow m:
            strong(v-text="seconds").yellow
            strong.yellow s
      template(v-else)
        .col-xs-12
          spinner(size='small')

</template>

<script>
import { EventBus } from '../../event-bus.js';
import Spinner from './Spinner';
export default {
  props: ["date", "hour"],
  components: {
    Spinner,
  },
  name: "CountDown",
  data() {
    return {
      report: null,
      deadline: null,
      now: null,
      remainTime: null,
      endTime: null,
      finalMessage: null,
      status: null,
      dateCount: null,
      hourCount: null,

    };
  },
  mounted() {
    this.getDeadline();
    this.ready();
  },
  methods: {
    getDeadline() {
      this.dateCount = this.date;
      this.hourCount = this.hour;
      this.deadline = new Date(`${this.dateCount}T${this.hourCount}`);
      // this.deadline = new Date("2018-06-11T08:58:00");
    },
    ready() {
      const timerUpdate = setInterval(() => {
        this.now = new Date();
        this.remainTime = (new Date(this.deadline) - this.now + 1000) / 1000;
        EventBus.$emit('listenCountdown', this.status = 0);
        if (this.remainTime <= 1) {
          this.finalMessage = '¡El evento ya inició!';          
          EventBus.$emit('listenCountdown', this.status = 1);
          if (this.remainTime <= -10) {
            clearInterval(timerUpdate);
            EventBus.$emit('listenCountdown', this.status = 2);
            this.finalMessage = 'El evento termino.';
          }
        }
      }, 1000);
    },
    getClassStatus() {
      let classStatus;
      if (this.status == 0) {
        classStatus = '';
      } else if (this.status == 1) {
        classStatus = 'blue-100';
      } else if (this.status == 2) {
        classStatus = 'red';
      }
      return classStatus;
    },
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
  }
};
</script>
