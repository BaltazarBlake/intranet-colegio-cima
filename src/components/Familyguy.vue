<template lang="pug">
  div
    .band.large
      .container
        .row.main-center.cross-center
          .col-xs-6.col-s
            .profile__wrapper-image.small
              //- img(:src="image" @error='detectedImages()').profile__user-image
              img(src='').profile__user-image
          .col-xs-6.col-s
            h1.font-size-large Padre de familia
            strong.font-size-small DNI: 12345678
          .col-xs-12.col-s
            .d-f.main-center
              button.btn--danger.is-active Cerrar Sesión
          
    template(v-if="report")
        .container.target
          .row
            .col-xs-12
              h1.font-size-x-large.text--center.m-t Lista de alumnos
            template(v-for="data in report")
              .col-xs-12.col-s-6.col-m-4.d-f
                .profile.m-b
                  .profile__wrapper-image
                    img(:src='data.url_imagen', alt="").profile__user-image
                  .profile__description.row.main-center
                    .col-xs-12
                      h1.font-size-regular {{data.nombre}} {{data.apellido}}
                    .col-xs-12
                      h2.font-size-small {{data.grado}} {{data.seccion}}
                    .col-xs-12
                      .row.main-center
                        button.btn--default Ver más
    template(v-else)
      spinner  

</template>

<script>
import Spinner from './global/Spinner';
export default {
  components: {Spinner},
  data() {
    return {
      report: null,
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.report = JSON.parse(localStorage.getItem('cima-children'));
    }
  }
}
</script>
