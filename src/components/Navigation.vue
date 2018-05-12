<template lang="pug">
  section#navList.navigation
    template(v-if='image')
      .navigation__user-profile
        .navigation__wrapper-image
          img(:src='image').navigation__user-image.shadow-1
        strong.navigation__user-name {{name}}
        button(@click='logout()').btn--danger.is-active.navigation__btn Cerrar Sesión
    template(v-else)
      spinner
    ul.row
      li.navigation__item.col-xs-12
        a(@click="$router.replace('/Dashboard')").navigation__link
          span.icon-home
          span Inicio
      li.navigation__item.col-xs-12
        //- router-link(to='/Dashboard/Parents') Información de apoderados
        a(@click="$router.replace('/Dashboard/Parents')").navigation__link
          span.icon-home
          span Información de apoderados
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-file
          span Exámenes
      li.navigation__item.col-xs-12
        a(@click="$router.replace('/Dashboard/Assistance')").navigation__link
          span.icon-calendar-1
          span Asistencia
      li.navigation__item.col-xs-12
        a(@click="$router.replace('/Dashboard/Schedule')").navigation__link
          span.icon-horary
          span Horario
      li.navigation__item.col-xs-12
        a(@click="$router.replace('/Dashboard/Observations')").navigation__link
          span.icon-notes
          span Observaciones
      li.navigation__item.col-xs-12
        a(@click="$router.replace('/Dashboard/Teachers')").navigation__link
          span.icon-team
          span Profesores
      li.navigation__item.col-xs-12
        a(@click="$router.replace('/Dashboard/Classmates')").navigation__link
          span.icon-team
          span Directorio de alumnos
      li.navigation__item.col-xs-12
        a(@click="$router.replace('/Dashboard/Regulation')").navigation__link
          span.icon-book
          span Documentos Int.
</template>

<script>
import jwt from 'jwt-decode';
import {getProfile} from '../functions/fetchFunctions';
import { token } from "../cfg/core";

import { EventBus } from "../event-bus.js";
import Spinner from '@/components/globals/Spinner';
export default {
  name: "Navigation",

  components: {
    Spinner
  },

  data() {
    return {
      name: null,
      image: null,
    }
  },
  created() {
    // Listen for the showNavigation event
    EventBus.$on('showNavigation', () => {
      const navList = document.getElementById('navList');
      navList.classList.toggle('is-show');
    });
  },

  async mounted() {
    await this.getData();
    this.render();
  },

  methods: {

    async getData() {
      const myToken = localStorage.getItem(token);
      const idUser = jwt(myToken).user;
      const res = await getProfile(idUser);
      let report = res;
      let idPerson = report.idpersona;
      this.image = `http://docente.cima.com.pe:8096/v4cima/vista/fotosalumno/${idPerson}.jpg`;
      this.name = `${report.nombre} ${report.apellido}`;
    },

    render() {
      //  Breakpoint
      const MediumBp = matchMedia('(min-width: 1170px)');
      const changeSize = (mql) => {
        if (mql.matches) {
          navList.classList.add('is-show');
        } else {
          navList.classList.remove('is-show');
        }
      };

      MediumBp.addListener(changeSize);
      changeSize(MediumBp);
    },

    logout() {
      localStorage.removeItem(token);
      this.$router.replace('/');
    }
  }
};
</script>
