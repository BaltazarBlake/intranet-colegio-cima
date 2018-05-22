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
            button.btn--primary(@click='viewDetailExam(data)') Ver más
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
