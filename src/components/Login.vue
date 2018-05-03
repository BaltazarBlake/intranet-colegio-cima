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
import {login} from '../functions/fetchFunctions';
export default {
  name: "Login",

  data() {
    return {
      user: null,
      password: null
    };
  },

  methods: {
    async enviarData() {
      if(this.user && this.password){
        const res = await login(this.user,this.password);
        if(res.success){
          const token = res.token;
          let type = jwt(token).type;

          localStorage.setItem('186792bf11c51e92ed5eba02424312ac',token);

          if (type === 'student') {
            this.$router.replace('/Dashboard');
          } else {
            this.$router.replace('/FamilyGuy');
          }
        }else{
          console.log(res.message);
        }
      }else{
        console.log('Debe ingresar usuario y contraseña');
      }   
      this.user     = '';
      this.password = '';   
    }
  }
};
</script>


