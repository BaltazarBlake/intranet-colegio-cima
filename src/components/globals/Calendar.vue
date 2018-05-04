<template lang="pug">
  article.calendar
    header.calendar__header
      h1.font-size-large Mes
      .calendar__header-days
        .calendar__header-day
          h2.font-size-small LUN.
        .calendar__header-day
          h2.font-size-small MAR.
        .calendar__header-day
          h2.font-size-small MIÉ.
        .calendar__header-day
          h2.font-size-small JUE.
        .calendar__header-day
          h2.font-size-small VIE.
        .calendar__header-day
          h2.font-size-small SÁB.
        .calendar__header-day
          h2.font-size-small DOM.
      .calendar__body        
        - for (var x = 0; x < 30; x++)
          .calendar__day
            small.calendar__day-number 1
            small.font-size-small -
</template>

<script>
export default {
  name: 'Calendar',
}
</script>
