<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Tus examenes
    template(v-if="report")
      .container.target
        .row
          template(v-for='(modality,index) in report')
            .col-xs-12.col-s-6.col-m-4.col-l-3.d-f
              article.card
                .row
                  .col-xs-12
                    h1.font-size-large {{modality.modalidad}}
                  .col-xs-12
                    .row.main-center
                      .col-xs
                        //- router-link(active-class="is-active" to="/ModalityExams/Exams" tag="button" exact).btn--primary Ver más
                        button(@click='change()').btn--primary Ver más
    template(v-else)
      spinner
</template>

<script>
import { EventBus } from '../event-bus.js';
import {getExams} from '../functions/fetchFunctions';
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import Spinner from './global/Spinner';
import Tabs from './global/Tabs';
import Tab from './global/Tab';
import Modal from './global/Modal';
import Exam from './Exam';
export default {
  components:{
    Spinner,
    Exam,
    Modal,
    Tabs,
    Tab
  },
  data(){
    return{
      report:null
    }
  },
  async mounted(){
    await this.getData();
  },
  methods:{
    async getData(){
      const mytoken = localStorage.getItem(token);
      const idUser = jwt(mytoken).idUser;
      let res = await getExams(idUser);
      res.map(item=>{
        item.examenes.map(exam=>{
          let mispreguntas = [];          
          let asignaturas = exam.asignaturas;
          exam.asignaturas = [];
          asignaturas.map(asignatura=>{
            asignatura.id = asignatura.preguntas[0].numero_pregunta;
          })
          asignaturas.sort((a,b)=>{
            return a.id - b.id;
          })
          asignaturas.map(asignatura=>{
            delete asignatura.id;
            mispreguntas = mispreguntas.concat(asignatura.preguntas);
          })
          exam.asignaturas = asignaturas;
          exam.preguntas = mispreguntas;
        })
      })
      this.report = res;
    },
    change() {
      this.$router.push('/Dashboard/Exams');
    },
  }
}
</script>

