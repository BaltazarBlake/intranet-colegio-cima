<template lang="pug">
  div
    .band 
      .container
        .row.cross-center
          .col-xs
            h1.font-size-x-large En esta sección encontrarás tu horario
          .col-xs.u-mla
            .row.m-b
              .col-xs(v-if="report!=1")
                button(@click="print('print')").btn--warning.is-active
                  span.icon-printer
                  span Imprimir
    template(v-if="report")
        .container.target
          .row.main-center
            template(v-if="report == 1")
              .col-xs-12.col-xm-6.m-a
                  article.message-not-available.row.main-center.cross-center
                    h1.title2 Horario aún no disponible.
            template(v-else)
              div#print
                p.print__title {{alumno.nombre}} {{alumno.apellido}} {{alumno.grado}} {{alumno.seccion}}
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
      .m-t-s
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
      errors: null,
      alumno:null,
      id:[],
      colors: [
        'EF5350',
        'AB47BC',
        '0097A7',
        'FF9100',
        'E0E0E0',
        '78909C',
        'A5D6A7',
        '00d2d3',
        'FFCC80',
        '5f27cd',
        '9E9D24',
        '00E676',
        'EEFF41',
        'F48FB1',
        '00E676',
        'FDD835',
        '474787',
        '33d9b2',
        'ff793f',
        'EC407A',
        ],
    }
  },
  async mounted(){
    await this.getData();
  },
  methods:{
    async getData(){
      let res;
      this.alumno = JSON.parse(localStorage.getItem('cima-estudiante'));
      if(!localStorage.getItem('cima-estudiante-horario')){
        res = await getSchedule(this.alumno.idalumnocolegio);
        res = res.data;
        localStorage.setItem('cima-estudiante-horario',JSON.stringify(res));
      }else{
        res = JSON.parse(localStorage.getItem('cima-estudiante-horario'));
      }
      this.report = res;
      this.heigth_horas = 100 / this.report.horas.length;
      this.width_dias = 100 / this.report.array_dias.length;
    },
    drawCurse(array_horas) {
      console.log('-----')
      let tmp_curso = "x";
      let hora_inicio;
      let hora_fin;
      let profe = "x";
      let id_profe;
      let tmp_id = "id";
      let size = 0;
      let render_curso = "";
      let color;
      let hoursDay = this.report.horas;
      let courseDay = [];
      let rgba; 
      

      for (let i = 0; i < array_horas.length; i++) {
        let curso = array_horas[i].curso;
        let id_curso = array_horas[i].id_curso;

        

        /*Color a RGBA*/
        let r,g,b,rgba;
        /*Color a RGBA*/


        if (tmp_curso != curso) {
          if (tmp_curso != "x") {            
            render_curso += `
            <div style='height:${this.heigth_horas * size / 2}%;background-color:#${color}' class='course--desktop'>
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
          hora_inicio = array_horas[i].hora_inicio;
          hora_fin = array_horas[i].hora_fin;
          profe = array_horas[i].profesor;
          id_profe = array_horas[i].idprofesor;

          tmp_id = array_horas[i].id_curso;
          // console.log(tmp_curso,' - ',tmp_id);
          let i_id = this.id.indexOf(id_curso);
          if(i_id===-1){
            this.id.push(id_curso);
          }
          color = this.colors[this.id.indexOf(id_curso)];


          size = 1;
        } else {
          hora_fin = array_horas[i].hora_fin;
          // mismo curso
          size++;
        }
      }
      render_curso += `
        <div style='height:${this.heigth_horas * size / 2}%;background-color:#${color.toString(16)}' class='course--desktop'>
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
    },
     print(idReport) {
      let report = document.getElementById(idReport);
      let style = document.styleSheets;

      let rules = [];
      let styleString = '';

      for (let i = 0; i < style.length; i++) {
        rules.push(style[i].cssRules);
        for (let j = 0; j < rules[i].length; j++) {
          styleString += rules[i][j].cssText;
        }
      }

      let print =
        "<!DOCTYPE html>" +
        "<html lang='en'>" +
        "<head>" +
        "<style>"+ styleString +"</style>" +
        "<meta charset='UTF-8'>" +
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
        "<title>Reporte</title>" +
        "<style> button {display: none}</style>" +
        "</head>" +
        "<body onload='window.print();window.close()' class='container'>";

      print += report.outerHTML + "</body>" + "</html>";

      let printWindow = window.open("", "_blank");
      printWindow.document.write(print);
      printWindow.document.close();
    }
  }  
}
</script>