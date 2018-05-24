<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Simulacros
    .container.target
      .row
        -for(var x = 0; x < 6; x++)
          .col-xs-12.col-xm-6.col-m-4.col-l-3
            article.card
              .row.main-center
                .col-xs-12
                  h1.font-size-large EXAMEN DE CONTROL DE LÓGICA 5TO B-D
                .col-xs-12.m-b
                  strong.font-size-regular 19/05/2018
                .col-xs-6
                  small Mérito general:
                  h2 58
                .col-xs-6
                  small Mérito grado:
                  h2 10
                .col-xs-6.m-b
                  strong.course__tag.font-size-regular PUNTAJE 26.2976
                .col-xs-6.m-b
                  strong.course__tag.font-size-regular NOTA BASE 20: 12
                .col-xs-12.m-b
                  .row
                    .col-xs-4
                      .tag--label.blue
                        small Buenas:
                        h2 10
                    .col-xs-4
                      .tag--label.red
                        small Malas:
                        h2 1
                    .col-xs-4
                      .tag--label.blue-ligth
                        small Blanco:
                        h2 9
                .col-xs-12
                  .row.main-center
                    .col-xs
                      button.btn--default.is-active Ver más
</template>

<script>
export default {
  
}
</script>
