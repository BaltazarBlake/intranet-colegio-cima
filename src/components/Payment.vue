<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Historial de pagos
    template(v-if='report')
      .container.target
        .row         
          .col-xs-12
            tabs.row
              template(v-for="(data,index) in report")
                tab(:name="data.tipo", :selected="isTrue(index)")
                  .col-xs-12.m-t
                    .table.shadow-1 
                      .table-header
                        .table-row
                          .table-row-item Descripción
                          .table-row-item Fecha Vencimiento
                          .table-row-item Monto
                          .table-row-item Monto Pagado
                          .table-row-item.center Estado
                      .table-body
                        template(v-for="payment in data.pagos")
                          .table-row
                            .table-row-item.font-size-small(data-header='Descripción') {{payment.descripcion}}
                            .table-row-item.font-size-small(data-header='Fecha Vencimiento') {{format(payment.fechavencimiento)}}
                            .table-row-item.font-size-small(data-header='Monto') S/. {{payment.monto}}
                            .table-row-item.font-size-small(data-header='Monto Pagado') 
                              span(v-if="payment.montopagado") S/. {{payment.montopagado}}
                            .table-row-item.font-size-small.sticker(data-header='Estado', :class="colorState(payment.estado)") {{payment.estado}}
    template(v-else)
      .m-t-s
        spinner
</template>

<script>
import Spinner from './global/Spinner';
import Tabs from './global/Tabs';
import Tab from './global/Tab';
import {getPayment} from '../functions/fetchFunctions';
import { formatDate } from "../functions/formatDate";
export default {
  components: {
    Spinner,
    Tab,
    Tabs,
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
        res = res.data;
        localStorage.setItem('cima-estudiante-payment',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-payment'));
      }
      this.report = res;
    },
    colorState(el) {
      let classColor;
      if (el == 'CANCELADO') {
        classColor = 'green';
      } else if (el == 'DEUDA') {
        classColor = 'red';
      }
      return classColor;
    },
    format(el){
      let dates = el.split("-");
      let date = formatDate('', dates[1], dates[2]);
      return date;
    },
    isTrue(el) {
      if (el == 0) {
        return "true";
      }
    },
  }
}
</script>
