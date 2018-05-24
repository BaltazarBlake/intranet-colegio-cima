<template lang="pug">
  div
    template(v-if="report")
      .band
      .container.target
        .row
          .col-xs-12
            article.card
              .row.main-center.cross-center
                .col-xs-12.col-xm-4
                  .row
                    .col-xs-12
                      h1.font-size-x-large {{report.descripcion}}
                    .col-xs-12
                      h2.font-size-large {{report.fecha}}
                .col-xs-12.col-xm-4
                  .row.main-center
                    .col-xs-6
                      small Mérito general:
                      h2 {{report.merito_general}}
                    .col-xs-6
                      small Mérito grado:
                      h2 {{report.merito_grado}}
                .col-xs-12.col-xm-4
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


        .row
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
                        button.btn--default.is-active Ver más

    template(v-else)
      spinner
</template>

<script>
import Spinner from './global/Spinner';
export default {
  components: {Spinner},
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
    }
  }
}
</script>
