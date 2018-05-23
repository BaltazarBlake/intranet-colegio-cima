<template lang="pug">
  article.card
    .row
      .col-xs-12.course__header
        h1.font-size-large.text--center {{data.descripcion}}
      //- .col-xs-12
      //-   strong(:class="data.promedio >= 11? 'green':'red'").course__tag.m-b PROMEDIO: {{data.promedio}}
      //- .col-xs-12
      //-   small Docente:
      //-   p {{data.docente}}
      //- .col-xs-12
      //-   small Teléfono:
      //-   p {{data.telefono}}
      .col-xs-12
        .row.main-center
          .col-xs
            button(@click='viewDetailExam(data)').btn--default Ver más
</template>

<script>
export default {
  name: 'Exam',
  props: ['data']
}
</script>
