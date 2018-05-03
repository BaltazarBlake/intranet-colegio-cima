<template lang="pug">
  section#navList.navigation
    .navigation__user
      .img--perfil
        //- img(:src="imgPerson", alt="").navigation__img.shadow-1
      strong.navigation__title Estudiante CIMA
      button(@click='logout()').btn--danger.is-active.navigation__btn Cerrar Sesión
    ul.row
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-home
          span Inicio
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-file
          span Exámenes
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-calendar-1
          span Asistencia
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-horary
          span Horario
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-notes
          span Observaciones
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-team
          span Profesores
      li.navigation__item.col-xs-12
        a().navigation__link
          span.icon-book
          span Reglamento Int.
</template>

<script>
import { EventBus } from "../event-bus.js";
export default {
  name: "Navigation",

  created() {
    // Listen for the showNavigation event
    EventBus.$on('showNavigation', () => {
      const navList = document.getElementById('navList');
      navList.classList.toggle('is-show');
    });
  },

  mounted() {
    this.render();
  },

  methods: {
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
      
    }
  }
};
</script>
