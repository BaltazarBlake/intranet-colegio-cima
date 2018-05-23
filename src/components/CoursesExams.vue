<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Bimestres:
    template(v-if='report')
      .container.target
        .row
          .col-xs-12
            tabs.row
              template(v-for='(data,index) in report')
                tab(:name='rename(data.bimestre)' :selected='isTrue(index)')
                  .col-xs-12.m-t
                    .row
                      template(v-for='courses in data.cursos')
                        .col-xs-12.col-s-6.col-m-4.col-l-3.d-f
                          course(:data='courses')

    template(v-else)
      spinner
    modal
      template(v-if='detailExam')  
        template(slot='title') {{detailExam.course}} {{detailExam.mean}}
        template(slot='body')
          .row
            .col-xs-12
              tabs
                template(v-for='(data,index) in detailExam.groups')
                  tab(:name='data.grupo' :selected='isTrue(index)')
                    .col-xs-12.m-t
                      .row
                        .col-xs-12.m-b
                          .row.cross-center
                            .col-xs-12.col-s
                              strong.font-size-large {{data.grupo}}
                            .col-xs.col-s
                              strong.tag.font-size-regular PROM: {{data.promedio}}
                            .col-xs.col-s
                              strong.tag.font-size-regular PESO: {{data.peso}}
                        template(v-for='exam in data.examenes')
                          .col-xs-12.col-s-6.col-m-4.d-f
                            .card
                              .row
                                .col-xs-12
                                  small Evaluación:
                                  h1.font-size-regular {{exam.evaluacion}}
                                .col-xs-12
                                  small Fecha:
                                  h1.font-size-regular {{exam.fecha}}
                                .col-xs-12
                                  small Instrumento:
                                  h1.font-size-regular {{exam.instrumento}}
                                .col-xs-12
                                  strong.course__tag(:class="exam.nota >= 11? 'green':'red'") Nota: {{exam.nota}}

      template(v-else)
        spinner

</template>

<script>
import { EventBus } from '../event-bus.js';
import {getCourses} from '../functions/fetchFunctions';
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import Spinner from './global/Spinner';
import Tabs from './global/Tabs';
import Tab from './global/Tab';
import Modal from './global/Modal';
import Course from './Course';
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
    }
  },
  created() {
    EventBus.$on('viewDetailExam', data => {
      this.detailExam = data;
    });
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      const mytoken = localStorage.getItem(token);
      const idUser = jwt(mytoken).idUser;
      let res = await getCourses(idUser);
      this.report = res;
    },
    isTrue(el) {
      if (el == 0) {
        return 'true';
      }
    },
    rename(el) {
      return `${el}° BIMESTRE`;
    }
  },
}
</script>
