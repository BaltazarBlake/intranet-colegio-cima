import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    profile:null
  },
  getters:{
    getProfile: state =>{
      return profile;
    }
  },
  mutations:{
    insertProfile: (state,data)=>{
      state.profile = data;
    },
    limpiar: state=>{
      state.profile=null;

    }
  },
  actions:{
    // this.$store.dispatch('getProfile',id:null);
    getProfile: context=>{
      // peticion ajax 
      context.commit('insertProfile',res);
    },
    limpiarData: context=>{
      context.commit('limpiar');
    }
  }
});