<template lang="pug">
  div
    .band 
      .container
        h1.font-size-x-large ROL DE EXÁMENES {{bimestre}} BIMESTRE
    template(v-if='report')
        .container.target
          .row
            template(v-for='data in report')
              .col-xs-12.col-m-6.col-xl-4.d-f
                article.card--event(:class="getClassStatus(data.estado)")
                  .card--event__date
                    strong.font-size-large.text--uppercase {{data.dia}} {{format(data.fecha)}}
                  .card--event__description
                    .card--event__name(v-for="curso in data.cursos")
                      h2.text--uppercase {{curso.curso}}
                      p.font-size-small ({{curso.tipo}})
                      p.font-size-regular {{curso.docente}}
                    //- .card--event__hour
                    //-   small A LAS 
                    //-   strong {{data.hora}} 
                    //-   small HORAS.
    template(v-else-if='report===undefined')
      .container.target
        .col-xs-12
          .card
            .row
              .col-xs-12
                h1.font-size-xxx-large.text--center No tienes rol de exámenes.
    template(v-else)
      .m-t-s
        spinner

</template>

<script>
import { EventBus } from '../event-bus.js';
import { formatDate } from "../functions/formatDate";
import {getRolExamenes} from '../functions/fetchFunctions';
import Spinner from './global/Spinner';
export default {
  components: {
    Spinner
  },
  data() {
    return {
      report:null,
      status:null,
      bimestre:null
    }
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res;
      if(!localStorage.getItem('cima-estudiante-rol-examenes')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));      
        res = await getRolExamenes(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem('cima-estudiante-rol-examenes',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-rol-examenes'));
      }
      this.report = res;
      if(this.report){
        switch(this.report[0].bimestre){
          case 1: this.bimestre = 'I'; break;
          case 2: this.bimestre = 'II'; break;
          case 3: this.bimestre = 'III'; break;
          case 4: this.bimestre = 'IV'; break;
        }
      }
        
    },
    format(el) {
      let dates = el.split("-");
      let date = formatDate(dates[0], dates[1], dates[2]);
      return date;
    },
    getClassStatus(status) {
      let classStatus;
      if (status == 1 && this.status == 1 ) {
        classStatus = 'onload';
      } else if (status == 0) {
        classStatus = 'complete';
      } else if (this.status == 0 && status != 0) {
        classStatus = '';
      }
      return classStatus;
    },
  }
}
</script>

