<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Información de apoderados
    template(v-if='report')
      .container.target
        .row
          template(v-for='data in report')
            .col-xs-12.col-m-6.d-f
              .profile
                .profile__wrapper-image
                  //- img(src='../assets/logo.png' @error='detectedImages(data.url_imagen)').profile__user-image
                  img(:src='data.url_imagen' @error='detectedImages(data)').profile__user-image.parent
                .profile__description.row.main-center
                  .col-xs-12
                    h1.font-size-large {{data.nombre}} {{data.apellido}}
                  .col-xs-12
                    h2.font-size-small ({{data.descripcion}})
                  .col-xs-12
                    h2.font-size-small DNI: {{data.dni}}
                .profile__description.row.main-center
                  .col-xs-4
                    small Teléfono
                    p {{data.telefono}}
                  .col-xs-12
                    small Email
                    p(v-text="data.email == '' ? '-' : data.email ")
                  .col-xs-12
                    small Dirección
                    p {{data.direccion}}


    template(v-else)
      spinner
</template>

<script>
import {getParents} from '../functions/fetchFunctions';
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
      if(!localStorage.getItem('cima-estudiante-parents')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));
        res = await getParents(data.idalumnocolegio);
        localStorage.setItem('cima-estudiante-parents',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-parents'));
      }
      this.report = res;
    },

    detectedImages(el) {
      let i = this.report.indexOf(el);
      if (this.report[i] != undefined) {
        this.report[i].url_imagen = 'dist/user.png';        
      }
    }
  }
}
</script>
