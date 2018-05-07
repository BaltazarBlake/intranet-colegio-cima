<template lang="pug">
  div
    .band
      .container
        h1 Tu asistencia
    .container.tarjet
      .row
        .col-xs-12
          template(v-if='report')
            .card
              .card__title
                h1.font-size-regular Leyenda
              .card__body
                .legend__label
                  i.circle
                  span Inasistencia
                .legend__label
                  i.circle
                  span Tardanza
                .legend__label
                  i.circle
                  span Asistencia
            .d-f.m-b
              button(@click='checkMorning()' :class='turn? "is-active" : ""').btn--default Mañana
              button(@click='checkAfternoon()' :class='turn? "" : "is-active"').btn--default Tarde
              button.btn--default Reporte
            .row
              template(v-for='month in report')
                .col-xs-12.col-l-6
                  calendar(:data='month' :idTurn='idTurn' :turn='turn')
          template(v-else)
            spinner
    modal
</template>

<script>
import jwt from 'jwt-decode';
import {getAssistance} from '../functions/fetchFunctions';
import {token} from '../cfg/core';
import { EventBus } from '../event-bus.js';

import Modal from '@/components/globals/Modal';
import Spinner from '@/components/globals/Spinner';
import Calendar from './globals/Calendar';
export default {
  name: 'Assistance',
  data(){
    return{
      report:null,
      idTurn: null,
      turn: null,
    }
  },
  components: {
    Modal,
    Spinner,
    Calendar,
  },

  async mounted() {
    await this.getData();
    this.checkTurn();
  },

  methods: {
    async getData() {
      const myToken = localStorage.getItem(token);
      const idUser = jwt(myToken).idUser;
      let res = await getAssistance(idUser);
      res = res.assistance;
      
      this.idTurn = localStorage.getItem('idTurn');

      this.report = [];
      for (let i = 0; i < res.length; i++) {
        this.report[i] = res[i].map(data => {
          return {
            id_asistencia: data.id_asistencia,
            numero_dia: data.numero_dia,
            mes: data.mes,
            hora_turno: this.idTurn == 1 ? data.hora_mañana : data.hora_tarde,
            hora_opcional: this.idTurn == 1 ? data.hora_tarde : data.hora_mañana,
            estado: this.idTurn == 1 ? data.estado_mañana : data.estado_tarde,
            nro_dia: data.nro_dia,

            nro_mes: data.nro_mes,
            nro_anio: data.nro_year,
          };
        });
      }

      this.report.reverse();
    },

    checkTurn() {
      if (this.idTurn == 1) {
        this.turn = true;
      } else {
        this.turn = false;
      }
    },

    checkMorning() {
      this.turn = true;
    },

    checkAfternoon() {
      this.turn = false;
    },

    sendData() {
      EventBus.$emit('sendJustification', {
        data: 'la data'
      });
    }
  }
}
</script>


