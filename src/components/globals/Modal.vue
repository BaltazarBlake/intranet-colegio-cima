<template lang='pug'>
  div
    template(v-if='isVisible')
      .modal
        .card
          .card__close
            span x
          .card__content
            h1 es un Modal
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

  methods: {
    hidenModal() {
      this.isVisible = false;
    },

    eventKey() {
      document.body.addEventListener('keup', e => {
        if (e.keyCode === 27) this.isVisible = false;
      });
    }
  }
}
</script>

<style lang='sass'>

</style>


