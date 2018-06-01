<template lang="pug">
  div
    .band
    .container.target
      .row
        .col-xs-12
          template(v-if="report")
            .profile
              .profile__wrapper-image
                img(:src="image", @error='detectedImages()', :class="image == 'dist/user.png'? 'parent':''").profile__user-image
              .profile__description.row.main-center
                .col-xs-12
                  h1.font-size-large {{report.nombre}} {{report.apellido}}
                .col-xs-12
                  h2.font-size-regular DNI: {{report.dni}}
              .profile__description.row.main-center
                .col-xs-6
                  strong Código Carné
                  p.font-weight-bold {{report.idalumnocolegio}}
                .col-xs-6
                  strong Código Banco
                  p.font-weight-bold {{report.codigobanco}}
              .row.main-center
                .col-xs-6
                  small Turno
                  p {{report.turno}}
                .col-xs-6
                  small Aula - Pabellón
                  p {{report.aula}} - {{report.pabellon}}
              .row.main-center
                .col-xs-6
                  small Grado - Sección
                  p {{report.grado}} - {{report.seccion}}
                .col-xs-6
                  small Nivel
                  p {{report.nivel}}
              .row.main-center
                .col-xs-12
                  small Dirección
                  p {{report.direccion}}
              
          template(v-else)
            .m-t-s
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
      this.report = JSON.parse(localStorage.getItem('cima-estudiante'));
      this.image = `http://docente.cima.com.pe:8096/v4cima/vista/fotosalumno/${this.report.idpersona}.jpg`;
      localStorage.setItem('idTurn', this.report.idturno);
    },
    detectedImages() {
      this.image = 'dist/user.png';
    }
  }
}
</script>