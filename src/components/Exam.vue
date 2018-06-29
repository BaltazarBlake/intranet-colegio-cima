<template lang="pug">
  div
    template(v-if="report")
      .band
      .container.target
        .row
          .col-xs-12
            article.card
              .row.main-center.cross-center
                .col-xs-12.col-xm-12
                  .row
                    .col-xs-12
                      h1.font-size-x-large {{report.descripcion}}
                    .col-xs-12
                      strong.font-size-large {{report.fecha}}
                .col-xs-12.col-xm-3
                  .row.main-center.cross-center
                    .col-xs-12.col-xm-6.d-f
                      strong.sticker.font-size-regular.m-b PUNTAJE {{report.merito_general}}
                    .col-xs-12.col-xm-6.d-f
                      strong.sticker.font-size-regular.m-b PUNTAJE BASE 20: {{report.nota_20}}
                .col-xs-12.col-xm-3
                  .row.main-center
                    .col-xs-6
                      small Mérito general:
                      h2 {{report.merito_general}}
                    .col-xs-6
                      small Mérito grado:
                      h2 {{report.merito_grado}}
                .col-xs-12.col-xm-3
                    .row.main-center
                      .col-xs-4
                        .tag--label.red
                          small Malas:
                          h2 {{report.malas_contestadas}}
                      .col-xs-4
                        .tag--label.blue
                          small Buenas:
                          h2 {{report.buenas_contestadas}}
                      .col-xs-4
                        .tag--label.blue-ligth
                          small Blanco:
                          h2 {{report.no_contestadas}}

        article.row
          .col-xs-12
            h1.font-size-x-large.text--center Cursos
          template(v-for='data in report.asignaturas')
            .col-xs-12.col-xm-6.col-m-4.col-l-3.d-f
              .course.card
                .row.main-center.h-100
                  .col-xs-12.course__header
                    h1.font-size-large {{data.asignatura}}
                  .col-xs-12.m-b
                    strong.sticker.font-size-regular PUNTAJE {{data.puntaje}}
                  .col-xs-12.m-b
                    strong.sticker.font-size-regular NOTA BASE 20: {{data.nota}}
                  .col-xs-12.m-b
                    .row
                      .col-xs-4
                        .tag--label.red
                          small Malas:
                          h2 {{data.malas_contestadas}}
                      .col-xs-4
                        .tag--label.blue
                          small Buenas:
                          h2 {{data.buenas_contestadas}}
                      .col-xs-4
                        .tag--label.blue-ligth
                          small Blanco:
                          h2 {{data.no_contestadas}}
                  .col-xs-12
                    .row.main-center
                      .col-xs
                        button(@click='viewKey(data.preguntas)').btn--default.is-active Claves

    template(v-else)
      spinner
    //- MODAL
    modal(:active.sync="showModal")
      template(slot='title')
        .row.cross-center
          .col-xs
            strong.font-size-x-large Claves
      template(slot='body')
        .row
          .col-xs-12
            .table.header-fixed.shadow-1
              .table-header
                .table-row
                  .table-row-item N° de Preg.
                  .table-row-item Rpta. Exam.
                  .table-row-item Rpta. Alum.
              .table-body
                template(v-if='keyExam')
                  template(v-for='key in keyExam')
                    .table-row
                      .table-row-item(data-header='N° de Preg.') {{key.numero_pregunta}}
                      .table-row-item(data-header='Rpta. Exam.') {{key.clave}}
                      .table-row-item.font-weight-bold(v-text='correctKey(key.respuesta)' :class='colorKey(key.clave,key.respuesta)' data-header='Rpta. Alum.')
                template(v-else)
                  .m-t-s
                    spinner


</template>

<script>
import { EventBus } from '../event-bus.js';
import Modal from './global/Modal';
import Spinner from './global/Spinner';
export default {
  components: {Spinner,Modal},
  name: 'Exam',
  props: ['modalidad', 'examen', 'idmodalidad'],
  data() {
    return {
      report: null,
      showModal: false,
      keyExam: null,
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.report = JSON.parse(localStorage.getItem('cima-reporte-simulacros'))[this.modalidad].examenes[this.examen];
    },
    viewKey(data) {
      this.keyExam = data;
      this.showModal = true;
    },
    correctKey(el) {
      if (el == null) {
        return '-';
      } else {
        return `${el}`;
      }
    },
    colorKey(rpt,rpta) {
      if (rpt == rpta) {
        return 'green';
      } else {
        return 'red';
      }
    }
  }
}
</script>
