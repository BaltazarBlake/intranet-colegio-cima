<template lang='pug'>
  div
    .container
      .row
        .col-xs
          h1 Buttons
        .col-xs-12
          .row.cross-center
            .col-xs.m-b
              button.btn--primary View more
            .col-xs.m-b
              button.btn--default Default
            .col-xs.m-b
              button.btn--danger Danger
            .col-xs.m-b
              button.btn--warning Warning
            .col-xs-12.col-s.m-b
              a(href="#").link Link
      .row
        .col-xs-12
          h1 Card
        .col-xs-12
          .card
            h1.card__title Título
            .card__body
              p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia... 
            .row.main-end
              .col-xs
                button.btn--warning.is-active Send
      .row
        .col-xs-12
          h1 Modal
        .col-xs-12
          button(@click='viewModal()').btn--default View modal    
    //- .row.is-hide#modal
    //-   .col-xs-12
    //-     .container
    //-       .modal.card
    //-         h1 Esto es un modal
    //-       .overlay__modal
    Modal
        
</template>

<script>
// Import the EventBus we just created.
import { EventBus } from '../event-bus.js';
import Modal from '@/components/globals/Modal';

export default {
  name: 'StyleGuide',

  components: {
    Modal
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isVisible: false,
    }
  },

  methods: {
    viewModal() {
      EventBus.$emit('showModal', this.isVisible);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.m-b {
  margin-bottom: .5em;
}
.row.is-view {
  display: flex;
}
.row.is-hide {
  display: none;
}

</style>
