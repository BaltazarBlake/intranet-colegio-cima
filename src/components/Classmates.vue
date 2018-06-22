<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Directorio de alumnos
    template(v-if="report")
        .container.target
          .row
            template(v-for="data in report")
              .col-xs-12.col-s-6.col-m-4.d-f
                .profile.m-b
                  .profile__wrapper-image
                    img(:src="data.url_imagen", alt="").profile__user-image
                  .profile__description.row.main-center
                    .col-xs-12
                      h1.font-size-regular {{data.apellido}} {{data.nombre}}
                    .col-xs-12
                      small.font-size-small Cel.
                        template(v-for='(tel, index) in data.telefonoper')
                          small.font-size-regular(v-if='(index+1) % 2 == 0') -
                          strong.font-size-regular {{tel}}
                    .col-xs-12
                      small.font-size-small Dir. {{data.direccion}}
    template(v-else)
      .m-t-s
        spinner  
</template>

<script>
import {getClassmates} from '../functions/fetchFunctions';
import Spinner from './global/Spinner';
export default {
  components: {Spinner},
  data() {
    return {
      report: null,
    }
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res;
      if(!localStorage.getItem('cima-estudiante-classmates')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));
        res = await getClassmates(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem('cima-estudiante-classmates',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-classmates'));
      }
      
      this.report = res;
    }
  }
  
}
</script>