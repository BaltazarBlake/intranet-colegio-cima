<template lang="pug">
  div
    .band.large
      .container
        div(v-if="profile").row.main-center.cross-center
          .col-xs-6.col-s
            .profile__wrapper-image.small
              //- img(:src="image" @error='detectedImages()').profile__user-image
              img(:src='profile.url_imagen' @error="detectedImages()").profile__user-image
          .col-xs-6.col-s
            h1.font-size-large {{profile.nombre}} {{profile.apellidos}}
            strong.font-size-small DNI: {{profile.dni}}
          .col-xs-12.col-s
            .d-f.main-center
              button(@click='logout()').btn--danger.is-active Cerrar Sesión
          
    template(v-if="report")
        .container.target
          .row
            .col-xs-12
              h1.font-size-x-large.text--center.m-t Lista de alumnos
            template(v-for="(data,index) in report")
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
                        button(@click="setChild(index)").btn--default Ver más
    template(v-else)
      spinner  

</template>

<script>
import Spinner from './global/Spinner';
import {token} from '../cfg/core';
export default {
  components: {Spinner},
  data() {
    return {
      report: null,
      profile: null,
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.report = JSON.parse(localStorage.getItem('cima-children'));
      this.profile = JSON.parse(localStorage.getItem('cima-parent-profile'));
      this.profile.url_imagen = `http://192.168.70.2/v4cima/vista/fotospadres/${this.profile.id}.jpg`
      this.report.map(el=>{
        el.url_imagen = `http://docente.cima.com.pe:8096/v4cima/vista/fotosalumno/${el.idpersona}.jpg`
      })
    },
    setChild(index){
      let child = this.report[index];
      localStorage.setItem('cima-estudiante',JSON.stringify(child));
      this.$router.push("/Dashboard");
    },
    detectedImages() {
      if(this.report){
        this.report.url_imagen = 'dist/user.png';   
      }     
    },
    logout() {
       localStorage.removeItem(token);
      localStorage.removeItem('cima-estudiante');
      localStorage.removeItem('cima-children');
      localStorage.removeItem('idTurn');
      localStorage.removeItem('cima-estudiante-asistencia');
      localStorage.removeItem('cima-estudiante-classmates');
      localStorage.removeItem('cima-estudiante-cursos');
      localStorage.removeItem('cima-reporte-simulacros');
      localStorage.removeItem('cima-estudiante-observations');
      localStorage.removeItem('cima-estudiante-parents');
      localStorage.removeItem('cima-estudiante-horario');
      localStorage.removeItem('cima-estudiante-profesores');
      localStorage.removeItem('cima-parent-profile');
      this.$router.replace('/');
    }
  }
}
</script>
