<template lang="pug">
  section#navList.navigation
    template(v-if='report')
      .navigation__user-profile
        .navigation__wrapper-image
          img(:src='report.image').navigation__user-image.shadow-1
        strong.navigation__user-name {{report.name}}
        button(@click='logout()').btn--danger.is-active.navigation__btn Cerrar Sesión
    template(v-else)
      spinner
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
import { token } from "../cfg/core";
import Spinner from '@/components/globals/Spinner';
export default {
  name: "Navigation",

  components: {
    Spinner
  },

  data() {
    return {
      report: null,
    }
  },

  created() {
    // Listen for the showNavigation event
    EventBus.$on('showNavigation', () => {
      const navList = document.getElementById('navList');
      navList.classList.toggle('is-show');
    });

    // 
    EventBus.$on('shareData', (data) => {
      this.report = data;
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
      localStorage.removeItem(token);
      this.$router.replace('/');
    }
  }
};
</script>
