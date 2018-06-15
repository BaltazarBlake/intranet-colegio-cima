<template lang="pug">
  div
    .band
      .container
        h1.font-size-x-large Información de apoderados
    template(v-if='report')
      .container.target
        .row
          template(v-for='data in report')
            .col-xs-12.col-m-6.d-f
              .profile
                .row.main-end
                  .col-xs
                    button(@click="edit(data)").btn--edit
                      i.icon-edit
                .profile__wrapper-image             
                  img(:src='data.url_imagen' @error='detectedImages(data)' id="avatar" @click="editImage()").profile__user-image.parent
                  // div.profile__user-option
                  //   label(for="upload-image").btn--edit
                  //     input.u-hidden(type="file" id="upload-image" accept="image/*" @click="editImage()") 
                  //     i.icon-edit
                .profile__description.row.main-center
                  .col-xs-12
                    h1.font-size-large {{data.nombre}} {{data.apellidos}}
                  .col-xs-12
                    h2.font-size-small ({{data.descripcion}})
                  .col-xs-12
                    h2.font-size-small DNI: {{data.dni}}
                .profile__description.row.main-center
                  .col-xs-4
                    small Teléfono
                    p {{data.telefono}}
                  .col-xs-12
                    small Email
                    p(v-text="data.email == '' ? '-' : data.email ")
                  .col-xs-12
                    small Dirección
                    p {{data.direccion}}
    template(v-else)
      .m-t-s
        spinner
    // MODAL EDIT DATA PROFILE
    modal(:active="dataEdit")
      template(slot='title')
        .row.cross-center
          .col-xs-12
            strong.font-size-x-large Editar información
      template(slot='body')
        template(v-if="isEditing")
          form(@submit.prevent="save()").row
            // .input-field.col-xs-12
            //   .profile__wrapper-image             
            //       img(:src='isEditing.url_imagen' @error='detectedImages(data)').profile__user-image.parent
            .input-field.col-xs-12.col-xm-6
              label.input-field__label Nombres
              input(type="text" v-model="isEditing.nombre").input-field__input
            .input-field.col-xs-12.col-xm-6
              label.input-field__label Apellidos
              input(type="text" v-model="isEditing.apellidos").input-field__input
            .input-field.col-xs-12.col-xm-6.col-l-4
              label.input-field__label DNI
              input(type="text" v-model="isEditing.dni").input-field__input
            .input-field.col-xs-12.col-xm-6.col-l-4
              label.input-field__label Teléfono
              input(type="text" v-model="isEditing.telefono").input-field__input
            .input-field.col-xs-12.col-xm-6.col-l-4
              label.input-field__label Email
              input(type="email" v-model="isEditing.email").input-field__input
            .input-field.col-xs-12.col-xm-6.col-l-12
              label.input-field__label Dirección
              input(type="text" v-model="isEditing.direccion").input-field__input
            .col-xs.m-b
                button(type="submit").btn--primary Guardar
    modal(:active="photoEdit")
      template(slot='title')
        .row.cross-center
          .col-xs-12
            strong.font-size-x-large Editar Foto


</template>

<script>
import { EventBus } from "../event-bus.js";
import { getParents } from "../functions/fetchFunctions";
import { updateFamilyProfile } from "../functions/fetchFunctions";
import Modal from "./global/Modal/Modal";
import Spinner from "./global/Spinner";
export default {
  components: {
    Spinner,
    Modal
  },
  data() {
    return {
      report: null,
      isEditing: null,
      dataEdit: false,
      photoEdit: false,
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res;
      if (!localStorage.getItem("cima-estudiante-parents")) {
        let data = JSON.parse(localStorage.getItem("cima-estudiante"));
        res = await getParents(data.idalumnocolegio);
        res = res.data;
        localStorage.setItem("cima-estudiante-parents", JSON.stringify(res));
      } else {
        res = JSON.parse(localStorage.getItem("cima-estudiante-parents"));
      }
      this.report = res;
    },

    detectedImages(el) {
      let i = this.report.indexOf(el);
      if (this.report[i] != undefined) {
        this.report[i].url_imagen = "dist/user.png";
      }
    },

    edit(data) {
      // EventBus.$emit("showModal", this.isVisible);
      this.dataEdit = true;
      this.isEditing = data;
    },

    async save() {
      let res;
      let data = this.isEditing;
      res = await updateFamilyProfile(
        data.idperson,
        data.nombre,
        data.apellidos,
        data.dni,
        data.telefono,
        data.email,
        data.direccion,
      );
      EventBus.$emit("hidenModal", this.isVisible);
      console.log(res);
    },

    editImage() {
      // let avatar = document.getElementById('avatar'),
      //     uploadImage = document.getElementById('upload-image'),
      //     image = document.getElementById('image');
      // EventBus.$emit("showModal", this.isVisible);
      this.photoEdit = true;
    }
  }
};
</script>
