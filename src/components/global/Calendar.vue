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
            small(:class='colorState(day)' @click='viewJustify(day)').calendar__day-number(v-text="getDay(day.dia)")
            small.font-size-small {{viewHour(day)}}
</template>

<script>
import { EventBus } from '../../event-bus.js';
import Modal from './Modal';
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
          // Turno tarde
          } else {
            if (!this.turn) {
              if (day.estado_pm == '' && day.pm != '[F]') {
                classColor = '';
              } else if (day.estado_pm == '' && day.pm != '') {
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

      // if (day.dia == 'auxiliar') {
      //   hour = '';
      // }

      if (day.am == 'x' && day.nro_dia != undefined) {
        hour = '-';
      }

      return hour;
    },

    async viewJustify(day) {
      if (day.nro_dia != undefined && day.nro_dia != 0 && day.estado != undefined) {
        if (this.turn) {
          const myToken = localStorage.getItem(token);
          const idUser = jwt(myToken).idUser;
          let date = `${day.nro_anio}-${day.nro_mes}-${day.numero_dia}`;
          let res = await getJustify(idUser, date);
          this.report = res;
          this.viewModal();
          // let send = this.report;
          let send = {
            date,
            report: this.report
          };
          EventBus.$emit('viewJustify', send);
        }
      }
    },

    viewModal() {
      EventBus.$emit('showModal', this.isVisible);
    },

    // getJustify(data) {
    //   EventBus.$on('viewJustify', data);
    // },

  }
}
</script>