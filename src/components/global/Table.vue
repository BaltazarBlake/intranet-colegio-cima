<template lang="pug">
  .table.shadow-1(:class="")
    .table-header
      .table-row
        .table-row-item N° de Preg.
        .table-row-item Rpta. Exam.
        .table-row-item Rpta. Alum.
    .table-body
      - for (var x = 0; x < 20; x++)
        .table-row
          .table-row-item(data-header='N° de Preg.') 1
          .table-row-item(data-header='Rpta. Exam.') H
          .table-row-item(data-header='Rpta. Alum.') W
</template>

<script>
export default {
  props: [],
  data() {
    return {
      label: null,
      
    }
  }
}
</script>