<template lang="pug">
  .tabs__wrapper(:class="fixed? 'fixed':''")
    .col-xs-12
      .tabs
        ul.tabs__list
          button(v-for='tab in tabs' @click='selectTab(tab)' :class="{ 'is-active': tab.isActive }").tab.btn {{tab.name}}
      
    .tab__detail
      slot
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
  },
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
