<template lang="pug">
  main.main-content--login
    .container
      .row.main-center

        .col-xs-12
            img(src="../assets/logo_colegio.svg", alt="Colegio CIMA").logo

        template(v-if="error")
          .col-xs-12
            .row.main-center
              article.message-error
                h1(v-text="error").font-size-large
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
              button(v-on:click="login", v-on:keyup.enter="login").btn--primary Ingresar
</template>

<script>
import jwt from 'jwt-decode';
import {login} from '../functions/fetchFunctions';
import {token} from '../cfg/core';
export default {
  name: "Login",

  data() {
    return {
      user: null,
      error: null,
      password: null
    };
  },

  methods: {
    async login() {
      if(this.user && this.password){
        const res = await login(this.user,this.password);
        if(res.success){
          const myToken = res.token;
          let type = jwt(myToken).type;

          localStorage.setItem(token,myToken);

          if (type === 'student') {
            this.$router.replace('/Dashboard');
          } else {
            this.$router.replace('/FamilyGuy');
          }
        }else{
          this.error = res.message;
        }
      }else{
        this.error = 'Debe ingresar usuario y contraseña';
      }   
      this.user     = '';
      this.password = '';   
    }
  }
};
</script>


