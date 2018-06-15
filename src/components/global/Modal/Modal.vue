<template lang='pug'>
  div
    div(@keyup.27="onEsc()")
      template(v-if='status')
        .modal
          slot(name='modal-close')
          .modal__header
            .modal__title
              slot(name='title') Title Modal
          .modal__body
            .modal__content
              slot(name='body') Body Modal
        slot(name='modal-overlay')
</template>

<script>
// Import the EventBus.
// import ModalClose from './ModalClose';
import { EventBus } from '../../../event-bus.js';
export default {
  name: 'Modal',

  props: ["active"],

  components: {
    // ModalClose,
  },


  created() {
  },


  data() {
    return {
      isVisible: null,
    }
  },

  mounted() {
  },

  methods: {
    hidenModal() {
      this.isVisible = false;
    },

    close() {
      console.log('click');
      return this.isVisible = false;
    },

    onEsc() {
      console.log('qwerty');
    }
  },

  computed: {
    status() {
      this.isVisible = this.active;
      return this.isVisible;
    },
  }
}
</script>