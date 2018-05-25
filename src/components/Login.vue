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
          form(@submit.prevent="login").row.main-center
            .input-field.col-xs-12
              label.input-field__label Usuario
              input(type="text", v-model="user", placeholder="").input-field__input
            .input-field.col-xs-12
              label.input-field__label Contraseña
              input(type="password", v-model="password", placeholder="").input-field__input
            .col-xs
              button(type="submit").btn--primary Ingresar
</template>
<script>
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import {login,getProfile,getChildren,getParentProfile} from '../functions/fetchFunctions';
export default{
  data() {
    return {
      user: null,
      error: null,
      password: null
    };
  },
  methods:{
    async login() {
      if(this.user && this.password){
        const res = await login(this.user,this.password);
        if(res.success){
          const myToken = res.token;
          let type = jwt(myToken).type;
          const idUser = jwt(myToken).user;

          localStorage.setItem(token,myToken);

          if (type === 'student') {
            let report = await getProfile(idUser);
            localStorage.setItem('cima-estudiante',JSON.stringify(report));
            this.$router.replace('/Dashboard');
          } else {
            const idUser = jwt(myToken).idUser;
            let report = await getChildren(idUser);
            let profile = await getParentProfile(idUser);
            localStorage.setItem('cima-children', JSON.stringify(report));
            localStorage.setItem('cima-parent-profile',JSON.stringify(profile));
            this.$router.replace('/Familyguy');
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
}
</script>
