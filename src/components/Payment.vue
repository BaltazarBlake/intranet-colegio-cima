<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Historial de pagos
    template(v-if='report')
      .container.target
        .row         
          .col-xs-12
            .table
              .table-row.table-header
                .table-row-item Descripción
                .table-row-item Fecha Vencimiento
                .table-row-item Monto
                .table-row-item Monto Pagado
                .table-row-item Estado
              template(v-for='data in report')
                .table-row
                  .table-row-item(data-header='Descripción') {{data.descripcion}}
                  .table-row-item(data-header='Fecha Vencimiento') {{data.fechavencimiento}}
                  .table-row-item(data-header='Monto') {{data.monto}}
                  .table-row-item(data-header='Monto Pagado') {{data.montopagado}}
                  .table-row-item(data-header='Estado') {{data.estado}}
    template(v-else)
      spinner
</template>

<script>
import Spinner from './global/Spinner';
import {getPayment} from '../functions/fetchFunctions';
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      report:null,
    }
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res;
      if(!localStorage.getItem('cima-estudiante-payment')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));      
        res = await getPayment(data.idalumnocolegio);
        localStorage.setItem('cima-estudiante-payment',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-payment'));
      }
      this.report = res;
    },
  }
}
</script>
