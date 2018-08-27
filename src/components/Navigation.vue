<template lang="pug">
  div
    section#navList.navigation
      template(v-if='image')
        .navigation__user-profile
          .navigation__wrapper-image
            img(:src='image', @error='detectedImages()', :class="image == 'dist/user.png' ? 't-0':'qwerty'").navigation__user-image.shadow-1
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
        li(v-if="nivel!=11").navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/CoursesExams" exact).navigation__link
            span.icon-file
            span Cursos y notas
        li(v-if="nivel!=8 && nivel!=11").navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/ModalityExams" exact).navigation__link
            span.icon-file
            span Simulacros
        li.navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/Assistance" exact).navigation__link
            span.icon-calendar-1
            span Asistencia
        li(v-if="nivel!=11").navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/Schedule" exact).navigation__link
            span.icon-horary
            span Horario
        li.navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/Observations" exact).navigation__link
            span.icon-notes
            span Anecdotario
        li.navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/Payment" exact).navigation__link
            span.icon-payment
            span Historial de pagos
        li.navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/Events" exact).navigation__link
            span.icon-event
            span Eventos
        li.navigation__item.col-xs-12
          router-link(active-class="is-active" to="/Dashboard/RolExams" exact).navigation__link
            span.icon-event
            span Rol de Exámenes
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
    

    //- MODAL
    modal.mx-90(:active.sync="showModal", :alert="true")
      template(slot='title')
        .row.cross-center
          .col-xs-12.col-s
            strong.font-size-x-large Alerta!
      template(slot='body')
        .row
          .col-xs-12
            h1.font-size-large.text-center ¿Desea cerrar sesión?
          .col-xs-12
            .row.m-b
              .col-xs.m-auto
                button.btn--default(@click="cancelLogout()") CANCELAR
              .col-xs.m-auto
                button.btn--danger(@click="sendLogout()") ACEPTAR
</template>
<script>
import {token} from '../cfg/core';
import Modal from "./global/Modal";
import Spinner from './global/Spinner';
import { EventBus } from "../event-bus.js";
export default{
  components:{
    Spinner,
    Modal
  },
  data(){
    return{
      name: null,
      image: null,
      navList: null,
      nivel:null,
      showModal:false,
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
      this.nivel = report.idnivel;
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

    detectedImages() {
      this.image = 'dist/user.png';
    },

    logout() {
      this.showModal = true;
    },

    logout() {
      this.showModal = true;
    },
    cancelLogout() {
      this.showModal = false;
    },

    sendLogout() {
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
      localStorage.removeItem('cima-parent-profile');
      localStorage.removeItem('cima-estudiante-events');
      localStorage.removeItem('cima-estudiante-rol-examenes');
      localStorage.removeItem('cima-estudiante-payment');
      this.$router.replace('/');
    }
  }
}
</script>