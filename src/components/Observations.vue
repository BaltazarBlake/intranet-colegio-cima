<template lang='pug'>
  div
    .band 
      .container
        h1.font-size-x-large Observaciones del alumno
    template(v-if='report')
        .container.target
          .row
            template(v-if='report == 1')
              .col-xs-12.col-xm-6.m-a
                  article.message-not-available.row.main-center.cross-center
                    h1.title2 No tiene observations.
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
        localStorage.setItem('cima-estudiante-observations',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-observations'));
      }
      this.report = res;
      // this.report.map((el)=> {
      //   el.reportadopor = el.reportadopor.replace('<b>', '');
      //   el.reportadopor = el.reportadopor.replace('</b>', '');
      // });

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