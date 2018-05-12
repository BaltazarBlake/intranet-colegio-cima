<template lang='pug'>
  div
    template(v-if='isVisible')
      .modal
        .modal__close
          span(@click='hidenModal()').icon-close
        .modal__header
          .modal__title
            h1.title.font-size-xx-large 
              slot(name='title') Title Modal
          .modal__print
            button.btn--warning.is-active
              span.icon-printer
              span Imprimir
        .modal__body
          .modal__content
            slot(name='body')
      .overlay__modal(@click='hidenModal()')
</template>

<script>
// Import the EventBus.
import { EventBus } from '../../event-bus.js';
export default {
  name: 'Report',
  data() {
    return {
      isVisible: false,
    }
  },

  created() {
    // Listen for the showModal event
    EventBus.$on('showReport', () => this.isVisible = true);
  },

  mounted() {
    this.eventKey();
  },

  methods: {
    hidenModal() {
      this.isVisible = false;
    },

    eventKey() {
      document.body.addEventListener("keyup", e => {
        if (e.keyCode === 27) {
          this.hidenModal();
        }
      });
    }
  },
}
</script>

<style lang='sass'>

</style>


