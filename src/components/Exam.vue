<template lang="pug">
  div
    template(v-if="report")
      .band
        .container
          h1.font-size-x-large {{report.descripcion}}
        .container.target
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
