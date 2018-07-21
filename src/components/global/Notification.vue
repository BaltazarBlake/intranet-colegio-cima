<template lang="pug">
  div
    template(v-if="active")
      .notification
        slot(name='icon')
</template>

<script>
export default {
  name: 'Notification',
  props: ['active'],
}
</script>

