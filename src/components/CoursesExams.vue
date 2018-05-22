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
                        .col-xs-12.col-s-6.col-m-4.d-f
                          course(:data='courses')

    template(v-else)
      spinner
</template>

<script>
import {getCourses} from '../functions/fetchFunctions';
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import Spinner from './global/Spinner';
import Tabs from './global/Tabs';
import Tab from './global/Tab';
import Course from './Course';
export default {
  components: {
    Spinner,
    Course,
    Tabs,
    Tab
  },
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
    },
    isTrue(el) {
      if (el == 0) {
        return 'true';
      }
    },
    rename(el) {
      return `${el}° Bimestre`;
    }
  },
}
</script>
