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
          .modal__print
            button(@click="print('print')").btn--warning.is-active
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
    // Listen for the showReport event
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
    },

    print(idReport) {
      let report = document.getElementById(idReport);
      let style = document.styleSheets[0].cssRules;
      let styleString = '';
      
      for (let i = 0; i < style.length; i++) {
        styleString += style[i].cssText
      }

      let print =
        "<!DOCTYPE html>" +
        "<html lang='en'>" +
        "<head>" +
        "<style>"+ styleString +"</style>" +
        "<meta charset='UTF-8'>" +
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
        "<title>Reporte</title>" +
        "<style> button {display: none}</style>" +
        "</head>" +
        "<body onload='window.print();window.close()'>";

      print += report.outerHTML + "</body>" + "</html>";

      let printWindow = window.open("", "_blank");
      printWindow.document.write(print);
      printWindow.document.close();
    }
  },
}
</script>
