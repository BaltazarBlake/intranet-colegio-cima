<template lang='pug'>
  div
    template(v-if='isVisible')
      .modal
        .modal__header
          .modal__title
            h1.title.font-size-xx-large Exámenes Control Web
          .modal__close
            span(@click='hidenModal()').icon-close
        .modal__content
          p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
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

<style lang='sass'>

</style>


