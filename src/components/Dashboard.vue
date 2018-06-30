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
        Children
    //- Main content
    main.main-content
      navigation
      .wrapper
        //- section render components
        transition(name='fade' mode='out-in')
          router-view
        .container
          button.btn--floating.shadow-2(@click="reload()")
            i.icon-refresh
    
</template>
<script>
import Navigation from './Navigation';
import Children from './Children';
import {EventBus} from '../event-bus.js';
import {setLogeo} from '../functions/fetchFunctions';
export default{
  components:{Navigation,Children},
  data(){
    return{
      children:false
    }
  },
  async mounted(){
    this.children = localStorage.getItem('cima-children')!=null;
    let idClient, type=0;
    if(localStorage.getItem('cima-parent-profile')){
      idClient = JSON.parse(localStorage.getItem('cima-parent-profile')).id;
      type = 1; 
    }else if(localStorage.getItem('cima-estudiante')){
      idClient = JSON.parse(localStorage.getItem('cima-estudiante')).idalumnocolegio;
      type = 2;
    }

    if(type!=0){
      const res = await setLogeo(idClient,type);
    }
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
      localStorage.removeItem('cima-estudiante-events');
      localStorage.removeItem('cima-estudiante-payment');
      this.$router.push("/Familyguy");
    },
    reload() {
      let path = this.$router.history.current.path;
      localStorage.removeItem('cima-estudiante-asistencia');
      localStorage.removeItem('cima-estudiante-classmates');
      localStorage.removeItem('cima-estudiante-cursos');
      localStorage.removeItem('cima-reporte-simulacros');
      localStorage.removeItem('cima-estudiante-observations');
      localStorage.removeItem('cima-estudiante-parents');
      localStorage.removeItem('cima-estudiante-horario');
      localStorage.removeItem('cima-estudiante-profesores');
      localStorage.removeItem('cima-estudiante-events');
      localStorage.removeItem('cima-estudiante-payment');
      this.$router.go(path);
      
    }
  }
}
</script>