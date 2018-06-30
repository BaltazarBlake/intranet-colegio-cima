<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Bimestres:
    template(v-if='report')
      .container.target
        .row
          template(v-if='report[0].deudas >= 2')
            .col-xs-12
              .card
                .row
                  .col-xs-12
                    h1.font-size-xxx-large.text--center Tiene deudas pendientes.
          template(v-else)
            .col-xs-12
              tabs.row
                template(v-for='(data,index) in report[0].examenes')
                  tab(:name='rename(data.bimestre)' :selected='isTrue(index)')
                    .col-xs-12.m-t
                      .row
                        template(v-for='courses in data.cursos')
                          .col-xs-12.col-s-6.col-m-4.col-l-3.d-f
                            course(:data='courses')

    template(v-else)
      .m-t-s
        spinner

    //- MODAL
    modal(:active.sync="showModal")
      template(v-if='detailExam')  
        template(slot='title')
          .row.cross-center
            .col-xs-12.col-s
              strong.font-size-x-large {{detailExam.course}}
            .col-xs
              strong(:class="detailExam.mean >= detailExam.minimumNote? 'green':'red'").sticker.m-b-0 PROMEDIO: {{detailExam.mean}}
        template(slot='body')
          .row
            .col-xs-12
              tabs(:fixed="true")
                template(v-for='(data,index) in detailExam.groups')
                  tab(:name='data.grupo' :selected='isTrue(index)')
                    template(v-if='data.isCalc')
                      .col-xs-12.m-t
                        .table.shadow-1 
                          .table-header
                            .table-row
                              .table-row-item Descripción
                              .table-row-item Porcentaje
                              .table-row-item Nota
                              .table-row-item Puntos
                          .table-body
                            template(v-for="nota in data.notas")
                              .table-row
                                .table-row-item.font-size-small(data-header='Descripción') {{nota.grupo}}
                                .table-row-item.font-size-small(data-header='Porcentaje') {{nota.peso}}
                                .table-row-item.font-size-small(data-header='Nota') {{nota.nota}}
                                .table-row-item.font-size-small(data-header='Puntos') {{nota.puntos}}
                          .table-header
                            .table-row
                              .table-row-item.center.u-Flex-grow3 PROMEDIO ACUMULADO
                              .table-row-item {{data.total}}
                    template(v-else)
                      .col-xs-12.m-t
                        .row
                          .col-xs-12.m-b
                            .card--ligth
                              .row.cross-center
                                .col-xs-12.col-s
                                  strong.font-size-large {{data.grupo}}
                                .col-xs.col-s
                                  strong.tag.font-size-regular PESO: {{data.peso}}%
                                .col-xs-12.col-s.m-t.m-b
                                  strong(:class="data.promedio >= 11? 'green':'red'").sticker.font-size-regular PROMEDIO: {{data.promedio}}
                          .col-xs-12
                            h1.font-size-regular EVALUACIONES
                          template(v-for='exam in data.examenes')
                            .col-xs-12.col-s-6.col-m-4.d-f
                              .card
                                .row
                                  .col-xs-12
                                    small Evaluación:
                                    h1.font-size-regular {{exam.evaluacion}}
                                  .col-xs-12
                                    small Fecha:
                                    h1.font-size-regular(v-text="format(exam.fecha)")
                                  .col-xs-12
                                    small Instrumento:
                                    h1.font-size-regular {{exam.instrumento}}
                                .card__footer
                                  .row
                                    .col-xs-12
                                      strong.sticker(:class="exam.nota >= 11? 'green':'red'") Nota: {{exam.nota}}

      template(v-else)
        .m-t-s
          spinner

</template>

<script>
import { EventBus } from "../event-bus.js";
import { getCourses } from "../functions/fetchFunctions";
import { formatDate } from "../functions/formatDate";
import Spinner from "./global/Spinner";
import Tabs from "./global/Tabs";
import Tab from "./global/Tab";
import Modal from "./global/Modal";
import Course from "./Course";
export default {
  components: {
    Spinner,
    Course,
    Modal,
    Tabs,
    Tab
  },
  data() {
    return {
      report: null,
      detailExam: null,
      showModal: false,
    };
  },
  created() {
    EventBus.$on("viewDetailExam", data => {
      this.detailExam = data;
      let grupo = {
        grupo:'CÁLCULO DEL PROMEDIO',
        isCalc: true,
        notas:[],
        total:0
      }

      let i = 0;
      let total = 0;
      this.detailExam.groups.map(el=>{
        if(el.isCalc){
          i = 1;
        }else{
          let puntos = (parseFloat(el.peso)/100.0)*parseFloat(el.promedio);
          puntos = Math.round(puntos*100)/100;
          grupo.notas.push({
            grupo:el.grupo,
            peso:el.peso + '%',
            nota:el.promedio,
            puntos
          })
          total +=(parseFloat(el.peso)/100.0)*parseFloat(el.promedio);
        }
      })
      total = Math.round(total*100)/100;
      grupo.total = total;
      console.log(grupo);
      if(i!=1)
        this.detailExam.groups.push(grupo);
      this.showModal = true;
    });
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res;
      if (!localStorage.getItem("cima-estudiante-cursos")) {
        let data = JSON.parse(localStorage.getItem("cima-estudiante"));
        res = await getCourses(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem("cima-estudiante-cursos", JSON.stringify(res));
      } else {
        res = JSON.parse(localStorage.getItem("cima-estudiante-cursos"));
      }
      this.report = res;
    },
    isTrue(el) {
      if (el == 0) {
        return "true";
      }
    },
    rename(el) {
      return `${el}° BIMESTRE`;
    },
    format(el) {
      let dates = el.split("-");
      let date = formatDate(dates[0], dates[1], dates[2]);
      return date;
    }
  }
};
</script>
