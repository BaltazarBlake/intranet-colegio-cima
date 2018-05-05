<template lang="pug">
  div
    .band
      .container
        h1 Tu asistencia
    .container.tarjet
      .legend.row
        .col-xs-12
          h1.font-size-regular Leyenda
        .col-xs-12
          .legend__body.row
            .legend__label.col-xs
              i.circle
              span Inasistencia
            .legend__label.col-xs
              i.circle
              span Tardanza
            .legend__label.col-xs
              i.circle
              span Asistencia
      .row.no-wrap.m-b
        button.btn--default Mañana
        button.btn--default Tarde
        button.btn--default Reporte
      .row.m-b
        .col-xs-12.col-l-6
          calendar
        .col-xs-12.col-l-6
          calendar
      


</template>

<script>
// import { EventBus } from "../event-bus.js";
import jwt from 'jwt-decode';
import {getAssistance} from '../functions/fetchFunctions';
import {token} from '../cfg/core';
import Calendar from './globals/Calendar';
import Spinner from '@/components/globals/Spinner';
export default {
  name: 'Assistance',
  data(){
    return{
      report:null,
    }
  },
  components: {
    Calendar
  },

  async mounted() {
    await this.getData();
  },

  methods: {
    async getData() {
      const myToken = localStorage.getItem(token);
      const idUser = jwt(myToken).idUser;
      const res = await getAssistance(idUser);
      this.report = res;
      console.log(this.report);
    }
  }
}
</script>


