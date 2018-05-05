<template lang="pug">
  div
    .band
      .container
        h1 Once Section
    .container.tarjet
      .row
        .col-xs-12
          template(v-if="report")
            .profile
              .profile__wrapper-image
                img(:src="image").profile__user-image
              .profile__description.row.main-center
                .col-xs-12
                  h1.font-size-large {{report.nombre}} {{report.apellido}}
                .col-xs-12
                  h2.font-size-regular DNI: {{report.dni}}
              .profile__description.row.main-center
                .col-xs-4
                  small Turno
                  p {{report.turno}}
                .col-xs-4
                  small Aula
                  p {{report.aula}}
                .col-xs-4
                  small Grado
                  p {{report.grado}}
              .row.main-center
                .col-xs-6
                  small Sección
                  p {{report.seccion}}
                .col-xs-6
                  small Pabellón
                  p {{report.pabellon}}
              .row.main-center
                .col-xs-12
                  small Dirección
                  p {{report.direccion}}
          template(v-else)
            spinner


</template>

<script>
import { EventBus } from "../event-bus.js";
import jwt from 'jwt-decode';
import {getProfile} from '../functions/fetchFunctions';
import {token} from '../cfg/core';
import Spinner from '@/components/globals/Spinner';
export default {

  name: 'Dashboard',

  components: {
    Spinner
  },

  data() {
    return {
      report: null,
      idPerson: null,
      image: null
    }
  },

  async mounted() {
    await this.getData();
    this.shareData();
  },

  methods: {
    async getData() {
      const myToken = localStorage.getItem(token);
      const idUser = jwt(myToken).user;
      const res = await getProfile(idUser);
      this.report = res;
      this.idPerson = this.report.idpersona;
      this.image = `http://docente.cima.com.pe:8096/v4cima/vista/fotosalumno/${this.idPerson}.jpg`;

      localStorage.setItem('idTurn', this.report.idturno);
    },

    shareData() {
      let image = this.image;
      let name = `${this.report.nombre} ${this.report.apellido}`;
      EventBus.$emit('shareData',
        {
          name,
          image,
        });
    }
  }
}
</script>

