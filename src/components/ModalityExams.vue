<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Tus examenes
    template(v-if="report==1")
      .container.target
        .row
          .card
            p Este alumno no tiene simulacros
    template(v-else-if="report")
      .container.target
        .row
          .col-xs-12
            tabs.row
              template(v-for='(modality,index) in report')
                tab(:name='modality.modalidad' :selected='isTrue(index)')
                  .col-xs-12.m-t
                    exams(:data='modality.examenes' :id='index' :idMod='modality.idmodalidad')
    template(v-else)
      spinner
</template>

<script>
import { EventBus } from '../event-bus.js';
import {getExams} from '../functions/fetchFunctions';
import Spinner from './global/Spinner';
import Tabs from './global/Tabs';
import Tab from './global/Tab';
import Modal from './global/Modal';
import Exams from './Exams';
import Exam from './Exam';
export default {
  components:{
    Spinner,
    Exams,
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
      let data = JSON.parse(localStorage.getItem('cima-estudiante'));
      let res = await getExams(data.idalumnocolegio);
      if(res!=null) res = this.formatData(res);
      this.report = res!=null? res:1;
      localStorage.setItem('cima-reporte-simulacros', JSON.stringify(this.report));
    },
    isTrue(el) {
      if (el == 0) {
        return 'true';
      }
    },
    change() {
      this.$router.push('/Dashboard/Exams');
    },
    formatData(res){
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
      return res;
    }
  }
}
</script>

