<template lang="pug">
  main.main-content--login
    .container
      transition(name='slide-fade' appear)
        .row.main-center
          .col-xs-12
              img(src="../assets/logo_colegio.svg", alt="Colegio CIMA").logo

          transition(name='slide-fade-top' mode='in-out')
            template(v-if='error')
              .col-xs-12
                .row.main-center
                  article.message-error
                    h1.font-size-large.m-t.m-b {{error}}
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
                button(type="submit").btn--primary
                  template(v-if='!viewSpinner') Ingresar
                  template(v-else)
                    spinner
    .login__bg
      <svg class="line-curve" viewBox="0 0 1400 600">
        <defs>
          <path class="line-curve light-blue" d="M-76.02 -295.6L-216.65 873.15L1720.85 910.65C2414.6 410.65 2329.19 233.57 1464.6 379.4C600.02 525.23 111.82 429.4 0 91.9L-76.02 -295.6Z" id="bN1OX2GEd"></path>
          <path class="line-curve blue" d="M-185.4 -192.48L-269.77 813.77L1764.6 898.15C2668.77 441.9 2622.94 283.85 1627.1 424.01C631.27 564.17 83.35 449.3 -16.65 79.4L-185.4 -192.48Z" id="e4a2QFBd0"></path>
          <path class="line-curve magenta" d="M-185.4 0L-157.27 771.91L1564.6 848.02C1966.69 653.52 1843.77 573.81 1195.85 608.89C547.94 643.96 142.03 474.2 -21.87 99.6L-185.4 0Z" id="b5ps9i6az">
          </path>
        </defs>
        <g>
          <g>
            <g><use xlink:href="#bN1OX2GEd" opacity="1" fill="#00357B" fill-opacity="1"></use></g>
            <g><use xlink:href="#e4a2QFBd0" opacity="1" fill="#29c300" fill-opacity="1"></use></g>
            <g><use xlink:href="#b5ps9i6az" opacity="1" fill="#00178f" fill-opacity="1"></use></g>
          </g>
        </g>
      </svg>
</template>
<script>
import jwt from 'jwt-decode';
import {token} from '../cfg/core';
import {login,getProfile,getChildren,getParentProfile} from '../functions/fetchFunctions';
import Spinner from './global/Spinner';
export default{
  components: {Spinner},
  data() {
    return {
      user: null,
      error: false,
      password: null,
      viewSpinner: false,
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
          this.showSpinner();
          localStorage.setItem(token,myToken);

          if (type === 'student') {
            let report = await getProfile(idUser);
            localStorage.setItem('cima-estudiante',JSON.stringify(report));
            this.$router.replace('/Dashboard',() => {
              this.user     = '';
              this.password = '';
            });
          } else {
            const idUser = jwt(myToken).idUser;
            let report = await getChildren(idUser);
            let profile = await getParentProfile(idUser);
            localStorage.setItem('cima-children', JSON.stringify(report));
            localStorage.setItem('cima-parent-profile',JSON.stringify(profile));
            this.$router.replace('/Familyguy', () => {
              this.user     = '';
              this.password = '';
            });
          }
        }else{
          this.error = res.message;
        }
      }else{
        this.error = 'Debe ingresar usuario y contraseña';
      }
    },
    showSpinner() {
      this.viewSpinner = true;
    }
  }
}
</script>
