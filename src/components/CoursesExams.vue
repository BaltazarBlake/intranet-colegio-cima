<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Bimestres:
    template(v-if='report')
      .container.target
        .row
          template(v-for='data in report')
            section.col-xs
              button.btn--default.is-active {{data.bimestre}}° Bimestre
            .col-xs-12.m-t
              .row
                template(v-for='courses in data.cursos')
                  .col-xs-12.col-s-6.col-m-4.d-f
                    article.card
                      .row
                        .col-xs-12.course__header
                          h1.font-size-large.text--center {{courses.curso}}
                        .col-xs-12
                          strong.course__tag Promedio: {{courses.promedio}}
                        .col-xs-12
                          small Docente:
                          p {{courses.docente}}
                        .col-xs-12
                          small Teléfono:
                          p {{courses.telefono}}
                        .col-xs-12
                          .row.main-center
                            .col-xs
                              button.btn--primary Ver más


    template(v-else)
      spinner
</template>

<script>
import {getCourses} from '../functions/fetchFunctions';
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import Spinner from './global/Spinner';
export default {
  components: {Spinner},
  data() {
    return {
      report: null,
    }
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
      console.log(this.report);
    }
  },
}
</script>
