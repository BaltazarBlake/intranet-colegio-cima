<template lang="pug">
  main.main-content--login
    .container
      .row.main-center
        .col-xs-12
            img(src="../assets/logo_colegio.svg", alt="Colegio CIMA").logo
        //- .row.main-center
          //- template(v-if="error")
          //-   article.message-error
          //-     h1(v-text="error").message-error__title
        .login
          h1.login__title.text--center.font-size-xx-large Iniciar sesión
          .row.main-center
            .input-field.col-xs-12
              label.input-field__label Usuario
              input(type="text", v-model="user", placeholder="").input-field__input
            .input-field.col-xs-12
              label.input-field__label Contraseña
              input(type="password", v-model="password", placeholder="").input-field__input
            .col-xs
              button(v-on:click="enviarData", v-on:keyup.enter="enviarData").btn--primary Ingresar
</template>

<script>
import jwt from 'jwt-decode';
export default {
  name: "Login",

  data() {
    return {
      user: null,
      password: null
    };
  },

  methods: {
    enviarData() {
      fetch(
        'http://localhost/api-cima/login',
        {
        method: "post",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `user=${this.user}&password=${this.password}`,
      })
      .then(res => res.json())
      .then(answer => {
        this.user = "";
        this.password = "";
        // console.log(answer.success);
        if (answer.success) {
          const token = answer.token;
          let type = jwt(token).type;

          localStorage.setItem('186792bf11c51e92ed5eba02424312ac',token);

          if (type == 'student') {
            this.$router.replace('/Student');
          } else {
            this.$router.replace('/FamilyGuy');
          }
        } else {
          console.log(answer.message);
        }
        // this.report = answer.data;

        // //answer.data obtiene la answer y verifica si hay errores.

        // //Recibe el error de tipo 0 (Campos obligatorios)
        // if (answer.data == 0) {
        //   this.error = "Campos obligatorios";

        //   //Recibe el error de tipo 1 (Usuario incorrecto)
        // } else if (answer.data == 1) {
        //   this.error = "Usuario incorrecto";

        //   //Recibe el error de tipo 2 (Contraseña incorrecta)
        // } else if (answer.data == 2) {
        //   this.error = "Contraseña incorrecta";

        //   //Si no recibe errores entonces recibe los datos del usuario
        // } else {
        //   localStorage.setItem("login", JSON.stringify(this.report));
        //   location.reload();
        // }
      })
      .catch(e => {
        console.log('ERROR', e.message);
      });
    }
  }
};
</script>


