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
                      strong.course__tag.green.font-size-regular.m-b PUNTAJE {{report.merito_general}}
                    .col-xs-12.col-xm-6.d-f
                      strong.course__tag.green.font-size-regular.m-b PUNTAJE BASE 20: {{report.nota_20}}
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
                    strong.course__tag.font-size-regular PUNTAJE {{data.puntaje}}
                  .col-xs-12.m-b
                    strong.course__tag.font-size-regular PUNTAJE BASE 20: {{data.nota}}
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
                        button(@click='viewKey()').btn--default.is-active Claves

    template(v-else)
      spinner
    //- MODAL
    modal
      template(slot='title')
        .row.cross-center
          .col-xs
            strong.font-size-x-large Claves
      template(slot='body')
        .row
          .col-xs-12
            .table
              .table-row.table-header
                .table-row-item N° de Preg.
                .table-row-item Rpta. Exam.
                .table-row-item Rpta. Alum.
              template(v-if='report')
                template(v-for='question in report.preguntas')
                  .table-row
                    .table-row-item(data-header='N° de Preg.') {{question.numero_pregunta}}
                    .table-row-item(data-header='Rpta. Exam.') {{question.clave}}
                    .table-row-item.font-weight-bold(v-text='correctKey(question.respuesta)' :class='colorKey(question.clave,question.respuesta)' data-header='Rpta. Alum.')
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
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.report = JSON.parse(localStorage.getItem('cima-reporte-simulacros'))[this.modalidad].examenes[this.examen];
    },
    viewKey() {
      this.viewModal();
    },
    viewModal() {
      EventBus.$emit('showModal', this.isVisible);
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
