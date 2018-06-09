<template lang="pug">
  div
    .band 
      .container
        h1.font-size-x-large Eventos
    template(v-if='report')
        .container.target
          .row
            template(v-for='data in report')
              .col-xs-12.col-m-4.col-xl-3
                article.card--event(:class="getClassStatus()")
                  .card--event__date
                    strong(v-text='format(data.fecha)').font-size-large.text--uppercase
                  .card--event__description
                    .card--event__name
                      h1.text--uppercase {{data.descripcion}}
                    .card--event__hour
                      small A LAS 
                      strong {{data.hora}} 
                      small HORAS
                      CountDown(:date='data.fecha', :hour='data.hora')

</template>

<script>
import { EventBus } from '../event-bus.js';
import { formatDate } from "../functions/formatDate";
import {getEvent} from '../functions/fetchFunctions';
import CountDown from "./global/CountDown";
export default {
  components: {
    CountDown
  },
  data() {
    return {
      report:null,
      status:null,
    }
  },
  created() {
    // Listen countdown
    EventBus.$on('listenCountdown', (data) => this.status = data);
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res;
      if(!localStorage.getItem('cima-estudiante-events')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));      
        res = await getEvent(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem('cima-estudiante-events',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-events'));
      }
      this.report = res;
    },
    format(el) {
      let dates = el.split("-");
      let date = formatDate(dates[0], dates[1], dates[2]);
      return date;
    },
    getClassStatus() {
      let classStatus;
      if (this.status == 0) {
        classStatus = '';
      } else if (this.status == 1) {
        classStatus = 'onload';
      } else if (this.status == 2) {
        classStatus = 'complete';
      }
      return classStatus;
    },
  }
}
</script>
