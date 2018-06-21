<template lang='pug'>
  div
    .band 
      .container
        .row.cross-center.m-b
          .col-xs-12.col-s
            h1.font-size-x-large Observaciones del alumno
          .col-xs
            strong(:class="nota >= 10.5? 'green':'red'").sticker.m-b-0 PROMEDIO DE CONDUCTA: {{nota}}
    template(v-if='report')
        .container.target
          .row
            template(v-if='report == 1')
              .col-xs-12.m-a
                  article.card
                    h1.title2 No tiene observaciones
            template(v-else)
              .col-xs-12
                tabs.row
                  template(v-for='(data,index) in report')
                    tab(:name='rename(data.bimestre)' :selected='isTrue(index)')
                      .col-xs-12.m-t
                        .row
                          template(v-for='observations in data.observaciones')
                            .col-xs-12.col-s-6.col-m-4.col-l-3.d-f
                              .card.m-b
                                .row
                                  .col-xs-12.m-b-2
                                    small.font-size-regular Fecha:
                                    h1.font-size-regular {{observations.fecha}}
                                  .col-xs-12.m-b-2
                                    small.font-size-regular Concepto:
                                    h1.font-size-regular {{observations.observacion}}
                                  .col-xs-12.m-b-2
                                    small.font-size-regular.u-bold(:class="observations.puntos<0? 'red':'green'") Puntos:
                                    h1.font-size-regular(:class="observations.puntos<0? 'red':'green'") {{observations.puntos}}
                                  .col-xs-12.m-b-2
                                    small.font-size-regular Reportado por:
                                    h1.font-size-regular {{observations.reportadopor}}

    template(v-else)
      .m-t-s
        spinner
</template>
<script>
import Tabs from "./global/Tabs";
import Tab from "./global/Tab";
import Spinner from './global/Spinner';
import {getObservations} from '../functions/fetchFunctions';
export default{
  components:{
    Spinner,
    Tabs,
    Tab,
  },
  data(){
    return{
      report:null,
      nota:18,
    }
  },
  async mounted(){
    await this.getData();
  },
  methods:{
    async getData(){
      let res;
      if(!localStorage.getItem('cima-estudiante-observations')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));      
        res = await getObservations(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem('cima-estudiante-observations',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-observations'));
      }
      this.report = res;
      this.report.map((el)=> {
        el.observaciones.map(obs=>{
          this.nota += parseInt(obs.puntos);
          obs.reportadopor = obs.reportadopor.replace('<b>', '');
          obs.reportadopor = obs.reportadopor.replace('</b>', '');
        })
      });

    },
    isTrue(el) {
      if (el == 0) {
        return "true";
      }
    },
    rename(el) {
      return `${el}° BIMESTRE`;
    },
  }
}
</script>