<template lang="pug">
  div
    .band 
      .container
        h1.font-size-x-large En esta sección encontraras tu horario
    template(v-if="report")
        .container.target
          .row.main-center
            template(v-if="report == 1")
              .col-xs-12.col-xm-6.m-a
                  article.message-not-available.row.main-center.cross-center
                    h1.title2 Horario aún no disponible.
            template(v-else)
              div
                .horary
                  .horary__header
                    .horary__cell(:style="'width:'+width_dias+'%'")
                      strong.horary__cell-title Hora
                    .horary__cell(:style="'width:'+width_dias+'%'", v-for='dia in report.array_dias')
                      strong.horary__cell-title {{dia.nombre_dia}}
                  .horary__body
                    div.column-w
                      .horary__hours(:style="'height:'+heigth_horas+'%'", v-for='(hora, i) in report.horas')
                        span {{hora}}
                    .horary__column(v-for='dia in report.array_dias')
                      article.day
                        .day__title(:id="'dia-hr'+dia.numero_dia")
                          h1.title2 {{dia.nombre_dia}}
                        div.horary__column--desktop(v-html='drawCurse(dia.array_horas)')
    template(v-else)
      spinner
</template>

<script>
import Spinner from './global/Spinner';
import {getSchedule} from '../functions/fetchFunctions';

export default {
  components:{Spinner},
  data(){
    return{
      report:null,
      heigth_horas: 0,
      width_dias: 0,
      color_cursos: null,
      errors: null
    }
  },
  async mounted(){
    await this.getData();
  },
  methods:{
    async getData(){
      let res;
      if(!localStorage.getItem('cima-estudiante-horario')){
        let data = JSON.parse(localStorage.getItem('cima-estudiante'));
        res = await getSchedule(data.idalumnocolegio);
        localStorage.setItem('cima-estudiante-horario',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-horario'));
      }
      this.report = res.horary;
      this.heigth_horas = 100 / this.report.horas.length;
      this.width_dias = 100 / this.report.array_dias.length;
    },
    drawCurse(array_horas) {
      let tmp_curso = "x";
      let hora_inicio;
      let hora_fin;
      let profe = "x";
      let id_profe;
      // let aula = "x";
      let tmp_id = "id";
      let size = 0;
      let render_curso = "";
      for (let h = 0; h < this.report.horas.length; h++) {
        if (h == array_horas.length) {
          break;
        }
        let curso = array_horas[h].curso;

        if (tmp_curso != curso) {
          if (tmp_curso != "x") {
            // let arr = this.color_cursos[tmp_id];
            render_curso += `
            <div style='height:${this.heigth_horas * size}%;' class='course--desktop'>
              <div class='texto-curso' style=''>
                <span class='horary__data--desktop font-size-regular'>${tmp_curso}</span>
                <span class='horary__data--desktop font-size-small'>${profe}</span>
                <div class='horary--movile'>
                  <div class='col-xs-12'>
                    <div class='course-horary row'>
                      <div class="col-xs-12">
                        <p class="title2">${ tmp_curso == " " ? '' : tmp_curso}</p>
                      </div>
                      <div class='col-xs-12 col-xm-6'>
                        <strong class='normal'>Hora Inicio:</strong>
                        <strong class='normal'>${hora_inicio}</strong>
                      </div>
                      <div class='col-xs-12 col-xm-6'>
                        <strong class='normal'>Hora Fin:</strong>
                        <strong class='normal'>${hora_fin}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          }
          //comienza nuevo curso
          tmp_curso = curso;
          // aula = array_horas[h].numero_aula;
          hora_inicio = array_horas[h].hora_inicio;
          hora_fin = array_horas[h].hora_fin;
          profe = array_horas[h].profesor;
          id_profe = array_horas[h].idprofesor;

          tmp_id = array_horas[h].id_curso;
          size = 1;
        } else {
          hora_fin = array_horas[h].hora_fin;
          //mismo curso
          size++;
        }
      }
      render_curso += `
        <div style='height:${this.heigth_horas * size}%;' class='course--desktop'>
          <div class='texto-curso' style=''>
            <span class='horary__data--desktop font-size-regular'>${tmp_curso}</span>
            <span class='horary__data--desktop font-size-small'>${profe}</span>
            <div class='horary--movile'>
              <div class='col-xs-12'>
                <div class='course-horary row'>
                  <div class="col-xs-12">
                    <p class="title2">${ tmp_curso == " " ? '' : tmp_curso}</p>
                  </div>
                  <div class='col-xs-12 col-xm-6'>
                    <strong class='normal'>Hora Inicio:</strong>
                    <strong class='normal'>${hora_inicio}</strong>
                  </div>
                  <div class='col-xs-12 col-xm-6'>
                    <strong class='normal'>Hora Fin:</strong>
                    <strong class='normal'>${hora_fin}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      return render_curso;
    }
  }  
}
</script>