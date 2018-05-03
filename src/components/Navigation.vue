<template lang="pug">
  section#navList.navigation
    .navigation__user
      .img--perfil
        img(:src="imgPerson", alt="").navigation__img.shadow-1
      strong.navigation__title Ricardo
      a(href="?view=logout" @click="deleteData").btn--danger.is-active.navigation__btn Cerrar Sesión
    ul.row
      li.navigation__item.col-xs-12
        a(@click="student").navigation__link
          span.icon-home
          span Inicio
      li.navigation__item.col-xs-12
        a(@click="score").navigation__link
          span.icon-file
          span Exámenes
      li.navigation__item.col-xs-12
        a(@click="assistance").navigation__link
          span.icon-calendar-1
          span Asistencia
      li.navigation__item.col-xs-12
        a(@click="horary").navigation__link
          span.icon-horary
          span Horario
      li.navigation__item.col-xs-12
        a(@click="event").navigation__link
          span.icon-notes
          span Observaciones
      li.navigation__item.col-xs-12
        a(@click="teacher").navigation__link
          span.icon-team
          span Profesores
      li.navigation__item.col-xs-12
        a(@click="regulation").navigation__link
          span.icon-book
          span Reglamento Int.
</template>

<script>
export default {
  
}
</script>
