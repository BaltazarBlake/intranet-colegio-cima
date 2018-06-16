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
                  img(:src='data.url_imagen' @error='detectedImages(data)' :id="'avatar' + data.idperson").profile__user-image.parent
                  .profile__user-option
                    label(:for="'upload-image' + data.idperson").btn--edit
                      input.u-hidden(type="file" :id="'upload-image' + data.idperson" accept="image/*" @click="editImage(data.idperson)") 
                      i.icon-edit
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
    modal(:active.sync="dataEdit")
      template(slot='title')
        .row.cross-center
          .col-xs-12
            strong.font-size-x-large Editar información
      template(slot='body')
        template(v-if="isEditing")
          form(@submit.prevent="save()").row
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

    
    // MODAL EDIT IMAGE
    modal(:active.sync="photoEdit")
      template(slot='title')
        .row.cross-center
          .col-xs-12
            strong.font-size-x-large Editar Foto
      template(slot='body')
        .row.main-center
          .col-xs
            img(src="dist/user.png", id="image")
        .row.main-center
          .col-xs.m-t
            button(id="crop" type="button").btn--default Guardar
          .col-xs.m-t
            button(type="button").btn--default Cancelar
</template>

<script>
import Cropper from "cropperjs";
import { getParents } from "../functions/fetchFunctions";
import { updateFamilyProfile } from "../functions/fetchFunctions";
import Modal from "./global/Modal";
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
        console.log(res);
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

    editImage(el) {
      let avatar = document.getElementById(`avatar${el}`),
          input = document.getElementById(`upload-image${el}`);
      let image = document.getElementById('image'),
          cropper;

      input.addEventListener('change', (e) => {
        let files = e.target.files;
        const done = (url) => {
          this.photoEdit = true;
          image.src = url;

          onloadImage();
        };
        let reader,
            file,
            url;
        if (files && files.length > 0) {
          file = files[0];
          if (URL) {
            done(URL.createObjectURL(file));
          } else if (FileReader) {
            reader = new FileReader();
            reader.onload = (e) => {
              done(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }
      });

      const onloadImage = () => {
        console.log('qwertyuio');
        cropper = new Cropper(image, {
          aspectRatio: 2.4/3.1,
          autoCropArea: 0.9,
          cropBoxResizable: false,
        });
      }


      document.getElementById('crop').addEventListener('click', () => {
        let initialAvatarURL;
        let canvas;

        this.photoEdit = false;

        if (cropper) {
          canvas = cropper.getCroppedCanvas({
            width: 150,
            height: 200,
            fillColor: '#fff',
          });

          initialAvatarURL = avatar.scr;
          avatar.src = canvas.toDataURL();
          cropper.destroy();
          cropper = null;
        }
      });
    }
  }
};
</script>

