<template lang="pug">
  div
    //- Main header
    header.main-header
      .main-header__content.container
        //- Boton Hamburguesa
        button(@click='viewNavigation()').btn--burger
          .icon-burger
        //- Logo CIMA
        img(src="../assets/logo_colegio.svg", alt="Colegio CIMA").main-header__logo
    //- Main content
    main.main-content
      navigation
      .wrapper
        //- section render components
        router-view
    
    
</template>

<script>
import { EventBus } from '../event-bus.js';
import Navigation from './Navigation';
// import Spinner from './Spinner';
export default {
  name: 'Dashboard',

  components: {
    Navigation,
    // Spinner
  },

  methods: {
    viewNavigation() {
      EventBus.$emit('showNavigation');
    }
  },
}
</script>
