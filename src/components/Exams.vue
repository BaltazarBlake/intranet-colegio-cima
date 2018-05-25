<template lang="pug">
  div
    .row
      template(v-for='(exams,index) in data')
        .col-xs-12.col-xm-6.col-m-4.col-l-3.d-f
          article.card.course
            .row.main-center.h-100
              .col-xs-12.course__header
                h1.font-size-large {{exams.descripcion}}
              .col-xs-12.m-b
                strong.font-size-regular {{exams.fecha}}
              .col-xs-6
                small Mérito general:
                h2 {{exams.merito_general}}
              .col-xs-6
                small Mérito grado:
                h2 {{exams.merito_grado}}
              template(v-if='idMod == 10')
                .col-xs-12.d-f.m-b
                  strong.course__tag.font-size-regular NOTA BASE 20: {{exams.nota_20}}
              template(v-else)
                .col-xs-12.d-f.m-b
                  strong.course__tag.font-size-regular PUNTAJE {{exams.puntaje}}
              .col-xs-12.m-b
                .row
                  .col-xs-4
                    .tag--label.red
                      small Malas:
                      h2 {{exams.malas_contestadas}}
                  .col-xs-4
                    .tag--label.blue
                      small Buenas:
                      h2 {{exams.buenas_contestadas}}
                  .col-xs-4
                    .tag--label.blue-ligth
                      small Blanco:
                      h2 {{exams.no_contestadas}}
              .col-xs-12
                .row.main-center
                  .col-xs
                    router-link(:to='link(id,index)' tag="button").btn--default.is-active Ver examen
            template(v-if='exams.nota_20 == 0')
              .course__message
                strong.font-size-xx-large.text--uppercase.text--center {{exams.motivo}}
                strong.font-size-xx-large.text--uppercase.text--center {{exams.fecha}}
</template>

<script>
export default {
  props: ['data', 'id', 'idMod'],
  methods: {
    link(id,idExam) {
      return `/Dashboard/Exam?mod=${id}&exam=${idExam}&idmod=${this.idMod}`;
    }
  }
}
</script>
