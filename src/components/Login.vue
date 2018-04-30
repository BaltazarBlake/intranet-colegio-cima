<template lang="pug">
  main.main-content--login
    .login.row.cross-cente
      .container
        .row.main-center
          .login__content
            .row.main-center
              .col-xs-12
                img(src="views/img/logo_colegio.svg", alt="Cima pre u").logo__preu
            .row.main-center
              //- template(v-if="error")
              //-   article.message-error
              //-     h1(v-text="error").message-error__title
            .card
              .login__title
                h1.c-bd Iniciar sesión
              .login__form.form
                .form__group
                  label.form__item Usuario
                    input(type="text", v-model="user", placeholder="").form__input
                .form__group
                  label.form__item Contraseña
                    input(type="password", v-model="password", placeholder="").form__input
                .form__group.row.main-center
                  button(v-on:click="enviarData", v-on:keyup.enter="enviarData").btn--primary Ingresar

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

<style lang="scss">

</style>


