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
                    h1.font-size-large Tiene deudas pendientes.
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
      spinner

    //- MODAL
    modal
      template(v-if='detailExam')  
        template(slot='title')
          .row.cross-center
            .col-xs
              strong.font-size-x-large {{detailExam.course}}
            .col-xs
              strong(:class="detailExam.mean >= 11? 'green':'red'").course__tag.m-b-0 PROMEDIO: {{detailExam.mean}}
        template(slot='body')
          .row
            .col-xs-12
              tabs
                template(v-for='(data,index) in detailExam.groups')
                  tab(:name='data.grupo' :selected='isTrue(index)')
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
                                strong(:class="data.promedio >= 11? 'green':'red'").course__tag.font-size-regular PROMEDIO: {{data.promedio}}
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
                                .col-xs-12
                                  strong.course__tag(:class="exam.nota >= 11? 'green':'red'") Nota: {{exam.nota}}

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
      detailExam: null
    };
  },
  created() {
    EventBus.$on("viewDetailExam", data => {
      this.detailExam = data;
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
