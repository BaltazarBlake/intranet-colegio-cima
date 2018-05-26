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
        button(@click="showChildren" v-if="children").btn--warning.btn--change.is-active Cambiar
    //- Main content
    main.main-content
      navigation
      .wrapper
        //- section render components
        transition(name='fade' mode='out-in')
          router-view
    
</template>
<script>
import Navigation from './Navigation';
import {EventBus} from '../event-bus.js';
export default{
  components:{Navigation},
  data(){
    return{
      children:false
    }
  },
  mounted(){
    this.children = localStorage.getItem('cima-children')!=null;
  },
  methods:{
     viewNavigation() {
      EventBus.$emit('showNavigation');
    },
    showChildren(){
      localStorage.removeItem('cima-estudiante-asistencia');
      localStorage.removeItem('cima-estudiante-classmates');
      localStorage.removeItem('cima-estudiante-cursos');
      localStorage.removeItem('cima-reporte-simulacros');
      localStorage.removeItem('cima-estudiante-observations');
      localStorage.removeItem('cima-estudiante-parents');
      localStorage.removeItem('cima-estudiante-horario');
      localStorage.removeItem('cima-estudiante-profesores');
      this.$router.push("/Familyguy");
    }
  }
}
</script>