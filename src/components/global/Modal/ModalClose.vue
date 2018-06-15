<template lang="pug">
  div.modal__close(@click="close()")
    span.icon-close
</template>
<script>
import { EventBus } from '../../../event-bus.js';
export default {
  name: 'ModalClose',
  methods: {
    close() {
      EventBus.$emit('hidenModal', false);
    }
  }
}
</script>

