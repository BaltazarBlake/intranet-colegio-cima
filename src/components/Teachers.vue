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
                      h2.font-size-small {{teacher.asignatura}}
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
