<template lang="pug">
  div
    .band
      .container
        .row.cross-center
          .col-xs
            h1.font-size-x-large Bimestres:
          .col-xs
            .row.m-b
              .col-xs
                button.btn--warning.is-active(@click='viewReport()')
                  span.icon-file-text
                  span Reporte
    template(v-if='report')
      .container.target
        .row
          template(v-if='report[0].deudas >= 2')
            .col-xs-12
              .card
                .row
                  .col-xs-12
                    h1.font-size-xxx-large.text--center Tiene deudas pendientes.
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
      .m-t-s
        spinner

    //- MODAL
    modal(:active.sync="showModal")
      template(v-if='detailExam')  
        template(slot='title')
          .row.cross-center
            .col-xs-12.col-s
              strong.font-size-x-large {{detailExam.course}}
            .col-xs
              strong(:class="detailExam.mean >= detailExam.minimumNote? 'green':'red'").sticker.m-b-0 PROMEDIO: {{detailExam.mean}}
        template(slot='body')
          .row
            .col-xs-12
              tabs(:fixed="true")
                template(v-for='(data,index) in detailExam.groups')
                  tab(:name='data.grupo' :selected='isTrue(index)')
                    template(v-if='data.isCalc')
                      .col-xs-12.m-t
                        .table.shadow-1 
                          .table-header
                            .table-row
                              .table-row-item.u-Flex-grow3 Descripción
                              .table-row-item.u-Flex-grow3 Porcentaje
                              .table-row-item.u-Flex-grow3 Nota
                              .table-row-item.u-Flex-grow3 Puntos
                          .table-body
                            template(v-for="peso in weightCourse")
                              .table-row
                                .table-row-item.u-Flex-grow3.font-size-small {{peso.grupo_evaluacion}}
                                .table-row-item.u-Flex-grow3.font-size-small {{peso.peso}}
                                .table-row-item.u-Flex-grow3.font-size-small(v-text="peso.nota != -1? peso.nota : '-'")
                                .table-row-item.u-Flex-grow3.font-size-small(v-text="peso.puntos != -1? peso.puntos : '-'")
                          .table-header
                            .table-row
                              .table-row-item.center.u-Flex-grow9 PROMEDIO ACUMULADO
                              .table-row-item.u-Flex-grow3 {{data.total}}
                    template(v-else)
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
                                  strong(:class="data.promedio >= 11? 'green':'red'").sticker.font-size-regular PROMEDIO: {{data.promedio}}
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
                                .card__footer
                                  .row
                                    .col-xs-12
                                      strong.sticker(:class="exam.nota >= 11? 'green':'red'") Nota: {{exam.nota}}

      template(v-else)
        .m-t-s
          spinner
    //- Reporte
    report
      template(slot='title') Reporte
      template(slot='body')
        .row#print
          .print__header.col-xs-12
            .row
              .col-xs-12
                .p-r
                  img(src='../assets/logo_colegio.svg').print__img
              .col-xs-12
                .row.main-center
                  .col-xs-12
                    template(v-if='dataStudent')
                      h1.font-size-x-large {{dataStudent.nombre}} {{dataStudent.apellido}}
                      h2.font-size-regular {{dataStudent.nivel}} - {{dataStudent.grado}} {{dataStudent.seccion}}
                    template(v-else)
                      spinner
          .col-xs-12
            .table.header-fixed
              .table-header
                .table-row
                  .table-row-item.u-Flex-grow5 ÁREA CURRICULAR
                  .table-row-item.sub-row.u-Flex-grow4.center BIMESTRE
                    .table-row
                      .table-row-item.center I
                      .table-row-item.center II
                      .table-row-item.center III
                      .table-row-item.center IV
                  .table-row-item.u-Flex-grow3.center PROM. ACUM.
              .table-body
                template(v-for="data in reportPrint")
                  .table-row
                    .table-row-item.u-gray(v-if="reportPrint") {{data.area}}
                  template(v-for="c in data.cursos")
                    .table-row
                      .table-row-item.u-Flex-grow5 {{c.curso}}
                      // .table-row-item.u-Flex-grow4
                      template(v-for="nota in c.notas")
                        .table-row-item.center(:class="nota.nota<data.minima? 'text-danger': ''") {{nota.nota}}
                      template(v-for="n in (4- c.notas.length)")
                        .table-row-item.center -
                      .table-row-item.u-Flex-grow3.center(:class="c.promedio<data.minima? 'text-danger':''") {{c.promedio}}
                  .table-row
                    .table-row-item.u-Flex-grow9.center PROMEDIO
                    .table-row-item.u-Flex-grow3.center(v-if="reportPrint" :class="data.promedio<data.minima? 'text-danger':''") {{data.promedio}}

</template>

