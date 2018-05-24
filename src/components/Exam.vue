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
                .card
                  .row.main-center.h-100
                    .col-xs-12
                      h1.font-size-large {{data.asignatura}}
                    .col-xs-12.m-b
                      strong.course__tag.font-size-regular PUNTAJE {{data.nota}}
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
