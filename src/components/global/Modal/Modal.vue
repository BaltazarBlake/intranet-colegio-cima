<template lang='pug'>
  div
    template(v-if='status')
      .modal
        ModalClose
        .modal__header
          .modal__title
            slot(name='title') Title Modal
        .modal__body
          .modal__content
            slot(name='body')
      .overlay__modal(@click='')
</template>

<script>
// Import the EventBus.
import ModalClose from './ModalClose';
import { EventBus } from '../../../event-bus.js';
export default {
  name: 'Modal',

  props: ["active"],

  components: {
    ModalClose,
  },


  created() {
    // Listen for the showModal event
    // EventBus.$on('showModal', () => this.isVisible = true);
    // Listen for the hidenModal event
    EventBus.$on('hidenModal', (e) => this.active = e);
  },


  data() {
    return {
      isVisible: null,
    }
  },

  mounted() {
    // this.eventKey();
  },

  methods: {
    hidenModal() {
      this.isVisible = false;
    },

    close() {
      console.log('click');
      return this.isVisible = false;
    }

    // eventKey() {
    //   document.body.addEventListener("keyup", e => {
    //     if (e.keyCode === 27) {
    //       this.hidenModal();
    //     }
    //   });
    // }
  },

  computed: {
    status() {
      this.isVisible = this.active;
      return this.isVisible;
    },
  }
}
</script>