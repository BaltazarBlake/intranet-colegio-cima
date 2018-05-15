<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Directorio de alumnos
    template(v-if="report")
        .container.target
          .row
            template(v-for="data in report")
              .col-xs-12.col-s-6.col-m-4.d-f
                .profile.m-b
                  .profile__wrapper-image
                    img(:src="data.url_imagen", alt="").profile__user-image
                  .profile__description.row.main-center
                    .col-xs-12
                      h1.font-size-regular {{data.nombre}} {{data.apellido}}
                    .col-xs-12
                      small.font-size-small Cel. {{data.telefonoper}}
                    .col-xs-12
                      small.font-size-small Dir. {{data.direccion}}
    template(v-else)
      spinner  
</template>

<script>
import {getClassmates} from '../functions/fetchFunctions';
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import Spinner from './global/Spinner';
export default {
  components: {Spinner},
  data() {
    return {
      report: null,
    }
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      const mytoken = localStorage.getItem(token);
      const idUser = jwt(mytoken).idUser;
      let res = await getClassmates(idUser);
      this.report = res;
    }
  }
  
}
</script>