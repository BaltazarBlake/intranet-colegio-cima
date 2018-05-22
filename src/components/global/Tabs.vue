<template lang="pug">
  div
    .tabs
      ul.tabs__list
        li(v-for='tab in tabs').tab(:class="{ 'is-active': tab.isActive }")
          a(@click='selectTab(tab)') {{tab.name}}
    
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
    console.log(this.tabs);
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
