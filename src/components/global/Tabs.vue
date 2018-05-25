<template lang="pug">
  div
    .col-xs-12
      .tabs
        ul.tabs__list
          button(v-for='tab in tabs' @click='selectTab(tab)' :class="{ 'is-active': tab.isActive }").tab.btn {{tab.name}}
      
    .tabs__detail
      slot
</template>

<script>
export default {
  data() {
    return {
      tabs:[],
    }
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectTab) {
      this.tabs.forEach(el => {
        el.isActive = (el.name == selectTab.name);
      });
    }
  }
}
</script>
