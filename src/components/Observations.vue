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
                    h1.title2 Horario aún no disponible.
            template(v-else)
              template(v-for='data in report')
                .col-xs-12.col-s-6.col-xm-4.col-l-3.d-f
                  .card.m-b
                    .row
                      .col-xs-12.m-b-2
                        small.font-size-regular Fecha:
                        h1.font-size-regular {{data.fecha}}
                      .col-xs-12.m-b-2
                        small.font-size-regular Concepto:
                        h1.font-size-regular {{data.observacion}}
                      .col-xs-12.m-b-2
                        small.font-size-regular Reportado por:
                        h1.font-size-regular {{data.reportadopor}}
    template(v-else)
      spinner
</template>

<script>
import Spinner from '@/components/globals/Spinner';
import {getObservations} from '../functions/fetchFunctions';
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
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
      const myToken = localStorage.getItem(token);
      const idUser = jwt(myToken).idUser;
      let res = await getObservations(idUser);
      this.report = res;
      this.report.map((el)=> {
        el.reportadopor = el.reportadopor.replace('<b>', '');
        el.reportadopor = el.reportadopor.replace('</b>', '');
      });

    }
  }
}
</script>
