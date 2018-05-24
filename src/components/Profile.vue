<template lang="pug">
  div
    .band
    .container.target
      .row
        .col-xs-12
          template(v-if="report")
            template(v-for='data in report')
              .profile
                .profile__wrapper-image
                  img(:src="image" @error='detectedImages()').profile__user-image
                .profile__description.row.main-center
                  .col-xs-12
                    h1.font-size-large {{data.nombre}} {{data.apellido}}
                  .col-xs-12
                    h2.font-size-regular DNI: {{data.dni}}
                .profile__description.row.main-center
                  .col-xs-4
                    small Turno
                    p {{data.turno}}
                  .col-xs-4
                    small Aula
                    p {{data.aula}}
                  .col-xs-4
                    small Grado
                    p {{data.grado}}
                .row.main-center
                  .col-xs-6
                    small Sección
                    p {{data.seccion}}
                  .col-xs-6
                    small Pabellón
                    p {{data.pabellon}}
                .row.main-center
                  .col-xs-12
                    small Dirección
                    p {{data.direccion}}
          template(v-else)
            spinner
</template>
<script>
import Spinner from './global/Spinner';
export default{
  components:{Spinner},
  data(){
    return{
      report:null,
      image:null,
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.report = JSON.parse(localStorage.getItem('cima-usuario'));
      this.image = `http://docente.cima.com.pe:8096/v4cima/vista/fotosalumno/${this.report[0].idpersona}.jpg`;
      localStorage.setItem('idTurn', this.report.idturno);
    },
    detectedImages() {
      this.image = 'dist/user.png';
    }
  }
}
</script>