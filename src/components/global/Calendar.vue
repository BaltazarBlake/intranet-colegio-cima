<template lang="pug">
  article.calendar
    header.calendar__header
      h1.font-size-large {{data.mes}}
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
        template(v-for='day in data.asistencia')
          .calendar__day
            small.calendar__day-number(:class='colorState(day)' @click='viewJustify(day, data.mes)' v-text="getDay(day.dia)")
            small.font-size-small {{viewHour(day)}}
</template>

<script>
import { EventBus } from '../../event-bus.js';
import Modal from './Modal/Modal';
import jwt from 'jwt-decode';
import {getJustify} from '../../functions/fetchFunctions';
import {token} from '../../cfg/core';
export default {
  name: 'Calendar',

  components: {
    Modal,
  },

  props: ['data', 'idTurn', 'turn', 'showModalJustify'],

  created() {
    EventBus.$on('sendJustification',(data) => {
    });
  },

  data() {
    return {
      report: null
    }
  },

  methods: {
    colorState(day) {
      let classColor;

      if (day.dia != 'auxiliar') {
        if (this.idTurn == 1) {
          // Turno mañana
          if (this.turn) {
            if (day.estado_am == '[F]' && day.am == '') {
              classColor = 'absence';
            } else if (day.estado_am == '[T]' && day.am != '') {
              classColor = 'delay';
            } else if (day.estado_am == '' && day.am != '') {
              classColor = 'arrive';
            }
          // si viene en turno tarde
          } else {
            if (!this.turn) {
              if (day.estado_pm == '' && day.pm == '[F]') {
                classColor = '';
              } else if (day.estado_pm == '' && day.pm != '[F]') {
                classColor = 'arrive';
              }
            }
          }
        } else if(this.idTurn == 2) {
          if(!this.turn) {
            // codigo para turno tarde
          } else {
            if (this.turn) {
              
            }
          }
        }
      }

      if (day.nro_dia == 0) {
        classColor = '';
      }

      return classColor;
    },

    getDay(day) {
      if (day == 'auxiliar') {
        return '';
      } else {
        return day;
      }
    },

    viewHour(day) {
      let hour;
      if (this.idTurn == 1) {
        if (this.turn) {
          if (day.am != '') {
            hour = day.am;
          } else {
            hour = '-';
          }
        } else {
          if (day.pm != '[F]') {
            hour = day.pm;
          } else {
            hour = '-';
          }
        }
      } else {
        if (!this.turn) {
          if (day.am != '[F]') {
            hour = day.am;
          } else {
            hour = '';
          }
        } else {
          if (day.pm != '') {
            hour = day.pm;
          } else {
            hour = '';
          }
        }
      }

      return hour;
    },

    viewJustify(day, month) {
      if (day.dia != undefined && day.dia != 0 && day.estado_am != undefined && this.showModalJustify == true) {
        if (this.turn) {
          this.viewModal();
          let send = {
            report: day.justificacion,
            month,
            day: day.dia,
          };
          EventBus.$emit('viewJustify', send);
        }
      }
    },

    viewModal() {
      EventBus.$emit('showModal', this.isVisible);
    },

  }
}
</script>