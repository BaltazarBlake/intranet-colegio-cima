<template lang="pug">
  article.card
    .row
      .col-xs-12.course__header
        h1.font-size-large.text--center {{data.curso}}
      .col-xs-12
        strong.course__tag(:class="data.promedio > 11? 'green':'red'") Promedio: {{data.promedio}}
      .col-xs-12
        small Docente:
        p {{data.docente}}
      .col-xs-12
        small Teléfono:
        p {{data.telefono}}
      .col-xs-12
        .row.main-center
          .col-xs
            button.btn--primary Ver más
</template>

<script>
export default {
  name: 'Course',
  props: ['data'],
  methods: {
  }
}
</script>
