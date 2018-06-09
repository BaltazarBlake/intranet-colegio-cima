<template lang="pug">
  div
    .row
      .col-xs-12
        template(v-if="finalMessage")
          strong.yellow {{finalMessage}}
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

      //- .col-xs-12
        //- h2 {{remainTime}}

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
      remainTime: null,
      finalMessage: null,
    };
  },
  mounted() {
    this.getDeadline();
    this.ready();
  },
  methods: {
    getDeadline() {
      this.deadline = new Date(`${this.date}T${this.hour}`);
      // this.deadline = new Date("2018-06-09T00:43:00");
    },
    ready() {
      const timerUpdate = setInterval(() => {
        this.now = new Date();
        this.remainTime = (new Date(this.deadline) - this.now + 1000) / 1000;

        if (this.remainTime <= 1) {
          this.finalMessage = '¡El evento ya inició!'
        } else if (this.remainTime <= -7200) {
          clearInterval(timerUpdate);
          this.finalMessage = 'El evento ya termino';
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