<script>
import { EventBus } from "../event-bus.js";
import { getCourses } from "../functions/fetchFunctions";
import { formatDate } from "../functions/formatDate";
import Spinner from "./global/Spinner";
import Tabs from "./global/Tabs";
import Tab from "./global/Tab";
import Modal from "./global/Modal";
import Report from "./global/Report";
import Course from "./Course";
export default {
  components: {
    Spinner,
    Course,
    Modal,
    Report,
    Tabs,
    Tab
  },
  data() {
    return {
      report: null,
      detailExam: null,
      showModal: false,
      reportPrint: null,
      dataStudent: null,
      section: null,
      weightCourses: null,
      weightCourse: null,
    };
  },
  created() {
    EventBus.$on("viewDetailExam", data => {
      this.detailExam = data;
      let grupo = {
        grupo: "CÁLCULO DEL PROMEDIO",
        isCalc: true,
        notas: [],
        total: 0
      };

      
      
      let auxWeight = this.weightCourses;
      auxWeight.map(el => {
        if (el.idareacurricular == data.idCourse) {
          this.weightCourse = el.pesos;
        }
      });

      this.weightCourse.map(el => {
        el.nota = -1;
        el.puntos = -1;
      })

      let i = 0;
      let total = 0;

      this.detailExam.groups.map(el => {
        if (el.isCalc) {
          i = 1;
        } else {
          this.weightCourse.map(data => {
            if (data.grupo_evaluacion == el.grupo) {
              data.nota = el.promedio;
              data.puntos = Math.round((parseFloat(el.peso) / 100.0 * parseFloat(el.promedio))*100)/100;
            }
          });

          grupo.notas = this.weightCourse;
          total +=el.isnull? 0 :  parseFloat(el.peso) / 100.0 * parseFloat(el.promedio);
        }
      });
      total = Math.round(total * 100) / 100;
      grupo.total = total;
      if (i != 1) {
        this.detailExam.groups.push(grupo);
      }
      this.showModal = true;
    });
  },
  async mounted() {
    await this.getData();
    this.resetDetailExam;
  },
  methods: {
    async getData() {
      let res;
      if (!localStorage.getItem("cima-estudiante-cursos")) {
        let data = JSON.parse(localStorage.getItem("cima-estudiante"));
        res = await getCourses(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem("cima-estudiante-cursos", JSON.stringify(res));
      } else {
        res = JSON.parse(localStorage.getItem("cima-estudiante-cursos"));
      }
      this.report = res;
      this.printReport();
      this.weightCourses = this.report[0].pesos;
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
    },
    viewReport() {
      this.dataStudent = JSON.parse(localStorage.getItem("cima-estudiante"));
      // this.showModalJustify = false;
      EventBus.$emit("showReport");
    },
    printReport() {
      this.reportPrint = this.report[0].examenes;
      let areas = [];
      let cursos = [];
      let notas = [];
      this.reportPrint.map(el => {
        el.cursos.map(curso => {
          let area = curso.area;
          if (!areas.includes(area)) {
            areas.push(area);
          }
        });
      });
      areas.map(area => {
        let mc = [];
        this.reportPrint.map(el => {
          let bimestre = el.bimestre;
          el.cursos.map(curso => {
            if (area == curso.area && !mc.includes(curso.curso)) {
              mc.push(curso.curso);
            }
          });
        });
        cursos.push(mc);
      });
      cursos.map(curso => {
        curso.map(el => {
          let nt = [];
          let prom = 0;
          let cont = 0;
          this.reportPrint.map(ec => {
            let bimestre = ec.bimestre;
            ec.cursos.map(cur => {
              if (el == cur.curso) {
                prom += cur.promedio;
                cont++;
                nt.push({
                  nota:
                    Math.round(cur.promedio) < 10
                      ? `0${Math.round(cur.promedio)}`
                      : Math.round(cur.promedio),
                  bimestre,
                  minima: cur.notaminima
                });
              }
            });
          });
          let promedio = parseFloat(prom) / parseFloat(cont);
          promedio =
            Math.round(promedio) < 10
              ? `0${Math.round(promedio)}`
              : Math.round(promedio);
          notas.push({
            curso: el,
            notas: nt,
            promedio
          });
        });
      });
      cursos.map(curso => {
        let prom = 0;
        let cont = 0;
        let cu = [];
        let min = notas[0].notas[0].minima;
        notas.map(nota => {
          if (curso.includes(nota.curso)) {
            cu.push(nota);
          }
        });
        let index = cursos.indexOf(curso);
        let area = areas[index];
        cu.map(el => {
          prom += parseInt(el.promedio);
          cont++;
        });
        let p = parseFloat(prom) / parseFloat(cont);
        areas[index] = {
          area,
          cursos: cu,
          promedio: Math.round(p) < 10 ? `0${Math.round(p)}` : Math.round(p),
          minima: min
        };
      });
      this.reportPrint = areas;
    }
  },
};
</script>
