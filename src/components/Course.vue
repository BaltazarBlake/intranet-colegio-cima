<template lang="pug">
  article.card
    .row.h-100
      .col-xs-12.course__header
        h1.font-size-large.text--center {{data.curso}}
      .col-xs-12
        strong(:class="data.promedio >= data.notaminima? 'green':'red'").sticker.m-b PROM. ACUM: {{data.promedio}}
      .col-xs-12
        .profile__wrapper-image.small
          img(:src="'http://docente.cima.com.pe:8096/v4cima/vista/fotos/prf'+data.iddocente+'.jpg'", :alt="data.docente").profile__user-image
        .profile__description
          small Docente:
          p {{data.docente}}
          small Teléfono:
          p {{data.telefono}}
      .col-xs-12
        .row.main-center
          .col-xs
            button(@click='viewDetailExam(data)').btn--default.is-active Ver curso
</template>

<script>
import { EventBus } from '../event-bus.js';
export default {
  name: 'Course',
  props: ['data'],
  methods: {
    viewDetailExam(detail) {
      let send = {
        course: detail.curso,
        mean: detail.promedio,
        minimumNote: detail.notaminima,
        groups: detail.grupos,
      };
      EventBus.$emit('viewDetailExam', send);
    },
  }
}
</script>
