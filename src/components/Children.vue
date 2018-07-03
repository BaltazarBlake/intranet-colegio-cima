<template lang="pug">
    Menu
      span(slot='button') Cambiar
      template(slot='body')
        .row
          template(v-for="(data,index) in children")
            .col-xs-6.m-b
              .row.main-center.u-hover(@click="changeChildren(data)")
                .col-xs-12
                  .profile__wrapper-image.x-small
                    img(:src='data.url_imagen', alt="").profile__user-image
                  .profile__description
                      strong.font-size-regular {{data.nombre}}
</template>

<script>
import Menu from "./global/Menu";
export default {
  components: {
    Menu
  },
  data(){
    return{
      children:[]
    }
  },
  mounted(){
    let alumn = JSON.parse(localStorage.getItem('cima-estudiante'));
    let children = JSON.parse(localStorage.getItem('cima-children'));
    let index = -1 ;
    children.map(el=>{
      if(el.idpersona == alumn.idpersona){
        index = children.indexOf(el);
      }
    })
    children.splice(index,1);
    this.children = children;
  },
  methods:{
    changeChildren(data){
      // let path = this.$router.history.current.path;
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
      localStorage.setItem('cima-estudiante',JSON.stringify(data));
      this.$router.replace('/Dashboard');
      location.reload();
    }
  }
}
</script>
