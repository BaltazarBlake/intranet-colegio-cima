<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Lista de profesores
    template(v-if="report")
        .container.target
          .row
            template(v-for="teacher in report")
              .col-xs-12.col-s-6.col-m-4.d-f
                .profile.m-b
                  .profile__wrapper-image
                    img(:src="'http://docente.cima.com.pe:8096/v4cima/vista/fotos/prf'+teacher.idprofesor+'.jpg'", alt="").profile__user-image
                  .profile__description.row.main-center
                    .col-xs-12
                      h1.font-size-regular {{teacher.nombre}}
                    .col-xs-12
                      p.font-size-regular {{teacher.telefonosms}}
                    .col-xs-12
                      small.font-size-small {{getText(teacher.asignaturas)}} 
    template(v-else)
      .m-t-s
        spinner  
</template>

<script>
import Spinner from './global/Spinner';
import {getTeachers} from '../functions/fetchFunctions';

export default {
  components:{Spinner},
  data(){
    return{
      report:null,
    }
  },
  async mounted(){
    await this.getData();
  },
  methods:{
    async getData(){
      let res;
      if(!localStorage.getItem('cima-estudiante-profesores')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));
        res = await getTeachers(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem('cima-estudiante-profesores',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-profesores'));
      }
      this.report = res;
    },
    getText(el){
      let text = '';
      el.map(t=>{
        text += `${t.asignatura}, `;
      })
      return text.substring(0,text.length-2);
    }
  }
}
</script>