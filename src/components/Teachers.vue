<template lang="pug">
  div
    .band
      .container
        h1 Lista de profesores
    template(v-if="report")
        .container.target
          .row
            template(v-for="teacher in report")
              .col-xs-12.col-s-6.col-l-4.df
                .card--person.full
                  .img__wrapper--teacher
                    img(:src="'http://docente.cima.com.pe:8096/v4cima/vista/fotos/prf'+teacher.idprofesor+'.jpg'", alt="").card--person__img--teacher
                  .card--person__body
                    h1.card--person__title {{teacher.nombre}}
                    h2.card--person__subtitle {{teacher.asignatura}}
    template(v-else)
      spinner  
</template>

<script>
import Spinner from '@/components/globals/Spinner';
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
      let res = await getTeachers();
      this.report = res;
    }
  }
}
</script>

<style>

</style>
