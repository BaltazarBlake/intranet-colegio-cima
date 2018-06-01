<template lang="pug">
  article.card
    .row.h-100
      .col-xs-12.course__header
        h1.font-size-large.text--center {{data.curso}}
      .col-xs-12
        strong(:class="data.promedio >= 11? 'green':'red'").course__tag.m-b PROMEDIO: {{data.promedio}}
      .col-xs
        .profile__wrapper-image.small
          img(:src="'http://docente.cima.com.pe:8096/v4cima/vista/fotos/prf'+data.iddocente+'.jpg'", :alt="data.docente").profile__user-image
      .col-xs
        .row
          .col-xs-12
            small Docente:
            small {{data.docente}}
          .col-xs-12
            small Teléfono:
            small {{data.telefono}}
      .col-xs-12
        .row.main-center
          .col-xs
            button(@click='viewDetailExam(data)').btn--default.is-active Ver curso
</template>

<script>
import { EventBus } from '../event-bus.js';
import Modal from './global/Modal';
export default {
  name: 'Course',
  props: ['data'],
  methods: {
    viewDetailExam(detail) {
      this.viewModal();
      let send = {
        course: detail.curso,
        mean: detail.promedio,
        groups: detail.grupos,
      };
      EventBus.$emit('viewDetailExam', send);
    },
    viewModal() {
      EventBus.$emit('showModal', this.isVisible);
    },
  }
}
</script>
