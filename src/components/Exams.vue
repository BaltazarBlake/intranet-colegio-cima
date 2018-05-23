<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Tus examenes
    template(v-if="report")
      pre {{report}}
    template(v-else)
      spinner
</template>

<script>
import {getExams} from '../functions/fetchFunctions';
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import Spinner from './global/Spinner';
export default {
  components:{Spinner},
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
    }
  }
}
</script>

