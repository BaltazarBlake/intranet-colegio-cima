<template lang="pug">
  .spinner
    .loader(:class='size')
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/>
      </svg>
</template>

<script>
export default {
  props: ['size'],
}
</script>
