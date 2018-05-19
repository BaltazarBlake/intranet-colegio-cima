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
        router-link(active-class="is-active" to="/Dashboard" exact).navigation__link
          span.icon-home 
          span Inicio
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/Parents" exact).navigation__link
          span.icon-home
          span Información de apoderados
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-file
          span Exámenes
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/Assistance" exact).navigation__link
          span.icon-calendar-1
          span Asistencia
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/Schedule" exact).navigation__link
          span.icon-horary
          span Horario
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/Observations" exact).navigation__link
          span.icon-notes
          span Observaciones
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/Teachers" exact).navigation__link
          span.icon-team
          span Profesores
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/Classmates" exact).navigation__link
          span.icon-team
          span Directorio de alumnos
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/Regulation" exact).navigation__link
          span.icon-book
          span Documentos Int.
</template>
<script>
import {token} from '../cfg/core';
import Spinner from './global/Spinner';
import { EventBus } from "../event-bus.js";
export default{
  components:{Spinner},
  data(){
    return{
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
  mounted(){
    this.getData();
    this.render();
  },
  methods:{
    getData(){
      let report = JSON.parse(localStorage.getItem('cima-usuario'));
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
}
</script>