<template lang='pug'>
  .hellow
    .row.bg-c
      .col-xs-6
        h1 {{msg}}
          span.icon-home
      .col-xs-6
        p Un test
          span.icon-calendar-1
    .row.bg-c
      .col-xs-6
        h1 {{msg}}
          span.icon-home
      .col-xs-6
        p Un test
          span.icon-calendar-1
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-c {
  background-color: red;
}
h1, h2 {
  font-family: 'Roboto Mono';
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
