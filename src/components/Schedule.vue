<template lang="pug">
  div
    .band 
      .container
        .row.cross-center
          .col-xs-12.col-s
            h1.font-size-x-large En esta sección encontrarás tu horario
          .col-xs.u-mla
            .row.m-b
              .col-xs(v-if="report!=1")
                button(@click="print('print')").btn--warning.is-active
                  span.icon-printer
                  span Imprimir
    template(v-if="report != null && !report.err")
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
                    .horary__cell(:style="'width:'+width_dias+'%'", v-for='dia in report')
                      strong.horary__cell-title {{dia.dia}}
                  .horary__body
                    div.column-w
                      .horary__hours(:style="'height:'+heigth_horas+'%'", v-for='(hora, i) in report.horas')
                        span {{hora.inicio}}
                    .horary__column(v-for='dia in report')
                      article.day
                        .day__title(:id="'dia-hr'+dia.numero_dia")
                          h1.title2 {{dia.dia}}
                        div.horary__column--desktop
                          .course--desktop(:style="'height:'+heigth_horas * curso.cantidad_horas+'%'" v-for='curso in dia.cursos')
                            .texto-curso(style='')
                              span.horary__data--desktop.font-size-regular {{curso.asignatura}}
                              span.horary__data--desktop.font-size-small {{curso.docente}}
                              .horary--movile
                                .col-xs-12
                                  .course-horary.row
                                    .col-xs-12
                                      p.title2 {{curso.asignatura}}
                                    .col-xs-12.col-xm-6
                                      strong.normal Hora Inicio: 
                                      strong.normal {{curso.horas[0].inicio}}
                                    .col-xs-12.col-xm-6
                                      strong.normal Hora Fin: 
                                      strong.normal {{curso.horas[curso.horas.length-1].fin}}
    template(v-else-if="report && report.err")
      .container.target
        .col-xs-12
          .card
            .row
              .col-xs-12
                h1.font-size-xxx-large.text--center El horario no se encuentra.
    template(v-else)
      .m-t-s
        spinner
</template>

<script>
import Spinner from "./global/Spinner";
import { getSchedule } from "../functions/fetchFunctions";

export default {
  components: { Spinner },
  data() {
    return {
      report: null,
      heigth_horas: 0,
      width_dias: 0,
      errors: null,
      alumno: null,
      id: [],
      colors: [
        "EF9A9A",
        "D7CCC8",
        "B2EBF2",
        "FFF9C4",
        "E0E0E0",
        "78909C",
        "A5D6A7",
        "C5CAE9",
        "FFCC80",
        "E1BEE7",
        "F0F4C3",
        "C8E6C9",
        "FFCCBC",
        "F48FB1",
        "F8BBD0",
        "FDD835",
        "FFCDD2",
        "E3F2FD",
        "FFE0B2",
        "FFEBEE"
      ]
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res;
      this.alumno = JSON.parse(localStorage.getItem("cima-estudiante"));
      if (!localStorage.getItem("cima-estudiante-horario")) {
        res = await getSchedule(this.alumno.idalumnocolegio);
        res = res.data ? res.data : res;
        if (res.data)
          localStorage.setItem("cima-estudiante-horario", JSON.stringify(res));
      } else {
        res = JSON.parse(localStorage.getItem("cima-estudiante-horario"));
      }
      this.report = res;
      let horas = [];
      if (!res.err) {
        this.report[0].cursos.map(curso => {
          curso.horas.map(hora => {
            horas.push(hora);
          });
        });
        this.report.horas = horas;
        this.heigth_horas = 100 / this.report.horas.length;
        this.width_dias = 100 / this.report.length;
      }
    },
    print(idReport) {
      let report = document.getElementById(idReport);
      let style = document.styleSheets;

      let rules = [];
      let styleString = "";

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
        "<style>" +
        styleString +
        "</style>" +
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
};
</script>