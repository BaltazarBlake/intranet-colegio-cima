<template lang="pug">
  div(v-if='isActive')
    slot
</template>

<script>
export default {
  props: {
    name: { required: true },
    selected: { default: false }
  },

  data() {
    return {
      isActive: false,
    }
  },

  mounted() {
    this.isActive = this.selected;
  },

  computed: {
    // href() {
    //   return '#' + this.name.toLowerCase().replace(/ /g , '-');
    // }
  }
}
</script>
