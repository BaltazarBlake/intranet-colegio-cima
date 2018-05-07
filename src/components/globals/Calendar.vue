<template lang="pug">
  article.calendar
    header.calendar__header
      h1.font-size-large {{data[0].mes}}
      .calendar__header-days
        .calendar__header-day
          h2.font-size-small LUN.
        .calendar__header-day
          h2.font-size-small MAR.
        .calendar__header-day
          h2.font-size-small MIÉ.
        .calendar__header-day
          h2.font-size-small JUE.
        .calendar__header-day
          h2.font-size-small VIE.
        .calendar__header-day
          h2.font-size-small SÁB.
        .calendar__header-day
          h2.font-size-small DOM.
      .calendar__body        
        template(v-for='day in data')
          .calendar__day
            small(:class='colorState(day)' @click='viewDescription(day)').calendar__day-number {{day.numero_dia}}
            small.font-size-small {{viewHour(day)}}
</template>

<script>
import { EventBus } from '../../event-bus.js';
import Modal from '@/components/globals/Modal';
export default {
  name: 'Calendar',

  components: {
    Modal,
  },

  props: ['data', 'idTurn', 'turn'],

  created() {
    EventBus.$on('sendJustification',(data) => {
      console.log(data);
    });
  },

  methods: {
    colorState(day) {
      let classColor;

      if (day.hora_turno != 'x') {
        if (this.idTurn == 1) {
          // Turno mañana
          if (this.turn) {
            if (day.estado == '[F]' && day.hora_turno == '') {
              classColor = 'absence';
            } else if (day.estado == '[T]' && day.hora_turno != '') {
              classColor = 'delay';
            } else if (day.estado == '' && day.hora_turno != '') {
              classColor = 'arrive';
            }
          // Turno tarde
          } else {
            if (!this.turn) {
              if (day.hora_opcional == '[F]') {
                classColor = '';
              } else {
                classColor = 'arrive';
              }              
            }
          }
        }
      }

      if (day.nro_dia == 0) {
        classColor = '';
      }

      return classColor;
    },

    viewHour(day) {
      let hour;
      if (this.idTurn == 1) {
        if (this.turn) {
          if (day.hora_turno != '') {
            hour = day.hora_turno;
          } else {
            hour = '-';
          }
        } else {
          if (day.hora_opcional != '[F]') {
            hour = day.hora_opcional;
          } else {
            hour = '-';
          }
        }
      } else {
        if (!this.turn) {
          if (day.hora_turno != '[F]') {
            hour = day.hora_turno;
          } else {
            hour = '';
          }
        } else {
          if (day.hora_opcional != '') {
            hour = day.hora_opcional;
          } else {
            hour = '';
          }
        }
      }

      if (day.nro_dia == undefined) {
        hour = '';
      }

      if (day.hora_turno == 'x' && day.nro_dia != undefined) {
        hour = '-';
      }

      return hour;
    },

    viewDescription(day) {
      if (day.nro_dia != undefined && day.nro_dia != 0 && day.estado != undefined) {
        if (this.turn) {
          this.viewModal();
        }
      }
    },

    viewModal() {
      EventBus.$emit('showModal', this.isVisible);
    },
  }
}
</script>
