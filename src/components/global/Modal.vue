<template lang='pug'>
  div
    template(v-if='isVisible')
      .modal
        div(@click='hidenModal()').modal__close
          span.icon-close
        .modal__header
          .modal__title
            h1.title.font-size-xx-large 
              slot(name='title') Title Modal
        .modal__content
          slot(name='body')
      .overlay__modal(@click='hidenModal()')
</template>

<script>
// Import the EventBus.
import { EventBus } from '../../event-bus.js';
export default {
  name: 'Modal',
  data() {
    return {
      isVisible: false,
    }
  },

  created() {
    // Listen for the showModal event
    EventBus.$on('showModal', () => this.isVisible = true);
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