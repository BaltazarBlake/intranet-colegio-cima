<template lang="pug">
  section#navList.navigation
    template(v-if='image')
      .navigation__user-profile
        .navigation__wrapper-image
          img(:src='image').navigation__user-image.shadow-1
        strong.navigation__user-name.text--center {{name}}
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
        router-link(active-class="is-active" to="/Dashboard/CoursesExams" exact).navigation__link
          span.icon-file
          span Cursos y notas
      li.navigation__item.col-xs-12
        router-link(active-class="is-active" to="/Dashboard/ModalityExams" exact).navigation__link
          span.icon-file
          span Simulacros
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
      navList: null,
    }
  },
  created() {
    // Listen for the showNavigation event
    EventBus.$on('showNavigation', () => {
      this.navList.classList.toggle('is-show');
    });
  },
  mounted(){
    this.getData();
    this.render();
  },
  methods:{
    getData(){
      let report = JSON.parse(localStorage.getItem('cima-estudiante'));
      let idPerson = report.idpersona;
      this.image = `http://docente.cima.com.pe:8096/v4cima/vista/fotosalumno/${idPerson}.jpg`;
      this.name = `${report.nombre} ${report.apellido}`;
      this.navList = document.getElementById('navList');      
    },
    render() {
      //  Breakpoint
      const MediumBp = matchMedia('(min-width: 1170px)');
      const changeSize = (mql) => {
        if (mql.matches) {
          this.navList.classList.add('is-show');
        } else {
          this.navList.classList.remove('is-show');
        }
      };

      MediumBp.addListener(changeSize);
      changeSize(MediumBp);
    },

    logout() {
      localStorage.removeItem(token);
      localStorage.removeItem('cima-estudiante');
      localStorage.removeItem('cima-children');
      localStorage.removeItem('idTurn');
      localStorage.removeItem('cima-estudiante-asistencia');
      localStorage.removeItem('cima-estudiante-classmates');
      localStorage.removeItem('cima-estudiante-cursos');
      localStorage.removeItem('cima-reporte-simulacros');
      localStorage.removeItem('cima-estudiante-observations');
      localStorage.removeItem('cima-estudiante-parents');
      localStorage.removeItem('cima-estudiante-horario');
      localStorage.removeItem('cima-estudiante-profesores');
      this.$router.replace('/');
    }
  }
}
</script>