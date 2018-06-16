<template lang='pug'>
  div(v-show='active')
    template
      .modal
        div.modal__close(@click="close()")
          span.icon-close
        .modal__header
          .modal__title
            slot(name='title') Title Modal
        .modal__body
          .modal__content
            slot(name='body') Body Modal..
      .overlay__modal(@click="close()")
</template>

<script>
export default {
  name: 'Modal',

  props: {
    active: Boolean,
  },

  created() {
    this.onEsc();
  },

  data() {
    return {
      isVisible: false,
    }
  },

  methods: {
    close() {
      this.$emit('update:active', false);
    },
    onEsc() {
      document.body.addEventListener("keyup", e => {
        if (e.keyCode === 27) {
          this.close();
        }
      });
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