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
                .legend__label
                  i.circle--justify
                  span Justificación
            .d-f.m-b
              button(@click='checkMorning()' :class='turn? "is-active" : ""').btn--default Mañana
              button(@click='checkAfternoon()' :class='turn? "" : "is-active"').btn--default Tarde
              button.btn--warning.is-active(@click='viewReport()')
                span.icon-file-text
                span Reporte
            .row
              template(v-for='month in report')
                .col-xs-12.col-xm-6.col-xl-4.d-f
                  calendar(:data='month' :idTurn='idTurn' :turn='turn' :showModalJustify='showModalJustify' :activeNotification="activeNotification")
          template(v-else)
            .m-t-s
              spinner
    modal(:active.sync="showModal")
      template(slot='title')
        .row.cross-center
          .col-xs-12
            strong.font-size-x-large Justificación
      template(slot='body')
        template(v-if='justify')
          .row
            .col-xs-12.col-xm-4
              .card.m-b
                template(v-if='justify.report == null')
                  .row
                    .col-xs-12
                      h1.font-size-regular NO TIENE JUSTIFICACIÓN
                template(v-else)
                  .row
                    .col-xs-12.m-b-2
                      small.font-size-regular Fecha:
                      h1.font-size-regular {{justify.day}} de {{justify.month}}
                    .col-xs-12.m-b-2
                      small.font-size-regular Descripción:
                      h1.font-size-regular {{justify.report}}
        template(v-else)
          spinner
    report
      template(slot='title') Reporte de asistencia
      template(slot='body')
        .d-f.m-b
          button(@click='checkMorning()' :class='turn? "is-active" : ""').btn--default Mañana
          button(@click='checkAfternoon()' :class='turn? "" : "is-active"').btn--default Tarde
        .row#print
          .print__header.col-xs-12
            .row
              .col-xs-12
                .p-r
                  img(src='../assets/logo_colegio.svg').print__img
              .col-xs-12
                .row.main-center
                  .col-xs-12
                    template(v-if='dataStudent')
                      h1.font-size-large {{dataStudent.nombre}} {{dataStudent.apellido}}
                      h2.font-size-small {{dataStudent.nivel}} - {{dataStudent.grado}} {{dataStudent.seccion}}
                    template(v-else)
                      spinner
          
          template(v-for='(month, index) in report')
            .col-xs-12.col-l-6.d-f.print__section
              calendar(:data='month' :idTurn='idTurn' :turn='turn')
            template(v-if='(index+1)%4 == 0 && report.length>(index+1)')
              .print__header.col-xs-12(:class="(index+1)%4 == 0? 'print__m-t print__show':''")
                .row
                  .col-xs-12
                    .p-r
                      img(src='../assets/logo_colegio.svg').print__img
                  .col-xs-12
                    .row.main-center
                      .col-xs-12
                        template(v-if='dataStudent')
                          h1.font-size-large {{dataStudent.nombre}} {{dataStudent.apellido}}
                          h2.font-size-small {{dataStudent.nivel}} - {{dataStudent.grado}} {{dataStudent.seccion}}
                        template(v-else)
                          spinner
          
          .col-xs-12.print__show
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

</template>

<script>
import {getAssistance} from '../functions/fetchFunctions';
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
      test: null,
      showModalJustify: true,
      showModal: false,
      activeNotification: true,
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
      this.showModal = data.showModal;
    });
  },

  async mounted() {
    await this.getData();
    this.checkTurn();
  },

  methods: {
    async getData() {
      let res;
      if(!localStorage.getItem('cima-estudiante-asistencia')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));
        res = await getAssistance(data.idalumnocolegio);
        this.report = res.data;
        localStorage.setItem('cima-estudiante-asistencia',JSON.stringify(this.report));        
      }else{
        this.report = JSON.parse(localStorage.getItem('cima-estudiante-asistencia'));
      }
     
      this.idTurn = localStorage.getItem('idTurn');

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
      this.activeNotification = true;
    },

    checkAfternoon() {
      this.turn = false;
      this.activeNotification = false;
    },

    viewReport() {
      // this.showModalJustify = false;
      EventBus.$emit('showReport');
      this.getDataStudent();
    },

    getDataStudent(){
      this.dataStudent = JSON.parse(localStorage.getItem('cima-estudiante'));
    }

  }
}
</script>

