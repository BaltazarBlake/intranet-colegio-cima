<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Tu asistencia
    .container.target
      .row
        .col-xs-12
          template(v-if='report')
            .card
              .card__title
                h1.font-size-regular Leyenda
              .card__body
                .legend__label
                  i.circle--absence
                  span Inasistencia
                .legend__label
                  i.circle--delay
                  span Tardanza
                .legend__label
                  i.circle--arrive
                  span Asistencia
            .d-f.m-b
              button(@click='checkMorning()' :class='turn? "is-active" : ""').btn--default Mañana
              button(@click='checkAfternoon()' :class='turn? "" : "is-active"').btn--default Tarde
              button.btn--warning.is-active(@click='viewReport()')
                span.icon-file-text
                span Reporte
            .row
              template(v-for='month in report')
                .col-xs-12.col-l-6.d-f
                  calendar(:data='month' :idTurn='idTurn' :turn='turn')
          template(v-else)
            spinner
    modal
      template(slot='title') Justificación
      template(slot='body')
        template(v-if='justify')
          .row
            .col-xs-12.col-xm-4
              .card.m-b
                template(v-if='justify.report == 1')
                  .row
                    .col-xs-12
                      h1.font-size-regular NO TIENE JUSTIFICACIÓN
                template(v-else)
                  .row
                    .col-xs-12.m-b-2
                      small.font-size-regular Fecha:
                      h1.font-size-regular {{justify.date}}
                    .col-xs-12.m-b-2
                      small.font-size-regular Descripción:
                      h1.font-size-regular {{justify.report[0].descripcion}}
        template(v-else)
          spinner
    report
      template(slot='title') Reporte de asistencia
      template(slot='body')
        .d-f.m-b
          button(@click='checkMorning()' :class='turn? "is-active" : ""').btn--default Mañana
          button(@click='checkAfternoon()' :class='turn? "" : "is-active"').btn--default Tarde
        .row#print
          .col-xs-12
            .print__header
              img(src='../assets/logo_colegio.svg').print__img
          .col-xs-12
            .row.main-center
              .col-xs-12
                template(v-if='dataStudent')
                  h1.font-size-large {{dataStudent.nombre}} {{dataStudent.apellido}}
                  h2.font-size-small {{dataStudent.nivel}} - {{dataStudent.grado}} {{dataStudent.seccion}}
                template(v-else)
                  spinner
          .col-xs-12
            .row
              .col-xs-12
                .card
                  .card__title
                    h1.font-size-regular Leyenda
                  .card__body
                    .legend__label
                      i.circle--absence
                      span Inasistencia
                    .legend__label
                      i.circle--delay
                      span Tardanza
                    .legend__label
                      i.circle--arrive
                      span Asistencia
          template(v-for='(month, index) in report')
            .col-xs-12.col-l-6.d-f
              calendar(:data='month' :idTurn='idTurn' :turn='turn')
            template(v-if='(index+1)%4 == 0')
              .col-xs-12
                .print__header
                  img(src='../assets/logo_colegio.svg').print__img
              .col-xs-12
                .row.main-center
                  .col-xs-12
                    template(v-if='dataStudent')
                      h1.font-size-large {{dataStudent.nombre}} {{dataStudent.apellido}}
                      h2.font-size-small {{dataStudent.nivel}} - {{dataStudent.grado}} {{dataStudent.seccion}}
                    template(v-else)
                      spinner

</template>

<script>
import jwt from 'jwt-decode';
import {getAssistance} from '../functions/fetchFunctions';
import {token} from '../cfg/core';
import { EventBus } from '../event-bus.js';

import Modal from './global/Modal';
import Spinner from './global/Spinner';
import Calendar from './global/Calendar';
import Report from './global/Report';
export default {
  name: 'Assistance',
  data(){
    return{
      dataStudent:null,
      report:null,
      idTurn: null,
      turn: null,
      justify: null,
    }
  },
  components: {
    Modal,
    Report,
    Spinner,
    Calendar,
  },

  created() {
    EventBus.$on('viewJustify', data =>{
      this.justify = data;
    });
  },

  async mounted() {
    await this.getData();
    this.checkTurn();
    // this.getDataStudent();
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

    viewReport() {
      EventBus.$emit('showReport');
      this.getDataStudent();
    },

    getDataStudent(){
      this.dataStudent = JSON.parse(localStorage.getItem('cima-usuario'));
      console.log(this.dataStudent);
    }

  }
}
</script>

