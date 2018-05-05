<template lang="pug">
  div
    .band
      .container
        h1 Tu asistencia
    .container.tarjet
      .row
        .col-xs-12
          template(v-if='report')
            .legend.row
              .col-xs-12
                h1.font-size-regular Leyenda
              .col-xs-12
                .legend__body.row
                  .legend__label.col-xs
                    i.circle
                    span Inasistencia
                  .legend__label.col-xs
                    i.circle
                    span Tardanza
                  .legend__label.col-xs
                    i.circle
                    span Asistencia
            .row.no-wrap.m-b
              button.btn--default Mañana
              button.btn--default Tarde
              button.btn--default Reporte
            .row.m-b
              template(v-for='month in report')
                .col-xs-12.col-l-6
                  calendar(:data='month' :idTurn='idTurn')
          template(v-else)
            spinner
      


</template>

<script>
import jwt from 'jwt-decode';
import {getAssistance} from '../functions/fetchFunctions';
import {token} from '../cfg/core';
import Calendar from './globals/Calendar';
import Spinner from '@/components/globals/Spinner';
export default {
  name: 'Assistance',
  data(){
    return{
      report:null,
      idTurn: null,
    }
  },
  components: {
    Spinner,
    Calendar,
  },

  async mounted() {
    await this.getData();
  },

  methods: {
    async getData() {
      const myToken = localStorage.getItem(token);
      const idUser = jwt(myToken).idUser;
      let res = await getAssistance(idUser);
      res = res.assistance;
      
      this.idTurn = localStorage.getItem('idTurn');

      this.report = [];
      for (let i = 0; i < res.length; i++) {
        this.report[i] = res[i].map(data => {
          return {
            id_asistencia: data.id_asistencia,
            numero_dia: data.numero_dia,
            mes: data.mes,
            hora_turno: this.idTurn == 1 ? data.hora_mañana : data.hora_tarde,
            hora_opcional: this.idTurn == 1 ? data.hora_tarde : data.hora_mañana,
            estado: this.idTurn == 1 ? data.estado_mañana : data.estado_tarde,
            nro_dia: data.nro_dia,

            nro_mes: data.nro_mes,
            nro_anio: data.nro_year,
          };
        });
      }

      this.report.reverse();
    },

    checkTurn() {
      if (this.idTurn == 1) {
        this.turn = true;
      } else {
        this.turn = false;
      }
    },

    checkMorning() {
      this.turn = true;
    },

    checkAfternoon() {
      this.turn = false;
    },

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
  }
}
</script>


